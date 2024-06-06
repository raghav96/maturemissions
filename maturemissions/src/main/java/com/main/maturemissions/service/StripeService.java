package com.main.maturemissions.service;

import com.main.maturemissions.model.ProductDAO;
import com.main.maturemissions.util.CustomerUtil;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import com.stripe.param.SubscriptionItemListParams;
import com.stripe.param.SubscriptionListParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Service class for managing interactions with the Stripe API.
 * This service encapsulates various Stripe operations like creating and managing customers,
 * subscriptions, checkout sessions, accounts, and making payments.
 */
@Service
public class StripeService {

    /**
     * The secret API key for interacting with the Stripe API, injected from application properties.
     */
    @Value("${stripe.keys.secret}")
    private String API_SECRET_KEY;

    private String FRONTEND_URL = "https://maturemissions-frontend-abaf356370b4.herokuapp.com";

    public StripeService() {

    }

    /**
     * Retrieves a list of subscription plans for a customer based on their email.
     *
     * @param email The email of the customer.
     * @return A list of maps containing subscription plan data or null if an error occurs.
     */
    public List<Map<String, String>> getCustomerSubscription(String email){
        Stripe.apiKey = API_SECRET_KEY;

        List<Map<String, String>> subscriptionPlans = new ArrayList<>();

        try {
            // Start by finding existing customer record from Stripe
            Customer customer = CustomerUtil.findCustomerByEmail(email);

            // If no customer record was found, no subscriptions exist either, so return an empty list
            if (customer == null) {
                return null;
            }

            // Search for subscriptions for the current customer
            SubscriptionCollection subscriptions = Subscription.list(
                    SubscriptionListParams.builder()
                            .setCustomer(customer.getId())
                            .build());

            // For each subscription record, query its item records and collect in a list of objects to send to the client
            for (Subscription subscription : subscriptions.getData()) {
                SubscriptionItemCollection currSubscriptionItems =
                        SubscriptionItem.list(SubscriptionItemListParams.builder()
                                .setSubscription(subscription.getId())
                                .addExpand("data.price.product")
                                .build());

                for (SubscriptionItem item : currSubscriptionItems.getData()) {
                    HashMap<String, String> subscriptionData = new HashMap<>();
                    subscriptionData.put("appProductId", item.getPrice().getProductObject().getMetadata().get("app_id"));
                    subscriptionData.put("subscriptionId", subscription.getId());
                    subscriptionData.put("subscribedOn", new SimpleDateFormat("dd/MM/yyyy").format(new Date(subscription.getStartDate() * 1000)));
                    subscriptionData.put("nextPaymentDate", new SimpleDateFormat("dd/MM/yyyy").format(new Date(subscription.getCurrentPeriodEnd() * 1000)));
                    subscriptionData.put("price", item.getPrice().getUnitAmountDecimal().toString());

//                if (subscription.getTrialEnd() != null && new Date(subscription.getTrialEnd() * 1000).after(new Date()))
//                    subscriptionData.put("trialEndsOn", new SimpleDateFormat("dd/MM/yyyy").format(new Date(subscription.getTrialEnd() * 1000)));
                    subscriptionPlans.add(subscriptionData);
                }
            }
        } catch (StripeException e) {
            e.printStackTrace();
            return null;
        }
        return subscriptionPlans;

    }

    /**
     * Initiates a checkout session for a customer with specified products.
     *
     * @param name  The name of the customer.
     * @param email The email of the customer.
     * @param items An array of products the customer wants to subscribe to.
     * @return The URL of the checkout session or a redirect URL in case of an error.
     */
    public String checkout(String name, String email, Product[] items) {

        try {
            Stripe.apiKey = API_SECRET_KEY;
            // Start by finding existing customer record from Stripe or creating a new one if needed
            Customer customer = null;
            try {
                customer = CustomerUtil.findOrCreateCustomer(email, name);
            } catch (StripeException e) {
                e.printStackTrace();
                return FRONTEND_URL + "/pricing";
            }

            // Next, create a checkout session by adding the details of the checkout
            SessionCreateParams.Builder paramsBuilder =
                    SessionCreateParams.builder()
                            // For subscriptions, you need to set the mode as subscription
                            .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                            .setCustomer(customer.getId())
                            .setSuccessUrl(FRONTEND_URL +  "/success?session_id={CHECKOUT_SESSION_ID}")
                            .setCancelUrl(FRONTEND_URL +  "/failure");

            for (Product product : items) {

                paramsBuilder.addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .putMetadata("app_id", product.getId())
                                                                .setName(product.getName())
                                                                .build()
                                                )
                                                .setCurrency(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getCurrency())
                                                .setUnitAmountDecimal(ProductDAO.getProduct(product.getId()).getDefaultPriceObject().getUnitAmountDecimal())
                                                // For subscriptions, you need to provide the details on how often they would recur
                                                .setRecurring(SessionCreateParams.LineItem.PriceData.Recurring.builder().setInterval(SessionCreateParams.LineItem.PriceData.Recurring.Interval.MONTH).build())
                                                .build())
                                .build());
            }

            Session session = Session.create(paramsBuilder.build());

            return session.getUrl();
        } catch (Exception e) {
            e.printStackTrace();
            return FRONTEND_URL + "/pricing";
        }
    }

    /**
     * Cancels a subscription based on the subscription ID.
     *
     * @param subscriptionId The ID of the subscription to cancel.
     * @return The status of the deleted subscription or "failed" if an error occurs.
     */
    public String cancelSubscription(String subscriptionId) {
        try {
            Stripe.apiKey = API_SECRET_KEY;

            Subscription subscription =
                    Subscription.retrieve(
                            subscriptionId
                    );

            Subscription deletedSubscription =
                    subscription.cancel();

            return deletedSubscription.getStatus();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "failed";
    }

    /**
     * Creates a new account on Stripe for a provider.
     *
     * @return A map containing the account ID and the URL for account setup.
     */
    public Map<String, String> providerCreateAccount() {
        try {
            Stripe.apiKey = API_SECRET_KEY;

            AccountCreateParams params =
                    AccountCreateParams.builder().setType(AccountCreateParams.Type.EXPRESS).build();

            Account account = Account.create(params);


            AccountLinkCreateParams accountLinkCreateParams =
                    AccountLinkCreateParams.builder()
                            .setAccount(account.getId())
                            .setRefreshUrl(FRONTEND_URL +  "/account-failure")
                            .setReturnUrl(FRONTEND_URL + "/account-success?code={"+UUID.randomUUID().toString()+"}")
                            .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
                            .build();

            AccountLink accountLink = AccountLink.create(accountLinkCreateParams);

            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("accountId", account.getId());
            responseMap.put("url", accountLink.getUrl());

            return responseMap;

        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Retrieves the account details of a provider based on the account ID.
     *
     * @param accountId The ID of the account to retrieve.
     * @return The account object containing the account details.
     */
    public Account providerGetAccount(String accountId) {
        try {
            Stripe.apiKey = API_SECRET_KEY;
            Account account = Account.retrieve(accountId);
            System.out.println(account);
            return account;
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Initiates a payment transfer to a provider's account.
     *
     * @param accountId The ID of the account to transfer the payment to.
     * @param amount    The amount to transfer in the smallest currency unit (e.g., cents).
     * @return The JSON representation of the transfer.
     */
    public String makePayment(String accountId, Integer amount) {

        try {
            Stripe.apiKey = API_SECRET_KEY;
            Map<String, Object> params = new HashMap<>();
            params.put("amount", amount);
            params.put("currency", "aud");
            params.put("destination", accountId);
            Transfer transfer = Transfer.create(params);

            return transfer.toJson();
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

}

package com.main.maturemissions.controller;

import com.google.gson.Gson;
import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.*;
import com.main.maturemissions.model.pojo.*;
import com.main.maturemissions.service.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * This is the main controller containing all the methods to be called through an API
 */
@RestController
@RequestMapping("/")
public class MatureMissionsController {
    private final UserService userService;
    private final ServiceRequestService serviceRequestService;
    private final ServicesService servicesService;
    private final PaymentsService paymentsService;
    private final StripeService stripeService;
    private final SubscriptionService subscriptionService;
    private final EmailService emailService;
    private final SmsService smsService;
    private final MedicalInfoService medicalInfoService;
    private final UserSubscriptionService userSubscriptionService;

    private final ProviderService providerService;

    @Value("${admin.username}")
    private String ADMIN_USERNAME;

    @Value("${admin.password}")
    private String ADMIN_PASSWORD;

    /**
     * Constructor for the Controller
     * @param userService - services to access user object
     * @param serviceRequestService - service to access service requests
     * @param servicesService - service to access service types
     * @param paymentsService - service to access payments
     * @param stripeService - service for the Stripe payments integrations
     * @param subscriptionService - service to store subscription types
     * @param emailService - service for email functionality
     * @param smsService - service for sms functionality
     * @param medicalInfoService - service for storing medical info
     * @param userSubscriptionService - service to keep track of user's subscriptions
     * @param providerService - services to keep track of providers and services they provide
     */
    public MatureMissionsController(UserService userService, ServiceRequestService serviceRequestService, ServicesService servicesService, PaymentsService paymentsService, StripeService stripeService, SubscriptionService subscriptionService, EmailService emailService, SmsService smsService, MedicalInfoService medicalInfoService, UserSubscriptionService userSubscriptionService, ProviderService providerService) {
        this.userService = userService;
        this.serviceRequestService = serviceRequestService;
        this.servicesService = servicesService;
        this.paymentsService = paymentsService;
        this.stripeService = stripeService;
        this.subscriptionService = subscriptionService;
        this.emailService = emailService;
        this.smsService = smsService;
        this.medicalInfoService = medicalInfoService;
        this.userSubscriptionService = userSubscriptionService;
        this.providerService = providerService;
    }

    /**
     * Helper method in initialization to set up an admin username and password with the config file
     */
    private void registerAdminIfNone() {
        System.out.println("Initializing admin user");
        if (userService.getUserByUsername(ADMIN_USERNAME) == null) {
            User user = new User();
            user.setPassword(ADMIN_PASSWORD);
            user.setUsername(ADMIN_USERNAME);
            user.setName("admin");
            user.setPhoneNumber(1111);
            user.setEmail("admin@test.com");
            user.setAge(70);
            user.setEmailNotifications(false);
            user.setSmsNotifications(false);
            user.setImageLoc("");
            user.setActive(true);
            try {
                userService.signup(user, AppUserRole.ROLE_ADMIN);
            } catch (AuthorizerException e) {
                System.out.println("Issue creating admin user");
            }
        }
    }

    /**
     * This gets all service requests
     * @return list of all service requests
     */
    @RequestMapping(value="/notifications/caregiver/request", method = RequestMethod.GET)
    public String getAllRequests() {
        return serviceRequestService.getAllServices(); // PATHIK'S CHANGE
    }

    /**
     * This gets all the service requests for the corresponding user
     * @param id - userId of the elderly user
     * @return - list of service requests for the user
     */
    @RequestMapping(value="/notifications/elderly/requests", method = RequestMethod.GET)
    public String getRequest(@RequestParam(name = "userId") Long id) {
        return serviceRequestService.getElderlyUserRequests(userService.getUserById(id));
    }

    /**
     * This allows the elderly user to book service requests
     * @param bookServicePojo - takes in the userid, serviceid, date and time to book a service request
     * @return response
     */
    @RequestMapping(value="/book-service", method = RequestMethod.POST)
    public String bookService(@RequestBody BookServicePojo bookServicePojo) {
        ServiceRequests serviceRequest = new ServiceRequests();
        serviceRequest.setUser(userService.getUserById(bookServicePojo.getUserId()));
        serviceRequest.setService(servicesService.getServiceById(bookServicePojo.getServiceId()));
        serviceRequest.setRequestDate(bookServicePojo.getDate());
        serviceRequest.setRequestTime(bookServicePojo.getTimes());
        serviceRequest.setStatus("open");
        return serviceRequestService.bookService(serviceRequest);
    }

    /**
     * When an elderly user has a request that a caregiver can complete, they accept the request
     * @param caregiverRequestPojo - contains the servicerequestid, providerid and acceptance
     * @return response
     */
    @RequestMapping(value="/notifications/caregiver/request", method = RequestMethod.POST)
    public String completeRequest(@RequestBody CaregiverRequestPojo caregiverRequestPojo) {
        return serviceRequestService.caregiverRequestAcceptance(caregiverRequestPojo.getServiceRequestId(), caregiverRequestPojo.getProviderId(), caregiverRequestPojo.getAccepted());
    }

    /**
     * When a service request has been complete, the elderly user can complete the request, which inserts payments
     * @param completeRequestPojo - gets the servicerequest id, rating and review description
     * @return response if succeeded or failed
     */
    @RequestMapping(value="/notifications/elderly/complete-request", method = RequestMethod.PUT)
    public String completeRequest(@RequestBody CompleteRequestPojo completeRequestPojo) {
        String response = serviceRequestService.completeService(completeRequestPojo.getServiceRequestId(), completeRequestPojo.getRating(), completeRequestPojo.getDescription());
        Payments payments = new Payments();
        payments.setAmount(30);
        payments.setStatus("Active");
        payments.setServiceRequest(serviceRequestService.getServiceRequestById(completeRequestPojo.getServiceRequestId()));
        paymentsService.insertPayment(payments);
        return response;
    }

    /**
     * When an improper service is provided, elderly users can report the service provided
     * @param reportServicePojo - has the servicerequestid and the report description to flag the service provided as reported
     * @return response
     */
    @RequestMapping(value="/notifications/elderly/report", method = RequestMethod.POST)
    public String reportRequest(@RequestBody ReportServicePojo reportServicePojo) {
        return serviceRequestService.reportService(reportServicePojo.getServiceRequestId(), reportServicePojo.getReportDescription());
    }

    /**
     * When a service request is started and then canceled by the elderly user, it is removed
     * @param cancelRequestPojo - has the servicerequest id to delete
     * @return response
     */
    @RequestMapping(value="/notifications/elderly/cancel-request", method = RequestMethod.PUT)
    public String cancelRequest(@RequestBody CancelRequestPojo cancelRequestPojo) {
        return serviceRequestService.cancelRequest(cancelRequestPojo.getServiceRequestId());
    }

    /**
     * This is for the set services page
     * @param selectServicePojo - activates the service provided by the caregiver
     * @return response
     */
    @RequestMapping(value="/caregiver/select-services", method = RequestMethod.POST)
    public String selectServices(@RequestBody SelectServicePojo selectServicePojo) {
        servicesService.selectServices(selectServicePojo.getProviderId(), selectServicePojo.getServices());
        return "set services for caregiver";
    }


    /**
     * Get services provided by the caregiver for them to see service requests
     * @param id - provider id
     * @return returns the list of services provided by the caregiver
     */
    @RequestMapping(value="/caregiver/services", method = RequestMethod.GET)
    public String getCargiverServices(@RequestParam(name = "providerId") Long id) {
        return servicesService.getServicesByProvider(id);
    }

    /**
     * Adds the medical info for the elderly user
     * @param medicalInfoPojo - contains the medical info fields
     * @return response from adding medical info
     */
    @RequestMapping(value="/add-medical-info", method = RequestMethod.POST)
    public String addMedicalInfo(@RequestBody MedicalInfoPojo medicalInfoPojo) {
        if(medicalInfoPojo == null) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            responseBody.put("message", "response is null");
            return new Gson().toJson(responseBody);
        }

        if(medicalInfoPojo.getUserId() == null || medicalInfoPojo.getContactName() == null || medicalInfoPojo.getRelationship() == null || medicalInfoPojo.getPhoneNumber() == null || medicalInfoPojo.getMedicalConditions() == null || medicalInfoPojo.getMobilityLevel() == null || medicalInfoPojo.getAssistiveDevices() == null || medicalInfoPojo.getAllergies() == null || medicalInfoPojo.getDietaryRestrictions() == null || medicalInfoPojo.getDoctorName() == null || medicalInfoPojo.getDoctorContact() == null || medicalInfoPojo.getMedications() == null || medicalInfoPojo.getMedicalPreferences() == null || medicalInfoPojo.getMedicareNumber() == null) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            responseBody.put("message", "One or more essential fields are null");
            return new Gson().toJson(responseBody);
        }

        return medicalInfoService.addMedicalInfo(medicalInfoPojo.getUserId(), medicalInfoPojo.getContactName(), medicalInfoPojo.getRelationship(), medicalInfoPojo.getPhoneNumber(), medicalInfoPojo.getMedicalConditions(), medicalInfoPojo.getMobilityLevel(), medicalInfoPojo.getAssistiveDevices(),medicalInfoPojo.getAllergies(),medicalInfoPojo.getDietaryRestrictions(),medicalInfoPojo.getDoctorName(),medicalInfoPojo.getDoctorContact(),medicalInfoPojo.getMedications(),medicalInfoPojo.getMedicalPreferences(),medicalInfoPojo.getMedicareNumber());
    }

    /**
     * Sends the email to the user
     * @param emailPojo - contains user id, subject and message
     * @return email sent if the email is sent
     */
    @RequestMapping(value="/send-email", method = RequestMethod.POST)
    public String sendEmail(@RequestBody EmailPojo emailPojo) {
        emailService.sendEmail(userService.getUserById(emailPojo.getUserId()), emailPojo.getSubject(), emailPojo.getMessage());
        return "Email sent! :)";
    }

    /**
     *
     * Sends an sms to the user based on their pbone number
     * @param smsPojo - contains userid and the message
     * @return - returns message to frontend that sms is sent
     */
    @RequestMapping(value="/send-sms", method = RequestMethod.POST)
    public String sendSms(@RequestBody SmsPojo smsPojo) {
        smsService.sendSms(userService.getUserById(smsPojo.getUserId()), smsPojo.getMessage());
        return "SMS sent! :)";
    }

    /**
     * Gets the medical information for the user
     * @param id - gets the medical info about the user
     * @return returns the medical information
     */
    @RequestMapping(value="/medical-info", method = RequestMethod.GET)
    public String getMedicalInfo(@RequestParam(name = "userId") Long id) {
        return medicalInfoService.getMedicalInfo(userService.getUserById(id));
    }


    /**
     * Registers the elderly user on signup page
     * @param signupRequestPojo - fields on the signup elderly page
     * @return returns that the user is signed up
     */
    @RequestMapping(value="/signup-user", method = RequestMethod.POST)
    public String registerUser(@RequestBody UserSignupRequestPojo signupRequestPojo) {
        User user = new User();
        System.out.println(signupRequestPojo.getPassword());
        user.setPassword(signupRequestPojo.getPassword());
        user.setUsername(signupRequestPojo.getUsername());
        user.setName(signupRequestPojo.getName());
        user.setAge(signupRequestPojo.getAge());
        user.setPhoneNumber(signupRequestPojo.getPhoneNumber());
        user.setEmail(signupRequestPojo.getEmail());
        user.setMedicareNumber(signupRequestPojo.getMedicareNumber());
        user.setAddress(signupRequestPojo.getAddress());
        user.setEmailNotifications(false);
        user.setSmsNotifications(false);
        user.setImageLoc("");
        user.setActive(true);
        try {
            return userService.signup(user, AppUserRole.ROLE_USER);
        } catch (AuthorizerException e) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            responseBody.put("message", "User already exists");
            return new Gson().toJson(responseBody);
        }

    }

    /**
     * Signs up a caregiver to the application using the caregiver signup page
     * @param signupRequestPojo - gets the information from the caregiver signup page
     * @return returns the registered provider
     */
    @RequestMapping(value="/signup-provider", method = RequestMethod.POST)
    public String registerProvider(@RequestBody ProviderSignupRequestPojo signupRequestPojo) {
        User user = new User();
        user.setPassword(signupRequestPojo.getPassword());
        user.setUsername(signupRequestPojo.getUsername());
        user.setName(signupRequestPojo.getName());
        user.setAge(signupRequestPojo.getAge());
        user.setPhoneNumber(signupRequestPojo.getPhoneNumber());
        user.setEmail(signupRequestPojo.getEmail());
        user.setEmailNotifications(false);
        user.setSmsNotifications(false);
        user.setImageLoc("");
        user.setActive(true);
        try {
            return userService.signup(user, AppUserRole.ROLE_PROVIDER);
        } catch (AuthorizerException e) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            responseBody.put("message", "User already exists");
            return new Gson().toJson(responseBody);
        }
    }

    /**
     * Registers the admin user (Not used)
     * @param signupRequestPojo -
     * @return - response for signup for admin
     */
    @RequestMapping(value="/admin/signup", method = RequestMethod.POST)
    public String registerAdmin(@RequestBody ProviderSignupRequestPojo signupRequestPojo) {
        User user = new User();
        user.setPassword(signupRequestPojo.getPassword());
        user.setUsername(signupRequestPojo.getUsername());
        user.setName(signupRequestPojo.getName());
        user.setPhoneNumber(signupRequestPojo.getPhoneNumber());
        user.setEmail(signupRequestPojo.getEmail());
        try {
            return userService.signup(user, AppUserRole.ROLE_ADMIN);
        } catch (AuthorizerException e) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            responseBody.put("message", "User already exists");
            return new Gson().toJson(responseBody);
        }
    }


    /**
     * Completes login for the elderly and provider users
     * @param loginRequestPojo - takes in username, password
     * @return - returns jwt token for the user
     */
    @RequestMapping(value="/login", method= RequestMethod.POST)
    public String login(@RequestBody LoginRequestPojo loginRequestPojo){
        System.out.println(loginRequestPojo.getUsername());
        System.out.println(loginRequestPojo.getPassword());

        registerAdminIfNone();
        String username = loginRequestPojo.getUsername();
        String rawPassword = loginRequestPojo.getPassword();
        try {
            return userService.login(username, rawPassword);
        } catch (AuthorizerException e) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", String.valueOf(HttpStatus.UNAUTHORIZED.value()));
            responseBody.put("message", "Incorrect username or password");
            return new Gson().toJson(responseBody);
        }

    }

    /**
     * Change user details
     * @param changeUserDetailsPojo - user id and other profile details
     * @return - success or failure
     */
    @RequestMapping(value="/user/change-details", method= RequestMethod.POST)
    public String changeUserDetails(@RequestBody ChangeUserDetailsPojo changeUserDetailsPojo){
        return userService.changeUserDetails(changeUserDetailsPojo.getUserId(), changeUserDetailsPojo.getName(), changeUserDetailsPojo.getAge(), changeUserDetailsPojo.getPhoneNumber(), changeUserDetailsPojo.getEmail(), changeUserDetailsPojo.getMedicareNumber(), changeUserDetailsPojo.getAddress(), changeUserDetailsPojo.getUsername(), changeUserDetailsPojo.getEmailNotifications(), changeUserDetailsPojo.getSmsNotifications(), changeUserDetailsPojo.getImageLoc(), changeUserDetailsPojo.getType(), changeUserDetailsPojo.getActive());
    }

    /**
     * Gets all users for admin page
     * @return list of all users
     */
    @RequestMapping(value = "/admin/users", method = RequestMethod.GET)
    public String getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Gets the user by the user id
     * @param id - user id of the user
     * @return user object
     */
    @RequestMapping(value = "/getUserById", method = RequestMethod.GET)
    public String getUserById(@RequestParam(name = "userId") Long id) {
        User dbUser = userService.getUserById(id);
        Provider provider = userService.getProviderForUser(dbUser);
        Map<String, Object> responseBody = new HashMap<String, Object>();
        responseBody.put("user", dbUser);
        if (provider != null) {
            responseBody.put("providerId", provider.getId().toString());
        }
        return new Gson().toJson(responseBody);
    }

    /**
     * Gets all the active and completed payments for admin page
     * @return list of active and completed payments
     */
    @RequestMapping(value="/admin/payment", method = RequestMethod.GET)
    public String getAllActivePayments() {
        return paymentsService.getAllActiveAndCompletedPayments();
    }

    /**
     * Gets list of reported services
     * @return returns list of reported services
     */
    @RequestMapping(value="/admin/reported-user", method = RequestMethod.GET)
    public String getAllReportedServices() {
        return serviceRequestService.getAllReportedServices();
    }

    /**
     * Deletes a user by setting them to inactive
     * @param deleteUserPojo - gets the username to delete
     * @return response that the user is deleted
     */
    @RequestMapping(value ="/admin/users", method = RequestMethod.DELETE)
    public String deleteUser(@RequestBody DeleteUserPojo deleteUserPojo) {

        String deleteUsername = deleteUserPojo.getUsername();
        User user = userService.getUserByUsername(deleteUsername);
        userService.deleteUser(user);

        Map<String, String> responseBody = new HashMap<String, String>();
        responseBody.put("status", "Success");
        responseBody.put("message", "User deleted from database");
        return new Gson().toJson(responseBody);
    }

    /**
     * Gets all the service requests
     * @return gets all service requests
     */
    @RequestMapping(value="/admin/service-requests", method = RequestMethod.GET)
    public String getServiceRequests() {
        return serviceRequestService.getAllServices();
    }

    /**
     * Deletes the users payments
     * @param userPojo - username of user for payments to delete
     * @return response to user for displaying messages
     */
    @RequestMapping(value="/admin/payments", method = RequestMethod.DELETE)
    public String deleteUserPayments(@RequestBody DeleteUserPojo userPojo) {
        User user = userService.getUserByUsername(userPojo.getUsername());
        paymentsService.deletePaymentsForUser(user);

        Map<String, String> responseBody = new HashMap<String, String>();
        responseBody.put("status", "Success");
        responseBody.put("message", "Payments for user deleted from database");
        return new Gson().toJson(responseBody);
    }

    /**
     * Deletes the users service requests
     * @param userPojo - username of user whose service requests must be deleted
     * @return - response
     */
    @RequestMapping(value="/admin/service-requests", method = RequestMethod.DELETE)
    public String deleteUserServiceRequests(@RequestBody DeleteUserPojo userPojo) {
        User user = userService.getUserByUsername(userPojo.getUsername());
        serviceRequestService.deleteServiceRequestsForUser(user);

        Map<String, String> responseBody = new HashMap<String, String>();
        responseBody.put("status", "Success");
        responseBody.put("message", "Payments for user deleted from database");
        return new Gson().toJson(responseBody);
    }

    /**
     * Gets the subscriptions types for user to subscribe to
     * @return list of subscription types
     */
    @RequestMapping(value = "/subscriptions", method = RequestMethod.GET)
    public String getSubscriptionTypes() {
        return subscriptionService.getAllSubscriptionTypes();
    }

    /**
     * Provides the stripe subscription of the user
     * @param id - userid
     * @return - subscription type of the user with stripe account details
     */
    @RequestMapping(value = "/view-subscription", method = RequestMethod.GET)
    public String getSubscriptionTypeForUser(@RequestParam(name = "userId") Long id) {
        User dbUser = userService.getUserById(id);
        UserSubscription userSubscription = userSubscriptionService.findUserSubscriptionByUser(dbUser);
        Map<String, Object> response = new HashMap<>();
        if (userSubscription != null) {
            response.put("type", userSubscription.getSubscription().getType());
            String stripeSubscriptionEmail = userSubscription.getStripeSubscriptionEmail();
            List<Map<String, String>> subscriptionPlans = stripeService.getCustomerSubscription(stripeSubscriptionEmail);
            if (subscriptionPlans.isEmpty()) {
                Map<String, String> responseBody = new HashMap<String, String>();
                responseBody.put("status", "Failed");
                responseBody.put("message", "Error with user subscriptions, please contact admin.");
                return new Gson().toJson(responseBody);
            }
            Map<String, String> subscriptionObject = subscriptionPlans.get(0);
            response.put("subscription", subscriptionObject);

        } else {
            response.put("type", "none");
            response.put("subscription", null);
        }
        return new Gson().toJson(response);
    }

    /**
     * Checks the subscription for elderly user to see if they have exceeded the number of service requests allowed
     * @param checkSubscriptionPojo - gets the user id
     * @return "true" if they can book a service, "false" if they cannot book a service
     */
    @RequestMapping(value="/check-subscription", method= RequestMethod.POST)
    public String checkSubscription(@RequestBody CheckSubscriptionPojo checkSubscriptionPojo) {
        User user = userService.getUserById(checkSubscriptionPojo.getUserId());
        UserSubscription userSubscription = userSubscriptionService.findUserSubscriptionByUser(user);
        boolean canBook = serviceRequestService.getServiceRequestLimitExceeded(user, userSubscription, checkSubscriptionPojo.getDate());
        if (canBook) {
            return "true";
        } else {
            return "false";
        }
    }

    /**
     * Creates a stripe subscription for elderly user
     * @param subscriptionPojo - userid, email
     * @return route to stripe to make the payment
     */
    @RequestMapping(value="/checkout", method = RequestMethod.POST)
    public String createSubscription(@RequestBody SubscriptionPojo subscriptionPojo){

        User user = userService.getUserById(subscriptionPojo.getUserId());
        if (user == null) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", "Failed");
            responseBody.put("message", "User not found for given username");
            return new Gson().toJson(responseBody);
        }
        UserSubscription dbUserSubscription = userSubscriptionService.findUserSubscriptionByUser(user);
        UserSubscription userSubscription = new UserSubscription();
        String subscriptionId = "";
        if (dbUserSubscription != null) {
            userSubscription = dbUserSubscription;
            String stripeSubscriptionEmail = userSubscription.getStripeSubscriptionEmail();
            List<Map<String, String>> subscriptionPlans = stripeService.getCustomerSubscription(stripeSubscriptionEmail);
            if (subscriptionPlans.isEmpty()) {
                Map<String, String> responseBody = new HashMap<String, String>();
                responseBody.put("status", "Failed");
                responseBody.put("message", "Error with user subscriptions, please contact admin.");
                return new Gson().toJson(responseBody);
            }
            Map<String, String> subscriptionObject = subscriptionPlans.get(0);
            subscriptionId = subscriptionObject.get("subscriptionId");
            System.out.println(subscriptionId);
            stripeService.cancelSubscription(subscriptionId);
        }

        userSubscription.setUser(user);
        userSubscription.setStripeSubscriptionEmail(subscriptionPojo.getEmail());
        Subscriptions subscription = subscriptionService.findSubscriptionByProductId(subscriptionPojo.getItems()[0].getId());
        if (subscription == null) {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", "Failed");
            responseBody.put("message", "Subscription plan id invalid");
            return new Gson().toJson(responseBody);
        }
        userSubscription.setSubscription(subscription);
        userSubscriptionService.saveUserSubscription(userSubscription);
        return stripeService.checkout(subscriptionPojo.getName(), subscriptionPojo.getEmail(), subscriptionPojo.getItems());
    }

    /**
     * Cancels the user's subscription
     * @param cancelSubscriptionPojo - userid of the user
     * @return success or failure message
     */
    @RequestMapping(value="/cancel-subscription", method = RequestMethod.POST)
    public String cancelSubscription(@RequestBody CancelSubscriptionPojo cancelSubscriptionPojo){

        User user = userService.getUserById(cancelSubscriptionPojo.getUserId());
        userSubscriptionService.deleteUserSubscription(userSubscriptionService.findUserSubscriptionByUser(user));
        String status = stripeService.cancelSubscription(cancelSubscriptionPojo.getSubscriptionId());
        Map<String, String> responseBody = new HashMap<String, String>();
        if (Objects.equals(status, "Failed")) {
            responseBody.put("status", "Failed");
            responseBody.put("message", "Error trying to cancel a subscription for the customer");
        } else {
            responseBody.put("status", "Success");
            responseBody.put("message", "Subscription cancelled successfully");
        }


        return new Gson().toJson(responseBody);
    }

    /**
     * Create stripe account for the provider
     * @param providerPaymentPojo - userid or provider
     * @return navigates to stripe signup
     */
    @RequestMapping(value="/caregiver/create-account", method = RequestMethod.POST)
    public String serviceProviderCreateAccount(@RequestBody ProviderPaymentPojo providerPaymentPojo) {
        User user = userService.getUserById(providerPaymentPojo.getUserId());
        Map<String, String> response = stripeService.providerCreateAccount();
        String accountId = response.get("accountId");
        providerService.setStripeAccountIdForUser(user, accountId);

        return response.get("url");
    }

    /**
     * Gets the Stripe account details for the provider
     * @param providerPaymentPojo - userid, stripeaccountid
     * @return -
     */
    @RequestMapping(value="/caregiver/account", method = RequestMethod.POST)
    public String serviceProviderGetAccount(@RequestBody ProviderPaymentPojo providerPaymentPojo) {
        User user = userService.getUserById(providerPaymentPojo.getUserId());
        Provider provider = providerService.getProviderIdForUser(user);
        if (provider.getStripeAccountId() != null) {
            return new Gson().toJson(stripeService.providerGetAccount(provider.getStripeAccountId()));
        } else {
            Map<String, String> responseBody = new HashMap<String, String>();
            responseBody.put("status", "Failure");
            responseBody.put("account", "None");
            return new Gson().toJson(responseBody);
        }
    }

    /**
     * Sends payments out to caregiver, stripe currently doesn't allow this functionality in Australia
     * So dummy response is provided and payment is updated
     * @param providerPaymentPojo - gets payment id, user id, amount and pays out the provider
     * @return paymentDetails
     */
    @RequestMapping(value="/admin/send-payment", method = RequestMethod.POST)
    public String serviceProviderSendPayments(@RequestBody ProviderPaymentPojo providerPaymentPojo) {
        Payments payments = paymentsService.getPaymentById(providerPaymentPojo.getPaymentId());
        User user = userService.getUserById(providerPaymentPojo.getUserId());
        Provider provider = providerService.getProviderIdForUser(user);
        String accountId = provider.getStripeAccountId();
        //String paymentDetails =  stripeService.makePayment(accountId, payments.getAmount());
        String paymentDetails = "stripe payment info here";
        payments.setPaymentDetails(paymentDetails);
        payments.setPaymentMethod(accountId);
        payments.setPaymentDate(new Date(System.currentTimeMillis()));
        payments.setStatus("Complete");
        paymentsService.insertPayment(payments);
        return paymentDetails;
    }


}

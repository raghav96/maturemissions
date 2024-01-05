package com.main.maturemissions.service;

import com.google.gson.Gson;
import com.main.maturemissions.model.Subscriptions;
import com.main.maturemissions.model.pojo.SubscriptionDTO;
import com.main.maturemissions.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
/**
 * Service class for managing subscription-related operations.
 * This service provides methods for retrieving subscription types and finding a subscription by product ID.
 */
@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    /**
     * The repository to access subscription data.
     */
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    /**
     * Retrieves all subscription types from the repository, encapsulates them in a {@code SubscriptionDTO} object,
     * and returns a JSON representation of this object.
     *
     * @return A JSON string representing all subscription types.
     */
    @Override
    public String getAllSubscriptionTypes() {
        List<Subscriptions> subscriptionsList = subscriptionRepository.findAll();
        SubscriptionDTO subscriptionDTO = new SubscriptionDTO();
        subscriptionDTO.setSubscriptionPlans(subscriptionsList);
        return new Gson().toJson(subscriptionDTO);
    }

    /**
     * Searches for a subscription in the repository using a product ID.
     *
     * @param productId The ID of the product associated with the subscription.
     * @return A {@code Subscriptions} object representing the subscription, or null if no subscription is found.
     */
    @Override
    public Subscriptions findSubscriptionByProductId(String productId) {
        Subscriptions subscription = subscriptionRepository.findSubscriptionsByProductId(productId);
        return subscription;
    }

}

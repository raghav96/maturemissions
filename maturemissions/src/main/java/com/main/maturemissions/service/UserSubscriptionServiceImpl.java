package com.main.maturemissions.service;

import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserSubscription;
import com.main.maturemissions.repository.UserSubscriptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing user subscriptions.
 * This service provides methods for finding, saving, and deleting user subscriptions.
 */
@Service
public class UserSubscriptionServiceImpl implements UserSubscriptionService {

    @Autowired
    private UserSubscriptionsRepository userSubscriptionsRepository;

    /**
     * Finds a user subscription based on the user.
     *
     * @param user the user whose subscription is to be found.
     * @return the {@code UserSubscription} associated with the user, or null if not found.
     */
    @Override
    public UserSubscription findUserSubscriptionByUser(User user) {
        UserSubscription userSubscription = userSubscriptionsRepository.findUserSubscriptionByUser(user);
        return userSubscription;
    }

    /**
     * Saves a user subscription to the repository.
     *
     * @param userSubscription the user subscription to be saved.
     * @return the saved {@code UserSubscription} object.
     */
    @Override
    public UserSubscription saveUserSubscription(UserSubscription userSubscription) {
        return userSubscriptionsRepository.save(userSubscription);
    }

    /**
     * Finds a user subscription based on the subscription email.
     *
     * @param subscriptionEmail the email associated with the subscription.
     * @return the {@code UserSubscription} associated with the email, or null if not found.
     */
    @Override
    public UserSubscription findUserSubscriptionBySubscriptionEmail(String subscriptionEmail) {
        return userSubscriptionsRepository.findUserSubscriptionByStripeSubscriptionEmail(subscriptionEmail);
    }

    /**
     * Deletes a user subscription from the repository.
     *
     * @param userSubscription the user subscription to be deleted.
     */
    @Override
    public void deleteUserSubscription(UserSubscription userSubscription) {
        userSubscriptionsRepository.deleteById(userSubscription.getId());
    }
}

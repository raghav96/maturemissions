package com.main.maturemissions.service;

import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserSubscription;
import org.springframework.stereotype.Service;

@Service
public interface UserSubscriptionService {

    public UserSubscription findUserSubscriptionByUser(User user);

    public UserSubscription saveUserSubscription(UserSubscription userSubscription);

    public UserSubscription findUserSubscriptionBySubscriptionEmail(String subscriptionEmail);

    public void deleteUserSubscription(UserSubscription userSubscription);

}

package com.main.maturemissions.repository;

import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSubscriptionsRepository extends JpaRepository<UserSubscription, Long> {

    public UserSubscription findUserSubscriptionByUser(User user);

    public UserSubscription findUserSubscriptionByStripeSubscriptionEmail(String stripeSubscriptionEmail);

}

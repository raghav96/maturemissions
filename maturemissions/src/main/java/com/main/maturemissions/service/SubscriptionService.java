package com.main.maturemissions.service;

import com.main.maturemissions.model.Subscriptions;

public interface SubscriptionService {

    public String getAllSubscriptionTypes();
    public Subscriptions findSubscriptionByProductId(String subscriptionId);
    
}

package com.main.maturemissions.model.pojo;

import com.main.maturemissions.model.Subscriptions;

import java.util.List;

public class SubscriptionDTO {

    public SubscriptionDTO(List<Subscriptions> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
    }

    private List<Subscriptions> subscriptionPlans;

    public SubscriptionDTO() {
    }

    public List<Subscriptions> getSubscriptionPlans() {
        return subscriptionPlans;
    }

    public void setSubscriptionPlans(List<Subscriptions> subscriptionPlans) {
        this.subscriptionPlans = subscriptionPlans;
    }
}

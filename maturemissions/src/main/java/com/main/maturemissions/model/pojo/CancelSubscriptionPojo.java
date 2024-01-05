package com.main.maturemissions.model.pojo;

public class CancelSubscriptionPojo {

    private Long userId;
    private String subscriptionId;

    public CancelSubscriptionPojo() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
    }
}

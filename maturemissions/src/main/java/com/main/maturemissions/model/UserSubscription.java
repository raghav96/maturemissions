package com.main.maturemissions.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name="user_subscription")
public class UserSubscription {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String stripeSubscriptionEmail;

    @Getter
    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="subscription_id", referencedColumnName = "id")
    private Subscriptions subscription;

    public UserSubscription() {
    }

    public UserSubscription(String stripeSubscriptionEmail, User user, Subscriptions subscription) {
        this.stripeSubscriptionEmail = stripeSubscriptionEmail;
        this.user = user;
        this.subscription = subscription;
    }

    public String getStripeSubscriptionEmail() {
        return stripeSubscriptionEmail;
    }

    public void setStripeSubscriptionEmail(String subscriptionId) {
        this.stripeSubscriptionEmail = subscriptionId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Subscriptions getSubscription() {
        return subscription;
    }

    public void setSubscription(Subscriptions subscription) {
        this.subscription = subscription;
    }
}

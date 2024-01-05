package com.main.maturemissions.repository;

import com.main.maturemissions.model.Subscriptions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscriptions, Long> {

    public Subscriptions findSubscriptionsByProductId(String productId);

}

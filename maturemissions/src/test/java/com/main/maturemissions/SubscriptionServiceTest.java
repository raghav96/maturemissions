package com.main.maturemissions;

import com.main.maturemissions.model.Subscriptions;
import com.main.maturemissions.repository.SubscriptionRepository;
import com.main.maturemissions.service.SubscriptionServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SubscriptionServiceTest {

    @InjectMocks
    private SubscriptionServiceImpl subscriptionService;

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @Test
    public void testGetAllSubscriptionTypes() {
        Subscriptions subscription = new Subscriptions();
        when(subscriptionRepository.findAll()).thenReturn(List.of(subscription));

        String result = subscriptionService.getAllSubscriptionTypes();

        assertNotNull(result);
        assertTrue(result.contains("subscriptionPlans"));

        verify(subscriptionRepository).findAll();
    }

    @Test
    public void testFindSubscriptionByProductId() {
        String productId = "product1";
        Subscriptions subscription = new Subscriptions();
        when(subscriptionRepository.findSubscriptionsByProductId(productId)).thenReturn(subscription);

        Subscriptions result = subscriptionService.findSubscriptionByProductId(productId);

        assertNotNull(result);
        assertEquals(subscription, result);
        verify(subscriptionRepository).findSubscriptionsByProductId(productId);
    }
}


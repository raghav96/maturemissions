package com.main.maturemissions;

import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserSubscription;
import com.main.maturemissions.repository.UserSubscriptionsRepository;
import com.main.maturemissions.service.UserSubscriptionServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserSubscriptionServiceTest {

    @Mock
    private UserSubscriptionsRepository userSubscriptionsRepository;

    @InjectMocks
    private UserSubscriptionServiceImpl userSubscriptionService;

    @Test
    public void testFindUserSubscriptionByUser() {
        User user = new User();
        UserSubscription userSubscription = new UserSubscription();
        when(userSubscriptionsRepository.findUserSubscriptionByUser(user)).thenReturn(userSubscription);

        UserSubscription result = userSubscriptionService.findUserSubscriptionByUser(user);

        assertNotNull(result);
        assertEquals(userSubscription, result);
    }

    @Test
    public void testSaveUserSubscription() {
        UserSubscription userSubscription = new UserSubscription();
        when(userSubscriptionsRepository.save(userSubscription)).thenReturn(userSubscription);

        UserSubscription result = userSubscriptionService.saveUserSubscription(userSubscription);

        assertNotNull(result);
        assertEquals(userSubscription, result);
    }

    @Test
    public void testFindUserSubscriptionBySubscriptionEmail() {
        String email = "test@example.com";
        UserSubscription userSubscription = new UserSubscription();
        when(userSubscriptionsRepository.findUserSubscriptionByStripeSubscriptionEmail(email)).thenReturn(userSubscription);

        UserSubscription result = userSubscriptionService.findUserSubscriptionBySubscriptionEmail(email);

        assertNotNull(result);
        assertEquals(userSubscription, result);
    }

    @Test
    public void testDeleteUserSubscription() {
        UserSubscription userSubscription = new UserSubscription();
        userSubscription.setId(1L);

        doNothing().when(userSubscriptionsRepository).deleteById(1L);

        userSubscriptionService.deleteUserSubscription(userSubscription);

        verify(userSubscriptionsRepository, times(1)).deleteById(1L);
    }
}


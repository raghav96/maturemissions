package com.main.maturemissions;

import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.User;
import com.main.maturemissions.repository.ProviderRepository;
import com.main.maturemissions.service.ProviderServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.*;

@SpringBootTest
public class ProviderServiceTest {

    @InjectMocks
    private ProviderServiceImpl providerService;

    @Mock
    private ProviderRepository providerRepository;

    @Test
    public void testGetProviderIdForUser() {
        User user = new User();
        providerService.getProviderIdForUser(user);

        verify(providerRepository, times(1)).getProviderByUser(user);
    }

    @Test
    public void testSetStripeAccountIdForUser() {
        User user = new User();
        Provider provider = new Provider();
        when(providerRepository.getProviderByUser(user)).thenReturn(provider);

        String response = providerService.setStripeAccountIdForUser(user, "test_account_id");

        verify(providerRepository, times(1)).save(provider);
        assert response.equals("Stripe Account Saved successfully!");
    }
}


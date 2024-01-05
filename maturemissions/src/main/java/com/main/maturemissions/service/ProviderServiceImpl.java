package com.main.maturemissions.service;

import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.User;
import com.main.maturemissions.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProviderServiceImpl implements ProviderService{

    @Autowired
    private ProviderRepository providerRepository;

    /**
     * Gets provider id for the user
     * @param user - user object to get provider id for
     * @return provider object
     */
    @Override
    public Provider getProviderIdForUser(User user) {
        return providerRepository.getProviderByUser(user);
    }

    /**
     * Sets the stripe account id for the provider to set up their account
     * @param user - user object
     * @param accountId - stripe account id used in setup
     * @return success message
     */
    public String setStripeAccountIdForUser(User user, String accountId) {
        Provider provider = providerRepository.getProviderByUser(user);
        provider.setStripeAccountId(accountId);
        providerRepository.save(provider);
        return "Stripe Account Saved successfully!";
    }
}

package com.main.maturemissions.service;

import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.User;
import org.springframework.stereotype.Service;

@Service
public interface ProviderService {

    public Provider getProviderIdForUser(User user);

    public String setStripeAccountIdForUser(User user, String accountId);
}

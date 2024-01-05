package com.main.maturemissions.repository;

import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProviderRepository extends JpaRepository<Provider, Long> {
    @Transactional
    void deleteProviderByUser(User user);

    Provider getProviderByUser(User user);
}

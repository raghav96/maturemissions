package com.main.maturemissions.repository;

import com.main.maturemissions.model.Payments;
import com.main.maturemissions.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentsRepository  extends JpaRepository<Payments, Long> {

    public List<Payments> findPaymentsByStatusEquals(String status);

    @Transactional
    public void deletePaymentsByServiceRequestUser(User user);
}

package com.main.maturemissions.service;

import com.main.maturemissions.model.Payments;
import com.main.maturemissions.model.ServiceRequests;
import com.main.maturemissions.model.User;

import java.util.List;

public interface PaymentsService {

    public String getAllActiveAndCompletedPayments();

    public String getAllCompletedPayments();

    public List<Payments> getAllPayments();

    public void deletePayment(Payments payment);

    public void insertPayment(Payments payment);

    public void deletePaymentsForUser(User user);

    public Payments getPaymentById(Long paymentId);

    public void completeServiceRequestPayments(ServiceRequests serviceRequest);
}

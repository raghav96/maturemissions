package com.main.maturemissions.service;

import com.google.gson.Gson;
import com.main.maturemissions.model.Payments;
import com.main.maturemissions.model.ServiceRequests;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.pojo.PaymentsListDTO;
import com.main.maturemissions.repository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This class handles the payment logic
 */
@Service
public class PaymentsServiceImpl implements PaymentsService{

    @Autowired
    private PaymentsRepository paymentsRepository;


    /**
     * This method gets all active and completed payments
     * @return list of all active and completed payments
     */
    @Override
    public String getAllActiveAndCompletedPayments() {
        List<Payments> activePaymentsList = paymentsRepository.findPaymentsByStatusEquals("Active");
        List<Payments> completedPaymentsList = paymentsRepository.findPaymentsByStatusEquals("Completed");
        activePaymentsList.addAll(completedPaymentsList);
        PaymentsListDTO paymentsListDTO = new PaymentsListDTO(activePaymentsList);
        return new Gson().toJson(paymentsListDTO);
    }

    /**
     * Gets all completed payments
     * @return list of all completed payments
     */
    @Override
    public String getAllCompletedPayments() {
        List<Payments> paymentsList = paymentsRepository.findPaymentsByStatusEquals("Completed");
        PaymentsListDTO paymentsListDTO = new PaymentsListDTO(paymentsList);
        return new Gson().toJson(paymentsListDTO);
    }

    /**
     * Gets the payment by payment id
     * @param paymentId - payment id of the user
     * @return payment object
     */
    @Override
    public Payments getPaymentById(Long paymentId) {
        return paymentsRepository.getReferenceById(paymentId);
    }

    /**
     * Sets the payment
     * @param serviceRequest - servicerequest to complete and set
     */
    @Override
    public void completeServiceRequestPayments(ServiceRequests serviceRequest) {
        Payments payment = new Payments();
        payment.setServiceRequest(serviceRequest);
        int amount = 0;
        payment.setAmount(amount);
        payment.setStatus("Active");
        paymentsRepository.save(payment);
    }

    /**
     * Returns all the payments
     * @return - returns list of payments
     */
    @Override
    public List<Payments> getAllPayments() {
        return null;
    }

    /**
     * Deletes the payment
     * @param payment - payment object to delete
     */
    @Override
    public void deletePayment(Payments payment) {
        paymentsRepository.delete(payment);
    }

    /**
     * Inserts a payment
     * @param payment - payment object to insert
     */
    @Override
    public void insertPayment(Payments payment) {
        paymentsRepository.save(payment);
    }

    /**
     * Deletes payments for the user
     * @param user - user object to delete payments
     */
    @Override
    public void deletePaymentsForUser(User user) {
        paymentsRepository.deletePaymentsByServiceRequestUser(user);
    }


}

package com.main.maturemissions.model.pojo;

import com.main.maturemissions.model.Payments;

import java.util.List;

public class PaymentsListDTO {
    List<Payments> paymentsList;

    public PaymentsListDTO(List<Payments> paymentsList) {
        this.paymentsList = paymentsList;
    }

    public PaymentsListDTO() {
    }

    public List<Payments> getPaymentsList() {
        return paymentsList;
    }

    public void setPaymentsList(List<Payments> paymentsList) {
        this.paymentsList = paymentsList;
    }
}

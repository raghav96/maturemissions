package com.main.maturemissions.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="payments")
public class Payments {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="request_id", referencedColumnName = "id")
    private ServiceRequests serviceRequest;

    @Column
    private Integer amount;

    @Column
    private Date paymentDate;

    @Column
    private String status;

    @Column
    private String paymentMethod;

    @Column
    private String paymentDetails;

    public Payments() {
    }

    public Payments(ServiceRequests serviceRequest, Integer amount, Date paymentDate, String status, String paymentMethod, String paymentDetails) {
        this.serviceRequest = serviceRequest;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.paymentDetails = paymentDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ServiceRequests getServiceRequest() {
        return serviceRequest;
    }

    public void setServiceRequest(ServiceRequests serviceRequest) {
        this.serviceRequest = serviceRequest;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(String paymentDetails) {
        this.paymentDetails = paymentDetails;
    }
}

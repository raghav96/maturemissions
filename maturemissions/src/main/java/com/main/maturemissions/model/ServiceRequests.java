package com.main.maturemissions.model;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Table(name="service_requests")
public class ServiceRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="provider_id", referencedColumnName = "id")
    private Provider provider;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    private Services service;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="review_id", referencedColumnName = "id")
    private Review review;

    @Column
    private Timestamp requestTime;

    @Column
    private Date requestDate;

    @Column
    private String status;

    public ServiceRequests(Long id, User user, Provider provider, Services service, Review review, Timestamp requestTime, Date requestDate, String status) {
        this.id = id;
        this.user = user;
        this.provider = provider;
        this.service = service;
        this.review = review;
        this.requestTime = requestTime;
        this.requestDate = requestDate;
        this.status = status;
    }

    public ServiceRequests() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public Services getService() {
        return service;
    }

    public void setService(Services service) {
        this.service = service;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Timestamp getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(Timestamp requestTime) {
        this.requestTime = requestTime;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(Date requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

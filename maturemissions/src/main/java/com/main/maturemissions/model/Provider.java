package com.main.maturemissions.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="provider")
public class Provider {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @Column
    private String details;

    @Column
    private String stripeAccountId;

    @Column
    private double rating;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "provider_services",
            joinColumns = @JoinColumn(name = "provider_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="service_id", referencedColumnName = "id")
    )
    private List<Services> services;

    public Provider(Long id, User user, String details, double rating, String stripeAccountId) {
        this.id = id;
        this.user = user;
        this.details = details;
        this.rating = rating;
        this.services = new ArrayList<Services>();
        this.stripeAccountId = stripeAccountId;
    }

    public Provider(){

    }

    public String getStripeAccountId() {
        return stripeAccountId;
    }

    public void setStripeAccountId(String stripeAccountId) {
        this.stripeAccountId = stripeAccountId;
    }

    public List<Services> getServices() {
        return services;
    }

    public void setServices(List<Services> services) {
        this.services = services;
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

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}

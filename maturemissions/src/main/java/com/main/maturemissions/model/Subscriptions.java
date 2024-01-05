package com.main.maturemissions.model;

import jakarta.persistence.*;

@Entity
@Table(name="subscriptions")
public class Subscriptions {

    /**
     * INSERT INTO `main`.`subscriptions` (`id`, `product_id`, `services_per_week`, `type`) VALUES ('1', 'price_1O0BN6GOC4VJVNP01F5rgYus', '3', 'Bronze');
     * INSERT INTO `main`.`subscriptions` (`id`, `product_id`, `services_per_week`, `type`) VALUES ('2', 'price_1O0BNKGOC4VJVNP0iYObSjyM', '5', 'Silver');
     * INSERT INTO `main`.`subscriptions` (`id`, `product_id`, `services_per_week`, `type`) VALUES ('3', 'price_1O0BNZGOC4VJVNP0ahoJqwOV', '7', 'Gold');
     */

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String productId;

    @Column
    private String type;

    @Column
    private Integer servicesPerWeek;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getServicesPerWeek() {
        return servicesPerWeek;
    }

    public void setServicesPerWeek(Integer servicesPerWeek) {
        this.servicesPerWeek = servicesPerWeek;
    }

    public Subscriptions(Long id, String productId) {
        this.id = id;
        this.productId = productId;
    }

    public Subscriptions() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

}

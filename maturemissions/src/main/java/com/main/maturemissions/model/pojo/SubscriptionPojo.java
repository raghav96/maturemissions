package com.main.maturemissions.model.pojo;
import com.stripe.model.Product;

public class SubscriptionPojo {


    private Long userId;
    private String name;
    private String email;
    private Product[] items;

    public SubscriptionPojo() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Product[] getItems() {
        return items;
    }

    public void setItems(Product[] items) {
        this.items = items;
    }
}

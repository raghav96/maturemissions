package com.main.maturemissions.model;

import jakarta.persistence.*;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private Integer rating;

    @Column
    private String description;

    @Column
    private String type;

    public Review(Long id, Integer rating, String description, String type) {
        this.id = id;
        this.rating = rating;
        this.description = description;
        this.type = type;
    }

    public Review() {
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}

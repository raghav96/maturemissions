package com.main.maturemissions.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="services")
public class Services {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @ManyToMany(mappedBy = "services")
    private List<Provider> providers;

    public Services(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Services() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

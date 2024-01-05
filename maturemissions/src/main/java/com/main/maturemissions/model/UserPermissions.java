package com.main.maturemissions.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="user_permissions")
public class UserPermissions {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @ElementCollection(fetch = FetchType.EAGER)
    List<AppUserRole> appUserRoles;

    public UserPermissions(){}

    public UserPermissions(User user, List<AppUserRole> appUserRoles) {
        this.user = user;
        this.appUserRoles = appUserRoles;
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

    public List<AppUserRole> getAppUserRoles() {
        return appUserRoles;
    }

    public void setAppUserRoles(List<AppUserRole> appUserRoles) {
        this.appUserRoles = appUserRoles;
    }
}

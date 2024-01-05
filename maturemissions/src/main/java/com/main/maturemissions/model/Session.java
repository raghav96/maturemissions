package com.main.maturemissions.model;

import jakarta.persistence.*;

@Entity
@Table(name="session")
public class Session {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String sessionKey;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    public Session() {
    }

    public Session(String sessionKey, User user) {
        this.sessionKey = sessionKey;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

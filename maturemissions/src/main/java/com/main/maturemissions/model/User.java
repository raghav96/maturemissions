package com.main.maturemissions.model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    @Column
    private boolean active;
    @Column
    private String name;
    @Column
    private Integer age;
    @Column
    private Integer phoneNumber;
    @Column
    private String email;
    @Column
    private Long medicareNumber;
    @Column
    private String address;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private Boolean emailNotifications;
    @Column
    private Boolean smsNotifications;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String imageLoc;

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEmailNotifications() {
        return emailNotifications;
    }

    public void setEmailNotifications(Boolean emailNotifications) {
        this.emailNotifications = emailNotifications;
    }

    public Boolean getSmsNotifications() {
        return smsNotifications;
    }

    public void setSmsNotifications(Boolean smsNotifications) {
        this.smsNotifications = smsNotifications;
    }

    public String getImageLoc() {
        return imageLoc;
    }

    public void setImageLoc(String imageLoc) {
        this.imageLoc = imageLoc;
    }

    public Long getMedicareNumber() {
        return medicareNumber;
    }

    public void setMedicareNumber(Long medicareNumber) {
        this.medicareNumber = medicareNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}

package com.main.maturemissions.model.pojo;

public class ChangeUserDetailsPojo {

    private Long userId;
    private String name;
    private Integer phoneNumber;
    private String email;
    private String username;
    private String address;
    private Long medicareNumber;
    private Integer age;
    private Boolean emailNotifications;
    private Boolean smsNotifications;
    private String imageLoc;
    private String type;

    private Boolean active;

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getType() { return type; }

    public void setType(String type) {
        this.type = type;
    }


}

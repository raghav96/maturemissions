package com.main.maturemissions.model.pojo;

public class LoginUserDTO {

    String userId;
    String username;

    String jwtToken;

    String role;

    public LoginUserDTO(String userId, String username, String jwtToken, String role) {
        this.userId = userId;
        this.username = username;
        this.jwtToken = jwtToken;
        this.role = role;
    }

    public LoginUserDTO() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

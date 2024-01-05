package com.main.maturemissions.model.pojo;

import com.main.maturemissions.model.User;

import java.util.List;

public class UserListDTO {
    List<User> userList;

    public UserListDTO(List<User> userList) {
        this.userList = userList;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }
}

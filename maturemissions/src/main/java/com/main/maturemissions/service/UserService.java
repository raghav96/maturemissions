package com.main.maturemissions.service;

import com.main.maturemissions.model.AppUserRole;
import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.User;

import java.util.List;

public interface UserService {

    User saveUser(User user);

    List<User> getUserList();

    String getAllUsers();

    User updateUser(User user, Long userId);

    void deleteUser(User user);

    User getUserByUsername(String username);

    User getUserById(Long id);

    List<String> getUsernameList();

    Provider getProviderForUser(User user);

    String signup(User appUser, AppUserRole role);

    String login(String username, String password);

    String changeUserDetails(Long id, String name, Integer age, Integer phoneNumber, String email, Long medicareNumber, String address, String username, Boolean emailNotifications, Boolean smsNotifications, String imageLoc, String type, Boolean active);
}

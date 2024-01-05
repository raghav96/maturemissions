package com.main.maturemissions.service;

import com.main.maturemissions.model.User;
import com.main.maturemissions.model.Session;

import java.util.List;

public interface SessionsService {

    Session saveSession(User user, String sessionKey);

    List<Session> getSessionKeys();
    String getSessionKeyForUser(User user);
    void deleteSessionKeyForUser(User user);



}

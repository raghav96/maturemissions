package com.main.maturemissions.service;

import com.main.maturemissions.model.Session;
import com.main.maturemissions.model.User;
import com.main.maturemissions.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This service handles the sessions, this is for future implementation
 * of storing user sessions and managing traffic
 */
@Service
public class SessionsServiceImpl implements SessionsService{

    @Autowired
    private SessionRepository sessionRepository;

    /**
     * @param user - username
     * @param sessionKey - gets the session key for the user
     * @return save of session
     */
    @Override
    public Session saveSession(User user, String sessionKey) {
        Session session = new Session(sessionKey, user);
        return sessionRepository.save(session);
    }

    /**
     * Gets all the session keys
     * @return list of session keys to user
     */
    @Override
    public List<Session> getSessionKeys() {
        return (List<Session>) sessionRepository.findAll();
    }

    /**
     * Gets the session key for the user
     * @param user - user for which you need a session key
     * @return - session key of the user
     */
    @Override
    public String getSessionKeyForUser(User user) {
        List<Session> sessionList = getSessionKeys();
        for (Session session: sessionList) {
            if (session.getUser().getUsername().equalsIgnoreCase(user.getUsername())) {
                return session.getSessionKey();
            }
        }
        return "";
    }

    /**
     * Deletes the session key for the user
     * @param user - user for which you want to delete the session key
     */
    @Override
    public void deleteSessionKeyForUser(User user) {
        List<Session> sessionList = getSessionKeys();
        for (Session session: sessionList) {
            if (session.getUser().getUsername().equalsIgnoreCase(user.getUsername())) {
                sessionRepository.delete(session);
                return;
            }
        }
    }
}

package com.main.maturemissions;

import com.main.maturemissions.model.Session;
import com.main.maturemissions.model.User;
import com.main.maturemissions.repository.SessionRepository;
import com.main.maturemissions.service.SessionsServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

import static org.mockito.Mockito.*;

@SpringBootTest
public class SessionsServiceTest {

    @InjectMocks
    private SessionsServiceImpl sessionsService;

    @Mock
    private SessionRepository sessionRepository;

    @Test
    public void testSaveSession() {
        User user = new User();
        user.setUsername("testUser");
        Session session = new Session("testKey", user);

        when(sessionRepository.save(any(Session.class))).thenReturn(session);

        sessionsService.saveSession(user, "testKey");

        verify(sessionRepository, times(1)).save(any(Session.class));
    }

    @Test
    public void testGetSessionKeyForUser() {
        User user = new User();
        user.setUsername("testUser");
        Session session = new Session("testKey", user);

        when(sessionRepository.findAll()).thenReturn(Arrays.asList(session));

        String sessionKey = sessionsService.getSessionKeyForUser(user);

        verify(sessionRepository, times(1)).findAll();
        assert sessionKey.equals("testKey");
    }

    @Test
    public void testDeleteSessionKeyForUser() {
        User user = new User();
        user.setUsername("testUser");
        Session session = new Session("testKey", user);

        when(sessionRepository.findAll()).thenReturn(Arrays.asList(session));

        sessionsService.deleteSessionKeyForUser(user);

        verify(sessionRepository, times(1)).delete(any(Session.class));
    }
}


package com.main.maturemissions;

import com.main.maturemissions.model.AppUserRole;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import com.main.maturemissions.repository.UserPermissionsRepository;
import com.main.maturemissions.service.UserPermissionsServiceImpl;
import com.main.maturemissions.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserPermissionsServiceTest {

    @InjectMocks
    private UserPermissionsServiceImpl userPermissionsService;

    @Mock
    private UserPermissionsRepository userPermissionsRepository;

    @Mock
    private UserService userService;

    @Test
    public void testGetPermissionsForUser() {
        User user = new User();
        user.setId(Long.valueOf(1));
        UserPermissions userPermissions = new UserPermissions();
        userPermissions.setUser(user);
        List<AppUserRole> usersRole = new ArrayList<>();
        usersRole.add(AppUserRole.ROLE_USER);
        userPermissions.setAppUserRoles(usersRole);


        when(userPermissionsRepository.findAll()).thenReturn(List.of(userPermissions));
        userPermissionsService.setUserPermissionsRepository(userPermissionsRepository);
        List<AppUserRole> permissions = userPermissionsService.getPermissionsForUser(user);

        assertEquals(permissions, usersRole);
        verify(userPermissionsRepository).findAll();
    }

    @Test
    public void testSaveUserPermissionsForUser() {
        User user = new User();
        List<AppUserRole> permissions = List.of(AppUserRole.ROLE_USER);

        UserPermissions userPermissions = new UserPermissions();
        when(userPermissionsRepository.save(any(UserPermissions.class))).thenReturn(userPermissions);

        UserPermissions result = userPermissionsService.saveUserPermissionsForUser(user, permissions);

        assertNotNull(result);
        verify(userPermissionsRepository).save(any(UserPermissions.class));
    }

    @Test
    public void testUpdateUserPermissions() {
        User user = new User();
        UserPermissions userPermissions = new UserPermissions();
        userPermissions.setUser(user);

        when(userPermissionsRepository.findAll()).thenReturn(List.of(userPermissions));
        when(userPermissionsRepository.save(any(UserPermissions.class))).thenReturn(userPermissions);

        UserPermissions result = userPermissionsService.updateUserPermissions(user, List.of(AppUserRole.ROLE_ADMIN));

        assertNotNull(result);
        verify(userPermissionsRepository).save(any(UserPermissions.class));
    }
}


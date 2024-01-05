package com.main.maturemissions;

import com.google.gson.Gson;
import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.AppUserRole;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import com.main.maturemissions.model.pojo.LoginUserDTO;
import com.main.maturemissions.repository.UserPermissionsRepository;
import com.main.maturemissions.repository.UsersRepository;
import com.main.maturemissions.security.JwtTokenProvider;
import com.main.maturemissions.service.UserServiceImpl;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UsersRepository userRepository;

    @Mock
    private UserPermissionsRepository userPermissionsRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    public void testLogin() throws AuthorizerException {
        String username = "username";
        String password = "password";
        List<User> users = new ArrayList<>();
        List<AppUserRole> usersRole = new ArrayList<>();
        User user = new User();
        user.setUsername("username");
        user.setId(Long.valueOf(1));
        users.add(user);
        UserPermissions userPermissions = new UserPermissions();
        AppUserRole appUserRole = AppUserRole.ROLE_USER;
        userPermissions.setAppUserRoles(usersRole);
        usersRole.add(appUserRole);


        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(userRepository.findAll()).thenReturn(users);
        when(userPermissionsRepository.findByUserId(any())).thenReturn(userPermissions);
        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(jwtTokenProvider.createToken(any(), any())).thenReturn("token");
        this.userService.setUserRepository(userRepository);
        this.userService.setUserPermissionsRepository(userPermissionsRepository);
        String result = userService.login(username, password);

        LoginUserDTO loginUserDTO = new LoginUserDTO(user.getId().toString(), username, "token", "ROLE_USER");
        assertEquals(result, new Gson().toJson(loginUserDTO));
        verify(authenticationManager).authenticate(any());
    }


    @Test
    public void testSignup() throws AuthorizerException {

        List<User> users = new ArrayList<>();
        List<AppUserRole> usersRole = new ArrayList<>();
        User user = new User();
        user.setUsername("username");
        user.setPassword("password");
        user.setId(Long.valueOf(1));
        UserPermissions userPermissions = new UserPermissions();
        AppUserRole appUserRole = AppUserRole.ROLE_USER;
        usersRole.add(appUserRole);
        userPermissions.setAppUserRoles(usersRole);
        userPermissions.setUser(user);

        when(userRepository.findAll()).thenReturn(users);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userPermissionsRepository.save(any(UserPermissions.class))).thenReturn(userPermissions);
        this.userService.setUserRepository(userRepository);
        this.userService.setUserPermissionsRepository(userPermissionsRepository);

        String result = userService.signup(user, appUserRole);
        LoginUserDTO loginUserDTO = new LoginUserDTO(user.getId().toString(), user.getUsername(), null ,"ROLE_USER");

        assertEquals(result, new Gson().toJson(loginUserDTO));
        verify(userRepository).save(any(User.class));
        verify(passwordEncoder).encode(anyString());
    }


    @Test
    public void testChangeUserDetails() {
        Long id = 1L;
        User user = new User();
        user.setId(id);
        List<User> users = new ArrayList<>();
        users.add(user);
        when(userRepository.findAll()).thenReturn(users);
        when(userRepository.save(any(User.class))).thenReturn(user);
        this.userService.setUserRepository(userRepository);

        String result = userService.changeUserDetails(id, "name", 25, 123456789, "email@example.com", 12345L, "address", "username", true, true, "imageLoc", "USER", true);

        assertEquals("successfully changed user details!", result);
        verify(userRepository).save(any(User.class));
    }

}


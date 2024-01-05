package com.main.maturemissions.security;

import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import com.main.maturemissions.repository.UserPermissionsRepository;
import com.main.maturemissions.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * This class handles authentication by retrieving user details
 */
@Service
@RequiredArgsConstructor
public class AuthUserService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserPermissionsRepository userPermissionsRepository;

    /**
     * @param username the username identifying the user whose data is required.
     * @return UserDetails of the user based on their username
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User appUser = usersRepository.findByUsername(username);
        final UserPermissions userPermissions = userPermissionsRepository.findByUserId(appUser.getId());

        if (appUser == null) {
            throw new UsernameNotFoundException("User '" + username + "' not found");
        }

        return org.springframework.security.core.userdetails.User//
                .withUsername(username)//
                .password(appUser.getPassword())//
                .authorities(userPermissions.getAppUserRoles())//
                .accountExpired(false)//
                .accountLocked(false)//
                .credentialsExpired(false)//
                .disabled(false)//
                .build();
    }
}

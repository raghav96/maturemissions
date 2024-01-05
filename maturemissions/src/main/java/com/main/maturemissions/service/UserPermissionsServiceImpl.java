package com.main.maturemissions.service;

import com.main.maturemissions.model.AppUserRole;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import com.main.maturemissions.repository.UserPermissionsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Objects;

/**
 * Service class for managing user permissions.
 * This service provides methods to get, save, update, and delete permissions for a user.
 */
public class UserPermissionsServiceImpl implements UserPermissionsService {

    /**
     * The service to access user data.
     */
    @Autowired
    private UserService userService;

    /**
     * The repository to access user permissions data.
     */
    @Autowired
    private UserPermissionsRepository userPermissionsRepository;

    /**
     * Retrieves the list of {@code AppUserRole} associated with a user.
     *
     * @param user the user whose permissions are to be retrieved.
     * @return a list of {@code AppUserRole} associated with the user.
     */
    @Override
    public List<AppUserRole> getPermissionsForUser(User user) {
        UserPermissions userPermissions = getUserPermissionsForUser(user);
        return userPermissions.getAppUserRoles();
    }

    /**
     * Setter method for {@code UserPermissionsRepository}.
     *
     * @param userPermissionsRepository the repository to set.
     */
    public void setUserPermissionsRepository(UserPermissionsRepository userPermissionsRepository) {
        this.userPermissionsRepository = userPermissionsRepository;
    }

    /**
     * Saves a list of {@code AppUserRole} for a user.
     *
     * @param user        the user whose permissions are to be saved.
     * @param permissions the list of {@code AppUserRole} to be saved for the user.
     * @return the {@code UserPermissions} object that was saved.
     */
    @Override
    public UserPermissions saveUserPermissionsForUser(User user, List<AppUserRole> permissions) {
        UserPermissions userPermissions = new UserPermissions(user, permissions);
        return userPermissionsRepository.save(userPermissions);
    }

    /**
     * Retrieves the {@code UserPermissions} object for a user.
     *
     * @param user the user whose permissions are to be retrieved.
     * @return the {@code UserPermissions} object for the user, or null if not found.
     */
    @Override
    public UserPermissions getUserPermissionsForUser(User user) {
        List<UserPermissions> userPermissionsList = (List<UserPermissions>) userPermissionsRepository.findAll();
        for (UserPermissions userPermissions : userPermissionsList) {
            if (Objects.equals(userPermissions.getUser().getId(), user.getId())) {
                return userPermissions;
            }
        }
        return null;
    }

    /**
     * Updates the list of {@code AppUserRole} for a user.
     *
     * @param user        the user whose permissions are to be updated.
     * @param permissions the new list of {@code AppUserRole} for the user.
     * @return the updated {@code UserPermissions} object.
     */
    @Override
    public UserPermissions updateUserPermissions(User user, List<AppUserRole> permissions) {
        UserPermissions userPermissions = getUserPermissionsForUser(user);
        userPermissions.setAppUserRoles(permissions);
        return userPermissionsRepository.save(userPermissions);
    }

    /**
     * Deletes the {@code UserPermissions} object for a user.
     *
     * @param user the user whose permissions are to be deleted.
     */
    @Override
    public void deleteUserPermissions(User user) {
        UserPermissions userPermissions = getUserPermissionsForUser(user);
        userPermissionsRepository.delete(userPermissions);
    }
}


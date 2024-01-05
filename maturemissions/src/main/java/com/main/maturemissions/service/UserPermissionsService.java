package com.main.maturemissions.service;

import com.main.maturemissions.model.AppUserRole;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserPermissionsService {

    public List<AppUserRole> getPermissionsForUser(User user);
    public UserPermissions saveUserPermissionsForUser(User user, List<AppUserRole> permissions);
    public UserPermissions getUserPermissionsForUser(User user);
    public UserPermissions updateUserPermissions(User user, List<AppUserRole>  permissions);
    public void deleteUserPermissions(User user);

}

package com.main.maturemissions.repository;

import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserPermissions;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPermissionsRepository extends JpaRepository<UserPermissions, Long> {

    public UserPermissions findByUserId(Long userId);

    @Transactional
    public void deleteUserPermissionsByUser(User user);

}

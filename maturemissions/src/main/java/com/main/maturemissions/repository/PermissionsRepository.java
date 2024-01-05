package com.main.maturemissions.repository;

import com.main.maturemissions.model.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionsRepository extends JpaRepository<Permissions, Long> {
}

package com.main.maturemissions.model;

import org.springframework.security.core.GrantedAuthority;

public enum AppUserRole implements GrantedAuthority {
  ROLE_ADMIN, ROLE_USER, ROLE_PROVIDER;

  public String getAuthority() {
    return name();
  }

}

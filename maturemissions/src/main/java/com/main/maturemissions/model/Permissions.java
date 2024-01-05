package com.main.maturemissions.model;

import jakarta.persistence.*;

@Entity
@Table(name="permissions")
public class Permissions {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String permissionName;
}

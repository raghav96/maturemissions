package com.main.maturemissions.repository;

import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicesRepository extends JpaRepository<Services, Long> {

    public Services getServicesById(Long id);

}

package com.main.maturemissions.service;

import com.main.maturemissions.model.Services;

import java.util.List;

public interface ServicesService {

    public void selectServices(Long providerId, List<Long> services);

    public String getServicesByProvider(Long providerId);

    public Services getServiceById(Long id);



}

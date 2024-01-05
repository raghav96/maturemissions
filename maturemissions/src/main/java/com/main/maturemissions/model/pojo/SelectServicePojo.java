package com.main.maturemissions.model.pojo;

import java.util.List;

public class SelectServicePojo {

    private Long providerId;
    List<Long> services;

    public SelectServicePojo(Long providerId, List<Long> serviceId) {
        this.providerId = providerId;
        this.services = serviceId;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public List<Long> getServices() {
        return services;
    }

    public void setServices(List<Long> services) {
        this.services = services;
    }
}

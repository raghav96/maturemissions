package com.main.maturemissions.model.pojo;

import com.main.maturemissions.model.ServiceRequests;

import java.util.List;

public class ServiceRequestDTO {
    List<ServiceRequests> serviceRequestsList;

    public ServiceRequestDTO(List<ServiceRequests> serviceRequestsList) {
        this.serviceRequestsList = serviceRequestsList;
    }

    public List<ServiceRequests> getServiceRequestsList() {
        return serviceRequestsList;
    }

    public void setServiceRequestsList(List<ServiceRequests> serviceRequestsList) {
        this.serviceRequestsList = serviceRequestsList;
    }
}

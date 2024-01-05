package com.main.maturemissions.model.pojo;

import com.main.maturemissions.model.ServiceRequests;

public class ServiceRequestResponseDTO {

    ServiceRequests serviceRequest;

    public ServiceRequestResponseDTO(ServiceRequests serviceRequest) {
        this.serviceRequest = serviceRequest;
    }

    public ServiceRequestResponseDTO() {
    }

    public ServiceRequests getServiceRequest() {
        return serviceRequest;
    }

    public void setServiceRequest(ServiceRequests serviceRequest) {
        this.serviceRequest = serviceRequest;
    }
}

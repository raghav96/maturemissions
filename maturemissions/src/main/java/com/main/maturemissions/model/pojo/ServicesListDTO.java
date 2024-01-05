package com.main.maturemissions.model.pojo;

import com.main.maturemissions.model.Services;

import java.util.List;

public class ServicesListDTO {

    List<Services> servicesList;

    public ServicesListDTO(List<Services> servicesList) {
        this.servicesList = servicesList;
    }

    public List<Services> getServicesList() {
        return servicesList;
    }

    public void setServicesList(List<Services> servicesList) {
        this.servicesList = servicesList;
    }
}

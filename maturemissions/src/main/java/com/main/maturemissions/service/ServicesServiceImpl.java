package com.main.maturemissions.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.Services;
import com.main.maturemissions.model.pojo.ServicesListDTO;
import com.main.maturemissions.repository.ProviderRepository;
import com.main.maturemissions.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * This class handles the services that the service provider can provide
 */
@Service
public class ServicesServiceImpl implements  ServicesService{

    @Autowired
    private ServicesRepository servicesRepository;

    @Autowired
    private ProviderRepository providerRepository;

    /**
     * Gets the service by the service id
     * @param id - id of the service
     * @return the service
     */
    @Override
    public Services getServiceById(Long id) {
        Services services = servicesRepository.getServicesById(id);
        if (services == null){
            throw new AuthorizerException("The service doesn't exist", HttpStatus.NOT_FOUND);
        }
        return services;
    }

    /**
     * Selects the services by the provider
     * @param providerId - id of the provider
     * @param services - services they would like to provide
     */
    @Override
    public void selectServices(Long providerId, List<Long> services){
        Provider provider = providerRepository.getReferenceById(providerId);
        if (provider == null){
            throw new AuthorizerException("The provider doesn't exist", HttpStatus.NOT_FOUND);
        }
        List<Services> convertedServiceList = new ArrayList<>();
        for (Long serviceId : services){
            convertedServiceList.add(servicesRepository.getServicesById(serviceId));
        }
        provider.setServices(convertedServiceList);
        providerRepository.save(provider);
    }


    /**
     * Gets services provided by caregiver
     * @param providerId - id of the provider
     * @return list of services of the provider
     */
    @Override
    public String getServicesByProvider(Long providerId) {
        Provider provider = providerRepository.getReferenceById(providerId);
        if (provider == null){
            throw new AuthorizerException("The provider doesn't exist", HttpStatus.NOT_FOUND);
        }
        ServicesListDTO servicesListDTO = new ServicesListDTO(provider.getServices());
        try {
            return new ObjectMapper().writeValueAsString(servicesListDTO);
        } catch(Exception e) {
            throw new AuthorizerException(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

package com.main.maturemissions;

import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.Provider;
import com.main.maturemissions.model.Services;
import com.main.maturemissions.repository.ProviderRepository;
import com.main.maturemissions.repository.ServicesRepository;
import com.main.maturemissions.service.ServicesServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

import static org.mockito.Mockito.*;

@SpringBootTest
public class ServicesServiceTest {

    @InjectMocks
    private ServicesServiceImpl servicesService;

    @Mock
    private ServicesRepository servicesRepository;

    @Mock
    private ProviderRepository providerRepository;

    @Test
    public void testGetServiceById() {
        Services service = new Services();
        service.setId(1L);

        when(servicesRepository.getServicesById(1L)).thenReturn(service);

        servicesService.getServiceById(1L);

        verify(servicesRepository, times(1)).getServicesById(1L);
    }

    @Test
    public void testSelectServices() {
        Provider provider = new Provider();
        provider.setId(1L);

        Services service = new Services();
        service.setId(1L);

        when(providerRepository.getReferenceById(1L)).thenReturn(provider);
        when(servicesRepository.getServicesById(1L)).thenReturn(service);

        servicesService.selectServices(1L, Arrays.asList(1L));

        verify(providerRepository, times(1)).save(any(Provider.class));
    }

    @Test
    public void testGetServicesByProvider() {
        Provider provider = new Provider();
        provider.setId(1L);
        Services service = new Services();
        service.setId(1L);
        provider.setServices(Arrays.asList(service));

        when(providerRepository.getReferenceById(1L)).thenReturn(provider);

        servicesService.getServicesByProvider(1L);

        verify(providerRepository, times(1)).getReferenceById(1L);
    }

    @Test
    public void testGetServiceById_NotFound() {
        when(servicesRepository.getServicesById(1L)).thenReturn(null);

        try {
            servicesService.getServiceById(1L);
        } catch (AuthorizerException e) {
            // assert the exception
        }

        verify(servicesRepository, times(1)).getServicesById(1L);
    }
}


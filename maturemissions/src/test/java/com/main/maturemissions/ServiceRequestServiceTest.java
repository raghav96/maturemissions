package com.main.maturemissions;

import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.Review;
import com.main.maturemissions.model.ServiceRequests;
import com.main.maturemissions.repository.ProviderRepository;
import com.main.maturemissions.repository.ReviewRepository;
import com.main.maturemissions.repository.ServiceRequestsRepository;
import com.main.maturemissions.service.ServiceRequestServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.*;

@SpringBootTest
public class ServiceRequestServiceTest {

    @InjectMocks
    private ServiceRequestServiceImpl serviceRequestService;

    @Mock
    private ServiceRequestsRepository serviceRequestsRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private ProviderRepository providerRepository;

    @Test
    public void testGetAllOpenRequests() {
        serviceRequestService.getAllOpenRequests();
        verify(serviceRequestsRepository, times(1)).findServiceRequestsByStatus("Open");
    }

    @Test
    public void testCancelRequest() {
        ServiceRequests serviceRequests = new ServiceRequests();
        serviceRequests.setStatus("Open");

        when(serviceRequestsRepository.getReferenceById(1L)).thenReturn(serviceRequests);

        serviceRequestService.cancelRequest(1L);

        verify(serviceRequestsRepository, times(1)).deleteDistinctById(1L);
    }

    @Test
    public void testCompleteService() {
        ServiceRequests serviceRequests = new ServiceRequests();

        when(serviceRequestsRepository.getReferenceById(1L)).thenReturn(serviceRequests);
        when(reviewRepository.save(any(Review.class))).thenReturn(new Review());

        serviceRequestService.completeService(1L, 3, "Good Service");

        verify(serviceRequestsRepository, times(1)).save(any(ServiceRequests.class));
    }

    @Test
    public void testCompleteService_RatingTooHigh() {
        try {
            serviceRequestService.completeService(1L, 6, "Excellent Service");
        } catch (AuthorizerException e) {
            // Assert the exception here
        }
    }

    @Test
    public void testBookService() {
        ServiceRequests request = new ServiceRequests();
        when(serviceRequestsRepository.save(any(ServiceRequests.class))).thenReturn(request);

        serviceRequestService.bookService(request);

        verify(serviceRequestsRepository, times(1)).save(request);
    }

    @Test
    public void testReportService() {
        ServiceRequests serviceRequests = new ServiceRequests();
        when(serviceRequestsRepository.getReferenceById(1L)).thenReturn(serviceRequests);
        when(reviewRepository.save(any(Review.class))).thenReturn(new Review());

        serviceRequestService.reportService(1L, "Bad Service");

        verify(reviewRepository, times(1)).save(any(Review.class));
        verify(serviceRequestsRepository, times(1)).save(any(ServiceRequests.class));
    }
}


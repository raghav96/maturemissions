package com.main.maturemissions.service;

import com.google.gson.Gson;
import com.main.maturemissions.exception.AuthorizerException;
import com.main.maturemissions.model.*;
import com.main.maturemissions.model.pojo.ServiceRequestDTO;
import com.main.maturemissions.model.pojo.ServiceRequestResponseDTO;
import com.main.maturemissions.repository.ProviderRepository;
import com.main.maturemissions.repository.ReviewRepository;
import com.main.maturemissions.repository.ServiceRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class handles the service requests
 */
@Service
public class ServiceRequestServiceImpl implements ServiceRequestService{

    @Autowired
    private ServiceRequestsRepository serviceRequestsRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProviderRepository providerRepository;

    /**
     * Gets all the open requests
     * @return - list of open requests
     */
    @Override
    public String getAllOpenRequests() {
        List<ServiceRequests> serviceRequests = serviceRequestsRepository.findServiceRequestsByStatus("Open");
        ServiceRequestDTO serviceRequestDTO = new ServiceRequestDTO(serviceRequests);
        return new Gson().toJson(serviceRequestDTO);
    }

    /**
     * Gets all reported services
     * @return list of reported services
     */
    @Override
    public String getAllReportedServices() {
        List<ServiceRequests> serviceRequests = serviceRequestsRepository.findServiceRequestsByReviewType("Report");
        ServiceRequestDTO serviceRequestDTO = new ServiceRequestDTO(serviceRequests);
        return new Gson().toJson(serviceRequestDTO);
    }

    /**
     * Gets all the services
     * @return list of all services
     */
    @Override
    public String getAllServices() {
        List<ServiceRequests> serviceRequests = serviceRequestsRepository.findAll();
        ServiceRequestDTO serviceRequestDTO = new ServiceRequestDTO(serviceRequests);
        return new Gson().toJson(serviceRequestDTO);
    }

    /**
     * Accepts a request for a provider
     * @param serviceRequestId - service request being accepted
     * @param providerId - provider id of the request provider
     * @param accepted - accepted flag for setting the request to be open or accepted
     * @return success message
     */
    @Override
    public String caregiverRequestAcceptance(Long serviceRequestId, Long providerId, Boolean accepted) {
        ServiceRequests serviceRequests = getServiceRequestById(serviceRequestId);
        Provider provider = providerRepository.getReferenceById(providerId);
        if (provider == null){
            throw new AuthorizerException("The provider doesn't exist", HttpStatus.NOT_FOUND);
        }
        serviceRequests.setProvider(provider);
        if (accepted == false) {
            serviceRequests.setStatus("open");
            serviceRequests.setProvider(null);
        } else {
            serviceRequests.setStatus("accepted");
        }
        ServiceRequests serviceRequest = serviceRequestsRepository.save(serviceRequests);
        return "successfully updated request";
    }

    /**
     * Gets all request for elderly user
     * @param user - user for which we need request
     * @return list of elderly requests
     */
    @Override
    public String getElderlyUserRequests(User user) {
        List<ServiceRequests> serviceRequests = serviceRequestsRepository.findServiceRequestsByUserAndStatusNot(user, "complete");
        ServiceRequestDTO serviceRequestDTO = new ServiceRequestDTO(serviceRequests);
        return new Gson().toJson(serviceRequestDTO);
    }

    /**
     * Checks if the user has exceeded number of service requests per week
     * @param user - user for which to check
     * @param userSubscription - user subscription object of the user
     * @param date - current date
     * @return false if not exceeded, true if exceeded
     */
    @Override
    public boolean getServiceRequestLimitExceeded(User user, UserSubscription userSubscription, Date date) {
        List<ServiceRequests> serviceRequests = serviceRequestsRepository.findServiceRequestsByUser(user);
        int count = 0;
        LocalDate localDate = date.toLocalDate();
        LocalDate weekAgo = localDate.minusWeeks(1);

        for (ServiceRequests serviceRequest : serviceRequests) {
            if (serviceRequest.getRequestDate().toLocalDate().isAfter(weekAgo)) {
                count++;
            }
        }

        if (count > userSubscription.getSubscription().getServicesPerWeek()) {
            return false;
        } else {
            return true;
        }

    }

    /**
     * Method to book service
     * @param serviceRequests - gets the service request to book it
     * @return success message
     */
    @Override
    public String bookService(ServiceRequests serviceRequests) {
        ServiceRequests serviceRequest = serviceRequestsRepository.save(serviceRequests);
        ServiceRequestResponseDTO serviceRequestResponseDTO = new ServiceRequestResponseDTO(serviceRequest);
        return "success";
    }


    /**
     * Gets service request by id
     * @param id - id of service request
     * @return service request for the id
     */
    public ServiceRequests getServiceRequestById(Long id){
        ServiceRequests serviceRequests = serviceRequestsRepository.getReferenceById(id);
        if (serviceRequests == null){
            throw new AuthorizerException("The service request doesn't exist", HttpStatus.NOT_FOUND);
        }
        return serviceRequests;
    }

    /**
     * Cancels the service request for the given id
     * @param id - id of service request to cancel
     * @return response of service request being cancelled
     */
    @Override
    public String cancelRequest(Long id) {
        ServiceRequests serviceRequests = getServiceRequestById(id);
        if (serviceRequests.getStatus().equalsIgnoreCase("complete")){
            throw new AuthorizerException("The service request has been completed and cannot be canceled", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        serviceRequestsRepository.deleteDistinctById(id);
        Map<String, String> responseBody = new HashMap<String, String>();
        responseBody.put("status", String.valueOf(HttpStatus.OK.value()));
        responseBody.put("message", "Service Request cancelled");
        return new Gson().toJson(responseBody);
    }

    /**
     * Completes the service request
     * @param id - id of service request to complete
     * @param rating - rating of the service request
     * @param description - description of the service request
     * @return service request
     */
    @Override
    public String completeService(Long id, Integer rating, String description) {
       ServiceRequests serviceRequests = getServiceRequestById(id);
       Review review = new Review();
       if (rating > 5){
           throw new AuthorizerException("Review Rating has to be less than 5", HttpStatus.BAD_REQUEST);
       } else if (rating < 0){
           throw new AuthorizerException("Review Rating has to be greater than 0", HttpStatus.BAD_REQUEST);
       }
       review.setRating(rating);
       review.setDescription(description);
       review.setType("normal");
       Review savedReview = reviewRepository.save(review);
       serviceRequests.setReview(savedReview);
       serviceRequests.setStatus("complete");
       ServiceRequests serviceRequestsSave = serviceRequestsRepository.save(serviceRequests);
       ServiceRequestResponseDTO serviceRequestResponseDTO = new ServiceRequestResponseDTO(serviceRequestsSave);
       return new Gson().toJson(serviceRequestResponseDTO);
    }

    /**
     * Reported service
     * @param id - id of service request to report
     * @param description - description of reported service
     * @return - json of reported service
     */
    @Override
    public String reportService(Long id, String description) {
        ServiceRequests serviceRequests = getServiceRequestById(id);
        Review review = new Review();
        review.setType("report");
        review.setDescription(description);
        Review savedReview = reviewRepository.save(review);
        serviceRequests.setReview(savedReview);
        serviceRequests.setStatus("reported");
        ServiceRequests serviceRequestsSave = serviceRequestsRepository.save(serviceRequests);
        ServiceRequestResponseDTO serviceRequestResponseDTO = new ServiceRequestResponseDTO(serviceRequestsSave);
        return new Gson().toJson(serviceRequestResponseDTO);
    }


    @Override
    public void deleteServiceRequestsForUser(User user) {
        serviceRequestsRepository.deleteServiceRequestsByUser(user);
    }


}

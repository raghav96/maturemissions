package com.main.maturemissions.service;

import com.main.maturemissions.model.ServiceRequests;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.UserSubscription;

import java.sql.Date;

public interface ServiceRequestService {

    public String getAllOpenRequests();

    public String getAllReportedServices();

    public String getAllServices();

    public String caregiverRequestAcceptance(Long serviceRequestId, Long providerId, Boolean accepted);

    public String getElderlyUserRequests(User user);

    public String bookService(ServiceRequests serviceRequests);

    public String cancelRequest(Long id);

    public String completeService(Long id, Integer rating, String description);

    public String reportService(Long id, String description);

    public void deleteServiceRequestsForUser(User user);

    public ServiceRequests getServiceRequestById(Long id);

    public boolean getServiceRequestLimitExceeded(User user, UserSubscription userSubscription, Date date);

}

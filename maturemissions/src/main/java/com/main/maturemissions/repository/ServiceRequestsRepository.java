package com.main.maturemissions.repository;

import com.main.maturemissions.model.ServiceRequests;
import com.main.maturemissions.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestsRepository extends JpaRepository<ServiceRequests, Long> {
    public List<ServiceRequests> findServiceRequestsByStatus(String status);

    public List<ServiceRequests> findServiceRequestsByReviewType(String type);

    public List<ServiceRequests> findServiceRequestsByUserAndStatusNot(User user, String status);

    @Transactional
    public void deleteDistinctById(Long id);

    @Transactional
    public void deleteServiceRequestsByUser(User user);

    public List<ServiceRequests> findServiceRequestsByUser(User user);

}

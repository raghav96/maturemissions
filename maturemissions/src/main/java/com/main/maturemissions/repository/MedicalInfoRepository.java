package com.main.maturemissions.repository;

import com.main.maturemissions.model.MedicalInfo;
import com.main.maturemissions.model.Payments;
import com.main.maturemissions.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalInfoRepository extends JpaRepository<MedicalInfo, Long> {
    public MedicalInfo findMedicalInfoByUser(User user);

}

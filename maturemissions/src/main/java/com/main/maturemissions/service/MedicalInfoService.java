package com.main.maturemissions.service;

import com.main.maturemissions.model.User;

public interface MedicalInfoService {

    public String addMedicalInfo(Long userId, String contactName, String relationship, Integer phoneNumber, String medicalConditions, String mobilityLevel, String assistiveDevices, String allergies, String dietaryRestrictions, String doctorName, Integer doctorContact, String medications, String medicalPreferences, Long medicareNumber);

    public String getMedicalInfo(User user);

}

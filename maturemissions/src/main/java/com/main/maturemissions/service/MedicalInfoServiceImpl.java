package com.main.maturemissions.service;

import com.google.gson.Gson;
import com.main.maturemissions.model.MedicalInfo;
import com.main.maturemissions.model.User;
import com.main.maturemissions.model.pojo.MedicalInfoDTO;
import com.main.maturemissions.repository.MedicalInfoRepository;
import com.main.maturemissions.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This service handles adding, editing and retrieving medical info
 */
@Service
public class MedicalInfoServiceImpl implements MedicalInfoService {

    @Autowired
    private MedicalInfoRepository medicalInfoRepository;

    @Autowired
    private UsersRepository usersRepository;

    /**
     * Adds or edits medical info
     * @param userId - userid
     * @param contactName - name of emergency contact
     * @param relationship - relationship of emergency contact
     * @param phoneNumber - phone number
     * @param medicalConditions - medical conditions of elderly user
     * @param mobilityLevel - mobility level of elderly user
     * @param assistiveDevices - any assistive devices elderly user uses
     * @param allergies - any allergies elderly user has
     * @param dietaryRestrictions - any dietary restrictions the user has
     * @param doctorName - name of doctor
     * @param doctorContact - contact info of doctor
     * @param medications - medications of user
     * @param medicalPreferences - medical preferences of user
     * @param medicareNumber - medicare number of user
     * @return success or failure of editing medical info
     */
    @Override
    public String addMedicalInfo(Long userId, String contactName, String relationship, Integer phoneNumber, String medicalConditions, String mobilityLevel, String assistiveDevices, String allergies, String dietaryRestrictions, String doctorName, Integer doctorContact, String medications, String medicalPreferences, Long medicareNumber) {
        MedicalInfo medicalInfo = new MedicalInfo();
        medicalInfo.setUser(usersRepository.getReferenceById(userId));
        medicalInfo.setContactName(contactName);
        medicalInfo.setRelationship(relationship);
        medicalInfo.setPhoneNumber(phoneNumber);
        medicalInfo.setMedicalConditions(medicalConditions);
        medicalInfo.setMobilityLevel(mobilityLevel);
        medicalInfo.setAssistiveDevices(assistiveDevices);
        medicalInfo.setAllergies(allergies);
        medicalInfo.setDietaryRestrictions(dietaryRestrictions);
        medicalInfo.setDoctorName(doctorName);
        medicalInfo.setDoctorContact(doctorContact);
        medicalInfo.setMedications(medications);
        medicalInfo.setMedicalPreferences(medicalPreferences);
        medicalInfo.setMedicareNumber(medicareNumber);

        MedicalInfo existingInfo = medicalInfoRepository.findMedicalInfoByUser(usersRepository.getReferenceById(userId));
        if (existingInfo != null) {
            medicalInfoRepository.delete(existingInfo);
        }

        MedicalInfo medicalInfoSaved = medicalInfoRepository.save(medicalInfo);
        MedicalInfoDTO medicalInfoDTO = new MedicalInfoDTO(medicalInfoSaved);
        return new Gson().toJson(medicalInfoDTO.toString());
    }

    /**
     * Returns medical info of user
     * @param user - user object
     * @return medical info of user in json format
     */
    @Override
    public String getMedicalInfo(User user) {
        MedicalInfoDTO medicalInfoDTO = new MedicalInfoDTO(medicalInfoRepository.findMedicalInfoByUser(user));
        return new Gson().toJson(medicalInfoDTO);
    }

}

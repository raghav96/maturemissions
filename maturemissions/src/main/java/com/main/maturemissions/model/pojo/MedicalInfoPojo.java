package com.main.maturemissions.model.pojo;

public class MedicalInfoPojo {

    private Long userId;
    private String contactName;
    private String relationship;
    private Integer phoneNumber;
    private String medicalConditions;
    private String mobilityLevel;
    private String assistiveDevices;
    private String allergies;
    private String dietaryRestrictions;
    private String doctorName;
    private Integer doctorContact;
    private String medications;
    private String medicalPreferences;
    private Long medicareNumber;

    public MedicalInfoPojo(Long userId, String contactName, String relationship, Integer phoneNumber, String medicalConditions, String mobilityLevel, String assistiveDevices, String allergies, String dietaryRestrictions, String doctorName, Integer doctorContact, String medications, String medicalPreferences, Long medicareNumber) {
        this.userId = userId;
        this.contactName = contactName;
        this.relationship = relationship;
        this.phoneNumber = phoneNumber;
        this.medicalConditions = medicalConditions;
        this.mobilityLevel = mobilityLevel;
        this.assistiveDevices = assistiveDevices;
        this.allergies = allergies;
        this.dietaryRestrictions = dietaryRestrictions;
        this.doctorName = doctorName;
        this.doctorContact = doctorContact;
        this.medications = medications;
        this.medicalPreferences = medicalPreferences;
        this.medicareNumber = medicareNumber;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMedicalConditions() {
        return medicalConditions;
    }

    public void setMedicalConditions(String medicalConditions) {
        this.medicalConditions = medicalConditions;
    }

    public String getMobilityLevel() {
        return mobilityLevel;
    }

    public void setMobilityLevel(String mobilityLevel) {
        this.mobilityLevel = mobilityLevel;
    }

    public String getAssistiveDevices() {
        return assistiveDevices;
    }

    public void setAssistiveDevices(String assistiveDevices) {
        this.assistiveDevices = assistiveDevices;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getDietaryRestrictions() {
        return dietaryRestrictions;
    }

    public void setDietaryRestrictions(String dietaryRestrictions) {
        this.dietaryRestrictions = dietaryRestrictions;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public Integer getDoctorContact() {
        return doctorContact;
    }

    public void setDoctorContact(Integer doctorContact) {
        this.doctorContact = doctorContact;
    }

    public String getMedications() {
        return medications;
    }

    public void setMedications(String medications) {
        this.medications = medications;
    }

    public String getMedicalPreferences() {
        return medicalPreferences;
    }

    public void setMedicalPreferences(String medicalPreferences) {
        this.medicalPreferences = medicalPreferences;
    }

    public Long getMedicareNumber() {
        return medicareNumber;
    }

    public void setMedicareNumber(Long medicareNumber) {
        this.medicareNumber = medicareNumber;
    }

}

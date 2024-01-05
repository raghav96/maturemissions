package com.main.maturemissions.model;

import jakarta.persistence.*;

@Entity
@Table(name="medical_info") 
public class MedicalInfo {

    @Id
    @GeneratedValue
    @Column
    private Long id;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @Column
    private String contactName;

    @Column
    private String relationship;

    @Column
    private Integer phoneNumber;

    @Column
    private String medicalConditions;

    @Column
    private String mobilityLevel;

    @Column
    private String assistiveDevices;

    @Column
    private String allergies;

    @Column
    private String dietaryRestrictions;

    @Column
    private String doctorName;

    @Column
    private Integer doctorContact;

    @Column
    private String medications;

    @Column
    private String medicalPreferences;

    @Column
    private Long medicareNumber;

    public MedicalInfo() {
    }

    public MedicalInfo(Long id, User user, String contactName, String relationship, Integer phoneNumber, String medicalConditions, String mobilityLevel, String assistiveDevices, String allergies, String dietaryRestrictions, String doctorName, Integer doctorContact, String medications, String medicalPreferences, Long medicareNumber) {
        this.id = id;
        this.user = user;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

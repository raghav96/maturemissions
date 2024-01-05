package com.main.maturemissions.model.pojo;

import com.main.maturemissions.model.MedicalInfo;

public class MedicalInfoDTO {
    MedicalInfo medicalInfo;

    public MedicalInfoDTO(MedicalInfo medicalInfo) {
        this.medicalInfo = medicalInfo;
    }

    public MedicalInfoDTO() {
    }

    public MedicalInfo getMedicalInfo() {
        return medicalInfo;
    }

    public void setMedicalInfo(MedicalInfo medicalInfo) {
        this.medicalInfo = medicalInfo;
    }


}


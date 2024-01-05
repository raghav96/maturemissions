/**
 * File: MedicalInformation.js
 * Description: This component handles the display and editing of medical information for users.
 */

import { Component } from "react";
import "./index.css"
import axios from 'axios';

class MedicalInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            medicalData: [
                {key: "Contact Name", value: "", type: "text"},
                {key: "Relationship", value: "", type: "text"},
                {key: "Phone Number", value: "", type: "number"},
                {key: "Medical Conditions", value: "", type: "text"},
                {key: "Mobility Level", value: "", type: "text"},
                {key: "Assistive Devices", value: "", type: "text"},
                {key: "Allergies", value: "", type: "text"},
                {key: "Dietary Requirements", value: "", type: "text"},
                {key: "Doctor Name", value: "", type: "text"},
                {key: "Doctor Contact", value: "", type: "number"},
                {key: "Medications", value: "", type: "text"},
                {key: "Medical Preferences", value: "", type: "text"},
            ],
            medicareNumber: ""
        }
    }

    // Gets and sets all the medical information about the user by using their user id.
    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: localStorage.getItem("userId"),
                }, 
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }   
            });
            this.setState({medicareNumber: response.data.user.medicareNumber});
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
        
        try {
            const response = await axios.get('http://localhost:8080/medical-info', {
                params: {
                    userId: localStorage.getItem("userId"),
                }, 
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }  
            });
            if (response.data !== null) {
                const newMedicalData = [
                    {key: "Contact Name", value: response.data.medicalInfo.contactName, type: "text"},
                    {key: "Relationship", value: response.data.medicalInfo.relationship, type: "text"},
                    {key: "Phone Number", value: response.data.medicalInfo.phoneNumber, type: "number"},
                    {key: "Medical Conditions", value: response.data.medicalInfo.medicalConditions, type: "text"},
                    {key: "Mobility Level", value: response.data.medicalInfo.mobilityLevel, type: "text"},
                    {key: "Assistive Devices", value: response.data.medicalInfo.assistiveDevices, type: "text"},
                    {key: "Allergies", value: response.data.medicalInfo.allergies, type: "text"},
                    {key: "Dietary Restrictions", value: response.data.medicalInfo.dietaryRestrictions, type: "text"},
                    {key: "Doctor Name", value: response.data.medicalInfo.doctorName, type: "text"},
                    {key: "Doctor Contact", value: response.data.medicalInfo.doctorContact, type: "number"},
                    {key: "Medications", value: response.data.medicalInfo.medications, type: "text"},
                    {key: "Medical Preferences", value: response.data.medicalInfo.medicalPreferences, type: "text"},
                ]
                this.setState({medicalData: newMedicalData});
            }
        } catch (error) {
            console.log('Error fetching data: ', error);
        }

    }

    saveData = async (index, event) => {
        const updatedMedicalData = [...this.state.medicalData];
        updatedMedicalData[index].value = event.target.value;
        this.setState({ medicalData: updatedMedicalData });
    }

    verifyNumber = () => {
        const numberString = this.state.medicalData[2].value.toString();
        if (numberString.length === 9 && numberString.charAt(0) !== '0' && (numberString.charAt(0) === '4' || numberString.charAt(0) === '5')) {
            return true; 
        } else if (numberString.length === 10 && numberString.charAt(0) === '0' && (numberString.charAt(1) === '4' || numberString.charAt(1) === '5') ) {
            return true;
        }

        alert("Invalid Phone Number. Please try again.");
        return false;
    }

    verifyDoctorNumber = () => {
        const numberString = this.state.medicalData[9].value.toString();
        if (numberString.length === 9 && numberString.charAt(0) !== '0' && (numberString.charAt(0) === '4' || numberString.charAt(0) === '5')) {
            return true; 
        } else if (numberString.length === 10 && numberString.charAt(0) === '0' && (numberString.charAt(1) === '4' || numberString.charAt(1) === '5') ) {
            return true;
        }
     
        alert("Invalid Doctor Contact. Please try again.");
        return false;
    }

    verifyLength = () => {
        for(let i = 0; i < this.state.medicalData.length; i++) {
            if (i === 2 || i === 9) {
                if (this.state.medicalData[i].value <= 0) {
                    alert(`Missing ${this.state.medicalData[i].key}. Please try again`);
                    return false;
                }
            } else if (this.state.medicalData[i].value.length === 0) {
                alert(`Missing ${this.state.medicalData[i].key}. Please try again`);
                return false;
            }
        }
    }

    // Saves the changes users making, and before changes are saved, the changes are verified.
    saveChanges = async () => {
        if (this.verifyNumber() && this.verifyDoctorNumber() && this.verifyLength()) {
            const { medicareNumber, medicalData } = this.state;
            try {
                await axios.post('http://localhost:8080/add-medical-info', {
                    userId: localStorage.getItem("userId"),
                    contactName: medicalData[0].value,
                    relationship: medicalData[1].value,
                    phoneNumber: medicalData[2].value,
                    medicalConditions: medicalData[3].value,
                    mobilityLevel: medicalData[4].value,
                    assistiveDevices: medicalData[5].value,
                    allergies: medicalData[6].value,
                    dietaryRestrictions: medicalData[7].value,
                    doctorName: medicalData[8].value,
                    doctorContact: medicalData[9].value,
                    medications: medicalData[10].value,
                    medicalPreferences: medicalData[11].value,
                    medicareNumber: medicareNumber
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                alert("Changes are saved.");
                window.location.reload();
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        }
        
    }

    render() {
        return (
            <div className="medical-info-container">
                <p className="medical-info-header">Medical Information</p>
                <p className="medicare-number">Medicare Number: {this.state.medicareNumber}</p>
                <div className="medical-info-subcontainer">
                    {this.state.medicalData.map((item, index) => (
                        <div className="medicare-info-content">
                            <label>{item.key}:</label>
                            <input type={item.type} onChange={(event) => this.saveData(index, event)} placeholder={item.key} value={item.value}></input>
                        </div>
                    ))}
                </div>
                <p><b>Note:</b> Click 'Save Changes' to save your edits.</p>
                <button className="save-changes-btn" onClick={this.saveChanges}>Save Changes</button>
                
            </div>
        )
    }
}

export default MedicalInformation
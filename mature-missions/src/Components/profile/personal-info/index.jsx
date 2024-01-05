/**
 * File: PersonalInformation.js
 * Description: This component handles the display and editing of personal information for users and providers.
 */

import { Component } from "react";
import "./index.css"
import axios from 'axios';

class PersonalInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRole: localStorage.getItem('userRole'),
            user_data: [
                {key: "Name", value: "", type: "text"},
                {key: "Username", value: "", type: "text"},
                {key: "Age", value: "", type: "number"},
                {key: "Phone Number", value: "", type: "number"},
                {key: "Email", value: "", type: "email"},
                {key: "Medicare Number", value: "", type: "number"},
            ]
        }
    }

    // Gets and sets all the information about the user by using their user id.
    async componentDidMount() {
        const { userRole } = this.state;
        try {
            const response = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: localStorage.getItem("userId"),
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
                }
            });
            if (userRole === 'ROLE_PROVIDER') {
                localStorage.setItem('providerId', response.data.providerId); 
                if (response.data.user && Object.keys(response.data.user).length > 0) {
                    const newUserData = [
                        {key: "Name", value: response.data.user.name, type: "text"},
                        {key: "Username", value: response.data.user.username, type: "text"},
                        {key: "Age", value: response.data.user.age, type: "number"},
                        {key: "Phone Number", value: response.data.user.phoneNumber, type: "number"},
                        {key: "Email", value: response.data.user.email, type: "email"},
                    ]   
                    this.setState({user_data: newUserData});
                }
            } else {
                if (response.data.user && Object.keys(response.data.user).length > 0) {
                    const newUserData = [
                        {key: "Name", value: response.data.user.name, type: "text"},
                        {key: "Username", value: response.data.user.username, type: "text"},
                        {key: "Age", value: response.data.user.age, type: "number"},
                        {key: "Phone Number", value: response.data.user.phoneNumber, type: "number"},
                        {key: "Email", value: response.data.user.email, type: "email"},
                        {key: "Medicare Number", value: response.data.user.medicareNumber, type: "number"},
                    ]
                    this.setState({user_data: newUserData});
                }
            }   
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    saveData = (index, event) => {
        const updatedUserData = [...this.state.user_data];
        updatedUserData[index].value = event.target.value;
        this.setState({ user_data: updatedUserData });
    }

    verifyEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (emailRegex.test(this.state.user_data[4].value)) {
            return true;
        }
        alert("Invalid Email. Please try again.");
        return false;
    }

    verifyNumber = () => {
        const numberString = this.state.user_data[3].value.toString();
        if (numberString.length === 9 && numberString.charAt(0) !== '0' && (numberString.charAt(0) === '4' || numberString.charAt(0) === '5')) {
            return true; 
        } else if (numberString.length === 10 && numberString.charAt(0) === '0' && (numberString.charAt(1) === '4' || numberString.charAt(1) === '5') ) {
            return true;
        }

        alert("Invalid Phone Number. Please try again.");
        return false;
    }

    verifyMedicare = () => {
        const medicareRegex = /^[2-6]\d{9}?$/;
        const medicare = this.state.user_data[5].value;
        if (medicare === undefined || medicare === null || medicare.length === 0) { // Medicare is an optional value
            return true;
        }
        if (medicareRegex.test(medicare)) {
            return true;
        } 
        alert("Invalid Medicare Number. Please try again.");
        return false;
    }

    verifyAge = () => {
        const age = this.state.user_data[2].value;
        if (age > 0) {
           return true;
        }
        alert("Invalid Age. Please try again.");
        return false;
    }

    verifyLength = () => {
        for(let i = 0; i < this.state.user_data.length ; i++) {
            if (i !== 5) { // Medicare number is optional so need to check its length
                if (this.state.user_data[i].value.length === 0) {
                    alert(`Missing ${this.state.user_data[i].key}. Please try again`);
                    return false;
                }  
            }
                      
        }
        return true;
    }

    // Saves the changes users making, and before changes are saved, the changes are verified.
    saveChanges = async () => {
        const { user_data, userRole } = this.state;
        try {
            if (userRole === 'ROLE_PROVIDER' && this.verifyEmail() && this.verifyNumber() && this.verifyAge() && this.verifyLength()) {
                await axios.post('http://localhost:8080/user/change-details', {
                    userId: localStorage.getItem("userId"),
                    name: user_data[0].value,
                    username: user_data[1].value,
                    age: user_data[2].value,
                    phoneNumber: user_data[3].value,
                    email: user_data[4].value,
                    type: "PROVIDER",
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                alert("Changes are saved.");
                window.location.reload();
            } else if (userRole === 'ROLE_USER' && this.verifyMedicare() && this.verifyEmail() && this.verifyNumber() && this.verifyAge() && this.verifyLength()) {
                await axios.post('http://localhost:8080/user/change-details', {
                    userId: localStorage.getItem("userId"),
                    name: user_data[0].value,
                    username: user_data[1].value,
                    age: user_data[2].value,
                    phoneNumber: user_data[3].value,
                    email: user_data[4].value,
                    medicareNumber: user_data[5].value,
                    type: "USER",
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                alert("Changes are saved.");
                window.location.reload();
            }
        } catch (error) {
            console.log('Error fetching data: ', error);
        }

    }

    render() {
        return (
            <div className="user-info-container">
                <p className="user-info-header">Personal Information</p>
                <div className="user-info-subcontainer">
                    { this.state.userRole === 'ROLE_PROVIDER' && 
                        <>
                            {this.state.user_data.map((item, index, array) => (
                                index < array.length && (
                                    <div className="user-info-content">
                                            <label>{item.key}:</label>
                                            <input type={item.type} onChange={(event) => this.saveData(index, event)} placeholder={item.key} value={item.value}></input>
                                    </div>
                                )
                            ))}
                        </>
                    }
                    { this.state.userRole === 'ROLE_USER' && 
                        <>
                            {this.state.user_data.map((item, index, array) => (
                                index < array.length && (
                                    <div className="user-info-content">
                                            <label>{item.key}:</label>
                                            <input type={item.type} onChange={(event) => this.saveData(index, event)} placeholder={item.key} value={item.value}></input>
                                    </div>
                                )
                            ))}
                        </>
                    }
                </div>
                <p><b>Note:</b> Click 'Save Changes' to save your edits.</p>
                <button className="save-changes-btn" onClick={this.saveChanges}>Save Changes</button>
            </div>
        )
    }
}

export default PersonalInformation
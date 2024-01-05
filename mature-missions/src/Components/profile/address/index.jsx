/**
 * File: Address.jsx
 * Description: Component for displaying and updating user address information.
 */
import React, { Component } from 'react';
import "./index.css";
import axios from "axios";

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserData: [],
            australianStates: [
                'Australian Capital Territory',
                'New South Wales',
                'Northern Territory',
                'Queensland',
                'South Australia',
                'Tasmania',
                'Victoria',
                'Western Australia'
            ],
            street: "",
            city: "",
            zip: "",
            selectedState: ""
        };
    }

    /**
     * Fetches user address information from the server upon component mount.
     */
    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: localStorage.getItem("userId"),
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token in the Authorization header
                }
            });
            const splittedAddress = response.data.user.address.split(', ');
            this.setState({ street: splittedAddress[0] });
            this.setState({ city: splittedAddress[1] });
            this.setState({ selectedState: splittedAddress[2] });
            this.setState({ zip: splittedAddress[3] });            
        } catch (error) {
            console.log('Error fetching data: ', error);
        }        
    }

    /**
     * Validates the ZIP/Postcode format.
     */
    verifyZip = () => {
        const regex = /^\d{3,5}$/;

        if (regex.test(this.state.zip) && this.state.zip >= 1000 && this.state.zip <= 9999) {
            return true;
        }
        alert("Invalid ZIP/Postcode. Please try again.");
        return false;
    }

    /**
     * Validates the street address format.
     */
    verifyStreet = () => {
        const regex = /^(?:[A-Za-z0-9\s]+ )+[A-Za-z0-9\s]+$/;
        if (regex.test(this.state.street)) {
            return true;
        }
        alert("Invalid Street. Please try again.");
        return false;
    }

    /**
     * Validates the length of input fields.
     */
    verifyLength = () => {
        return this.state.street.length > 0 && this.state.city.length > 0 && this.state.selectedState.length > 0;
    }

    /**
     * Updates the selected state in the component state.
     */
    saveState  = (event) => {
        this.setState({ selectedState: event.target.value });
    }

    /**
     * Updates the ZIP/Postcode in the component state.
     */
    saveZip  = (event) => {
        this.setState({ zip: event.target.value });
    }

    /**
     * Updates the city name in the component state.
     */
    saveCity  = (event) => {
        this.setState({ city: event.target.value });
    }

    /**
     * Updates the street address in the component state.
     */
    saveStreet  = (event) => {
        this.setState({ street: event.target.value });
    }

    /**
     * Sends updated address information to the server and saves the changes.
     */
    saveChanges = async () => {
        const { street, city, selectedState, zip } = this.state;

        if (this.verifyLength()) {
            if (this.verifyStreet() && this.verifyZip()) {
                const newAddress = street + ", " + city + ", " + selectedState + ", " + zip;
                try {
                    await axios.post('http://localhost:8080/user/change-details', {
                        userId: localStorage.getItem("userId"),
                        address: newAddress,
                        type: "ADDRESS",
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
        } else {
            alert("Invalid input(s). Please try again.");
        }
    }

    render() {
        return (
            <div className="address-info-container">
                <p className="address-info-header">Address</p>
                <div className="address-info-subcontainer">
                    <div className="address-info-content">
                        <label>Street Address:</label>
                        <input type="string" placeholder="Enter street address" onChange={this.saveStreet} value={this.state.street}></input>
                    </div>
                    <div className="address-info-content">
                        <label>State:</label>
                        <select value={this.state.selectedState} onChange={this.saveState}>
                            <option value="" disabled selected>Select a state</option>
                            {this.state.australianStates.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="address-info-content">
                        <label>City:</label>
                        <input type="string" placeholder="Enter city name" onChange={this.saveCity} value={this.state.city}></input>
                    </div>
                    <div className="address-info-content">
                        <label>ZIP/Postcode:</label>
                        <input type="number" placeholder="Enter ZIP/Postcode" onChange={this.saveZip} value={this.state.zip}></input>
                    </div>
                </div>
                <p><b>Note:</b> Click 'Save Changes' to save your edits.</p>
                <button className="save-changes-btn" onClick={this.saveChanges}>Save Changes</button>
            </div>
        );
    }
}

export default Address;

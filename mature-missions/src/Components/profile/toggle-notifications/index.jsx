/**
 * File: ToggleNotifications.jsx
 * Description: Component for managing user notification preferences.
 */

import React, { Component } from "react";
import "./index.css";
import axios from "axios";

class ToggleNotifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            smsNotifications: false,
            emailNotifications: false
        };
    }

    /**
     * Fetches user notification preferences from the server upon component mount.
     */
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
            this.setState({ emailNotifications: response.data.user.emailNotifications });
            this.setState({ smsNotifications: response.data.user.smsNotifications });
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    /**
     * Toggles SMS notifications and sends the updated preference to the server.
     */
    toggleSmsNotifications = () => {
        this.setState(prevState => {
            const smsNotifications = !prevState.smsNotifications;
            const message = smsNotifications ? "Sms Notifications Turn On." : "Sms Notifications Turn Off.";
            alert(message);
            return { smsNotifications };
        }, async () => {
            try {
                const response = await axios.post('http://localhost:8080/user/change-details', {
                    userId: localStorage.getItem("userId"),
                    smsNotifications: this.state.smsNotifications,
                    type: "SMS"
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        });
    }   

    /**
     * Toggles Email notifications and sends the updated preference to the server.
     */
    toggleEmailNotifications = () => {   
        this.setState(prevState => {
            const emailNotifications = !prevState.emailNotifications;
            const message = emailNotifications ? "Email Notifications Turn On." : "Email Notifications Turn Off.";
            alert(message);
            return { emailNotifications };
        }, async () => {
            try {
                const response = await axios.post('http://localhost:8080/user/change-details', {
                    userId: localStorage.getItem("userId"),
                    emailNotifications: this.state.emailNotifications,
                    type: "EMAIL"
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        });
    }

    render() {
        return (
            <div className="toggle-notifications-container">
                <p className="alert-heading">Notifications Alert</p>
                <p className="alert-subheading">Please manage notification alerts for your service bookings below</p>
                <div className="switch-container">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="smsNotification" onChange={this.toggleSmsNotifications} checked={this.state.smsNotifications}/>
                        <label className="form-check-label" for="smsNotification">SMS Notifications</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="emailNotification" onChange={this.toggleEmailNotifications} checked={this.state.emailNotifications}/>
                        <label className="form-check-label" for="emailNotification">Email Notifications</label>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ToggleNotifications
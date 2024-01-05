/*
    File: NotifyCaregiver.jsx
    Description: Component for notifying caregivers about service requests.
*/

import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import "./index.css";
import axios from "axios";

class NotifyCaregiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRating: false,
            showReport: false,
            info: {}
        };
    }

    componentDidMount() {
        // Set authorization token for Axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        // Initialize component state with provided props
        this.setState({ info: this.props });
    }

    // Handler for accepting a service request
    acceptRequest = async () => {
        try {
            // Get provider details
            const providerDetails = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: localStorage.getItem("userId"),
                }
            });
            const providerId = providerDetails.data.providerId;

            // Send notification to backend indicating the request is accepted
            await axios.post('http://localhost:8080/notifications/caregiver/request', {
                serviceRequestId : this.state.info.notification.id,
                providerId : providerId,
                accepted : true
            });

            window.location.reload();
        } catch (error) {
            console.log('Error accepting request: ', error);
        }
    }

    // Handler for declining a service request
    declineRequest = () => {
        alert("Service Request Declined");
    }

    // Handler for canceling a service request
    cancelRequest = async () => {
        try {
            // Get provider details
            const providerDetails = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: localStorage.getItem("userId"),
                }
            });
            const providerId = providerDetails.data.providerId;

            // Send notification to backend indicating the request is canceled
            await axios.post('http://localhost:8080/notifications/caregiver/request', {
                serviceRequestId : this.state.info.notification.id,
                providerId : providerId,
                accepted : false
            });
            // Reload the page after canceling the request
            window.location.reload();
        } catch (error) {
            console.log('Error canceling request: ', error);
        }
    }

    render() {
        const { notification } = this.props;

        if (notification.status === "accepted") {
            return (
                <>
                    <div className='notification-details' id="caregiver-details">
                        <img alt="" src={notification.user.imageLoc}></img>
                        <div className='details-container'>
                            <ul className='service-request-details'>
                                <li className='notify-service'>{notification.service.name}</li>
                                <li className='details'>Name: {notification.user.name}</li>
                                <li className='details'>Address: {notification.user.address}</li>
                                <li className='details'>Date: {notification.requestDate}</li>
                                <li className='details'>Time: {notification.requestTime.slice(-11,-6)}</li>
                            </ul>
                        </div>
                        <div className='notification-buttons'>
                            <NavLink className="navlink-l">
                                <button className='btn' id="decline-notify" onClick={this.cancelRequest}>Cancel &gt;</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className='notifications-line'></div>
                </>
            );
        }

        return (
            <>
                <div className='notification-details' id="caregiver-details">
                    <img alt="" src={notification.user.imageLoc}></img>
                    <div className='details-container'>
                        <ul className='service-request-details'>
                            <li className='notify-service'>{notification.service.name}</li>
                            <li className='details'>Name: {notification.user.name}</li>
                            <li className='details'>Address: {notification.user.address}</li>
                            <li className='details'>Date: {notification.requestDate}</li>
                            <li className='details'>Time: {notification.requestTime.slice(-11,-6)}</li>
                        </ul>
                    </div>
                    <div className='notification-buttons'>
                        <NavLink className="navlink-r">
                            <button className='btn' id='accept-notify' onClick={this.acceptRequest}>Accept &gt;</button>
                        </NavLink>
                    </div>
                </div>
                <div className='notifications-line'></div>
            </>
        );
    }
}

export default NotifyCaregiver;

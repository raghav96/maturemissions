/*
  File: NotifyElderly.jsx
  Description: Ccomponent notifies elderly users, allowing them to view and manage service requests.
*/

import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import "./index.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { sendNotifications } from "../notification-sender/notification-sender";

class NotifyElderly extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            status: 'accepted',
            showRating: false,
            showReport: false,
            info: {},
            reviewValue: '',
            reportValue: ''
        }  
    }

    // Handler for changing the rating value in the state
    handleRatingChange = (event) => {
        this.setState({ rating: event.target.value });
    }

    // Lifecycle method to set the initial state and authorization header
    componentDidMount() {
        this.setState({ info: this.props });
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }

    // Handle logic if service request has been accepted by the caregiver
    acceptRequest = async () => {
        alert("Service Request Accepted");
    }

    // Handle logic if service request has been declined by the caregiver
    declineRequest = () => {
        alert("Service Request Declined");
    }

    // Handle logic if service request has been canceled by the elderly
    cancelRequest = async () => {
        try {
            const response = await axios.put('http://localhost:8080/notifications/elderly/cancel-request', {
                serviceRequestId: this.state.info.notification.id,
            });

            window.location.reload();
            if (response.status === 200){
                alert("Service Request is Canceled");
            } else {
                alert("There has been an error cancelling the request");
            }
        } catch (error) {
            console.log('Error fetching data: ', error);
        } 
        sendNotifications(this.state.info.notification.user, "Request canceled", "Request has been successfully canceled")
       
    }

    // Handle logic if service request has been completed by the elderly
    serviceComplete = async () => {
        try {
            const response = await axios.put('http://localhost:8080/notifications/elderly/complete-request', {
                serviceRequestId: this.state.info.notification.id,
                rating: this.state.rating ? this.state.rating : 1,
                description: this.state.reviewValue
            });
            if (response.status === 200){
                alert("Service Request is Completed");

            } else {
                alert("There has been an error completing the request");
            }
            window.location.reload();
        } catch (error) {
            console.log('Error fetching data: ', error);
        } 
        sendNotifications(this.state.info.notification.user, "Request completed", "Request has been successfully completed")
    }

    // Show the rating modal
    showRating = () => {
        this.setState({ showRating: true });
    }

    // Show the report modal
    reportRequest = () => {
        this.setState({ showReport: true });
    }

    // Close the rating modal and complete the service request
    closeRating = () => {
        this.serviceComplete();
        this.setState({ showRating: false });
    }

    // Close the report modal and submit the report
    closeReport = async () => {
        this.setState({ showReport: false });
        try {
            const response = await axios.post('http://localhost:8080/notifications/elderly/report', {
                serviceRequestId: this.state.info.notification.id,
                reportDescription: this.state.reportValue
            });

            window.location.reload();
            if (response.status === 200){
                alert("Service Request has been reported");
            } else {
                alert("There has been an error reporting the request");
            }
        } catch (error) {
            console.log('Error fetching data: ', error);
        } 
        sendNotifications(this.state.info.notification.user, "Request reported", "Request has been successfully reported")
    }

    render() {

        const { notification } = this.props;
        if (notification.status === "open") {
           return(
            <>
                <div className='notification-details' id='open'>
                    <img alt="" src={notification.user.imageLoc}></img>
                    <div className='details-container'>
                        <ul className='service-request-details'>
                            <li className='notify-service'>Service: {notification.service.name}</li>
                            <li className='details'>Date: {notification.requestDate}</li>
                            <li className='details'>Time: {notification.requestTime.slice(-11,-6)} {notification.requestTime.slice(-3)}</li>
                        </ul>
                    </div>
                    <div className='notification-buttons'>
                        <NavLink className="navlink-l">
                            <button className='btn' id="decline-notify" onClick={this.cancelRequest}>Cancel &gt;</button>
                        </NavLink>
                    </div>
                    <div className='notification-buttons'></div>
                </div>
                <div className='notifications-line'></div>
            </>
            );
        }

        return (
            <>
                <div className={`status-circle status-${this.state.status}`} id="status"></div>
                <div className='notification-details'>
                    <img alt="" src={notification.provider.user.imageLoc}></img>
                    <div className='details-container'>
                        <ul className='service-request-details'>
                            <li className='notify-service'>Service: {notification.service.name}</li>
                            <li className='details'>Caregiver: {notification.provider.user.name} </li>
                            <li className='details'>Rating: {notification.provider.rating}</li>
                            <li className='details'>Date: {notification.requestDate}</li>
                            <li className='details'>Time: {notification.requestTime.slice(-11,-6)} {notification.requestTime.slice(-3)}</li>
                        </ul>
                    </div>
                    <div className='notification-buttons'>
                        <NavLink className="navlink-r">
                            <button className='btn' id='accept-notify' onClick={this.showRating}>Done &gt;</button>
                        </NavLink>
                        <NavLink className="navlink-l">
                            <button className='btn' id="decline-notify" onClick={this.cancelRequest}>Cancel &gt;</button>
                        </NavLink>
                        <NavLink className="navlink-l">
                            <button className='btn' id="decline-notify" onClick={this.reportRequest}>Report &gt;</button>
                        </NavLink>
                    </div>

                    {/* Rating Modal */}
                    <Modal className='slide-in' show={this.state.showRating} size="lg">
                        <Modal.Header className='rating-header'>
                            <Modal.Title className='rating-title'>Rating Service: Care Assistance</Modal.Title>
                            <button onClick={this.closeRating} className="close custom-close-button">&times;</button>
                        </Modal.Header>
                        <Modal.Body className='rating-body'>
                            <div className='column'>
                                <div className='rating-description'>
                                    <p>Please complete the fields below and then click on the <b>"Submit Rating”</b> button at the bottom of the page.</p>
                                </div>
                                <div className='rating-dropdown'>
                                    <label><b>Rating:<span> *</span></b></label>
                                    <select id="rating-service" value={this.state.rating} onChange={this.handleRatingChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className='rating-review'>
                                    <label><b>Review:<span> *</span></b></label>
                                    <textarea value={this.state.reviewValue} onChange={(e) => this.setState({ reviewValue: e.target.value })} placeholder="Please provide us with your review"></textarea>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className='modal-footer'>
                            <Button variant="secondary" id='book' onClick={this.closeRating}>
                                Submit Rating
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Report Modal */}
                    <Modal className='slide-in' show={this.state.showReport} size="lg">
                        <Modal.Header className='reporting-header'>
                            <Modal.Title className='reporting-title'>Report Service: Care Assistance</Modal.Title>
                            <button onClick={this.closeReport} className="close custom-close-button">&times;</button>
                        </Modal.Header>
                        <Modal.Body className='reporting-body'>
                            <div className='column'>
                                <div className='reporting-description'>
                                    <p>
                                        Please complete the fields below and then click on the <b>'Submit Report Ticket'</b> button at the bottom of the page.
                                        <br></br><br></br>
                                        We will investigate your submission and respond to you via email as soon as possible.
                                    </p>
                                </div>
                                <div className='reporting-review'>
                                    <label><b>Reported Service:<span> *</span></b></label>
                                    <textarea value={this.state.reportValue} onChange={(e) => this.setState({ reportValue: e.target.value })} placeholder="Provide a detailed description of the report"></textarea>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className='modal-footer'>
                            <Button variant="secondary" id='book' onClick={this.closeReport}>
                                Submit Report Ticket
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='notifications-line'></div>
            </>
        )
    }
}

export default NotifyElderly
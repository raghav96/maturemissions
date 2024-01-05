/**
 * File: Notifications.jsx
 * Description: Component for handling notifications.
 */

import React, { Component } from 'react';
import "./index.css";
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import NotifyElderly from '../../Components/notify-elderly';
import NotifyCaregiver from '../../Components/notify-caregiver';
import axios from 'axios';

class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: props.userType,
            serviceName: props.serviceName,
            caregiver_notifications: [],
            open_caregiver_notifications: [],
            elderly_notifications: [],
            open_elderly_notifications: [],
            filtered_caregiver_notifications: [],
            filtered_open_caregiver_notifications: [],
            accepted_heading: "All",
            open_heading: "All"
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        if (this.state.userType === 'caregiver') {
            this.loadCaregiverData();
        } else if (this.state.userType === 'elderly') {
            this.loadElderlyData();
        }
    }

    loadCaregiverData = async () => {
        try {
            const providerDetails = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: localStorage.getItem("userId"),
                }
            });

            const providerId = providerDetails.data.providerId;
            const response = await axios.get('http://localhost:8080/notifications/caregiver/request');
            const filtered_notifications = response.data.serviceRequestsList.filter(request => request.status === "accepted");
            const matchingIdNotifications = [];
            for(var i = 0; i < filtered_notifications.length; i++) {
                if(filtered_notifications[i].provider.id.toString() === providerId.toString()) {
                    matchingIdNotifications.push(filtered_notifications[i]);
                }
            }

            this.setState({caregiver_notifications: matchingIdNotifications});
            this.setState({filtered_caregiver_notifications: matchingIdNotifications});
            this.setState({ open_caregiver_notifications: response.data.serviceRequestsList.filter(request => request.status === "open") }, () => {
                //console.log("open: " + this.state.open_caregiver_notifications.length);
            });

            this.setState({ filtered_open_caregiver_notifications: response.data.serviceRequestsList.filter(request => request.status === "open") });

        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    loadElderlyData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        try {
            const response = await axios.get('http://localhost:8080/notifications/elderly/requests', {
                params: {
                    userId: localStorage.getItem("userId"),
                }
            });
            this.setState({ elderly_notifications: response.data.serviceRequestsList.filter(request => request.status === "accepted") });
            this.setState({ open_elderly_notifications: response.data.serviceRequestsList.filter(request => request.status === "open") });
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    filterAcceptedServices = (number) => {
        if(number === 0) {
            this.setState({filtered_caregiver_notifications: this.state.caregiver_notifications});
        } else {
            const relevantServices = [];
            for(var i = 0; i < this.state.caregiver_notifications.length; i++) {
                if(this.state.caregiver_notifications[i].service.id === number) {
                    relevantServices.push(this.state.caregiver_notifications[i]);
                }
            }
            this.setState({filtered_caregiver_notifications: relevantServices});
        }
        this.servicesHeading(number);
    }

    filterOpenServices = (number) => {
        if(number === 0) {
            this.setState({filtered_open_caregiver_notifications: this.state.open_caregiver_notifications});
        } else {
            const relevantServices = [];
            for(var i = 0; i < this.state.open_caregiver_notifications.length; i++) {
                if(this.state.open_caregiver_notifications[i].service.id === number) {
                    relevantServices.push(this.state.open_caregiver_notifications[i]);
                }
            }
            this.setState({filtered_open_caregiver_notifications: relevantServices});
        }
        this.servicesHeading(number);
    }

    servicesHeading(number) {
        switch(number) {
            case 1:
                this.setState({accepted_heading: "Care Assistance"});
                return;
            case 2:
                this.setState({accepted_heading: "Meal Preparation"});
                return;
            case 3:
                this.setState({accepted_heading: "Housekeeping"});
                return;
            case 4:
                this.setState({accepted_heading: "Family Interaction"});
                return;
            case 5:
                this.setState({accepted_heading: "Mobility Support"});
                return;
            case 6:
                this.setState({accepted_heading: "Social Outgoings"});
                return;
            default:
                this.setState({accepted_heading: "All"});
                return;
        }
    }

    renderSwitch(type) {
        const { filtered_caregiver_notifications, filtered_open_caregiver_notifications, elderly_notifications, open_elderly_notifications } = this.state;
        
        switch(type) {
            case 'caregiver':
              return(
                <>
                    <div className='notifications-header'>
                        <p>Accepted Services - {this.state.accepted_heading}</p>
                        <div className='caregiver-menu-options'>
                            <div className='circle' id='count-notifications'>
                                <span>{filtered_caregiver_notifications.length}</span>
                            </div>
                            <div className='caregiver-service-drop'>
                                <button class="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div id='menu-icon'></div>
                                    <div id='menu-icon'></div>
                                    <div id='menu-icon'></div>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><button onClick={() => this.filterAcceptedServices(0)} class="dropdown-item">All</button></li>
                                    <li><button onClick={() => this.filterAcceptedServices(1)} class="dropdown-item">Care Assistance</button></li>
                                    <li><button onClick={() => this.filterAcceptedServices(2)} class="dropdown-item">Meal Preparation</button></li>
                                    <li><button onClick={() => this.filterAcceptedServices(3)} class="dropdown-item">Housekeeping</button></li>
                                    <li><button onClick={() => this.filterAcceptedServices(4)} class="dropdown-item">Family Interaction</button></li>
                                    <li><button onClick={() => this.filterAcceptedServices(5)} class="dropdown-item">Mobility Support</button></li>
                                    <li><button onClick={() => this.filterAcceptedServices(6)} class="dropdown-item">Social Outgoings</button></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    <div className='notifications-body'>
                        {filtered_caregiver_notifications.map((notification, index) => (
                            <NotifyCaregiver key={index} notification={notification} />
                        ))}
                    </div>   
                    <div className='notifications-header'>
                        <p>Open Services - {this.state.open_heading}</p>
                        <div className='caregiver-menu-options'>
                            <div className='circle' id='count-notifications'>
                                <span>{filtered_open_caregiver_notifications.length}</span>
                            </div>
                            <div className='caregiver-service-drop'>
                                <button class="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div id='menu-icon'></div>
                                    <div id='menu-icon'></div>
                                    <div id='menu-icon'></div>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><button onClick={() => this.filterOpenServices(0)} class="dropdown-item">All</button></li>
                                    <li><button onClick={() => this.filterOpenServices(1)} class="dropdown-item">Care Assistance</button></li>
                                    <li><button onClick={() => this.filterOpenServices(2)} class="dropdown-item">Meal Preparation</button></li>
                                    <li><button onClick={() => this.filterOpenServices(3)} class="dropdown-item">Housekeeping</button></li>
                                    <li><button onClick={() => this.filterOpenServices(4)} class="dropdown-item">Family Interaction</button></li>
                                    <li><button onClick={() => this.filterOpenServices(5)} class="dropdown-item">Mobility Support</button></li>
                                    <li><button onClick={() => this.filterOpenServices(6)} class="dropdown-item">Social Outgoings</button></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>

                    <div className='notifications-body'>
                        {filtered_open_caregiver_notifications.map((notification, index) => (
                            <NotifyCaregiver key={index} notification={notification} />
                        ))}
                    </div>   
                </>
            )
            case 'elderly':
              return(
                <>  
                    <div className='notifications-header'>
                        <p>Accepted Services</p>
                        <div className='circle' id='count-notifications'><span>{elderly_notifications.length}</span></div>
                    </div>
                    <div className='notifications-body'>
                        {elderly_notifications.map((notification, index) => (
                            <NotifyElderly key={index} notification={notification} />
                        ))}
                    </div>
                    <div className='notifications-header'>
                        <p>Services Waiting To Be Accepted</p>
                        <div className='circle' id='count-notifications'><span>{open_elderly_notifications.length}</span></div>
                    </div>
                    <div className='notifications-body'>
                        {open_elderly_notifications.map((notification, index) => (
                            <NotifyElderly key={index} notification={notification} />
                        ))}
                    </div>
                </>
            )
            default: ( <></> )
        }
    }

    render() {
        const { userType } = this.state;
        const { serviceName } = this.state;

        return (
            <div className="notifications-component">
                <div className='notifications-content'>
                    <Header type={userType} loggedIn={true} elder={false} />
                    <div className='notifications'>
                        {this.renderSwitch(userType, serviceName)}                        
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
    
}

export default Notifications;

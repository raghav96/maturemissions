/* 
    File: ReportedServices.jsx
    Description: Component for viewing reported services.
*/

import React, { Component } from "react"; 
import "./index.css"; 
import axios from "axios"; 
import { sendNotifications } from "../../notification-sender/notification-sender.jsx"; 

class ReportedServices extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            reportedServicesData: []
        };
    }

    // Fetch reported service data from the server when the component mounts
    async componentDidMount() {
        try {
            // Make a GET request to fetch reported service data from the server
            const response = await axios.get('http://localhost:8080/admin/reported-user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization token in the request header
                }
            });

            // Process and structure the fetched reported service data
            const reported_services = []

            for(let i = 0; i < response.data.serviceRequestsList.length; i++) {
                if (response.data.serviceRequestsList[i].provider.user.active && response.data.serviceRequestsList[i].status === "reported") {
                    reported_services.push({
                        id: response.data.serviceRequestsList[i].id,
                        username: response.data.serviceRequestsList[i].user.username,
                        providerUsername: response.data.serviceRequestsList[i].provider.user.username,
                        serviceName: response.data.serviceRequestsList[i].service.name,
                        dateTime: response.data.serviceRequestsList[i].requestTime,
                        description: response.data.serviceRequestsList[i].review.description,
                        status: response.data.serviceRequestsList[i].status,
                        active: response.data.serviceRequestsList[i].provider.user.active,
                        provider: response.data.serviceRequestsList[i].provider.user
                    });
                }
            }

            // Update component state with the processed reported service data
            this.setState({ reportedServicesData: reported_services });

        } catch (error) {
            alert("Unable to access reported services."); // Alert errors to users if any occur during data fetching
        }
    }

    // Function to notify the provider about reported service
    notifyProvider = async (status, requestId, provider) => {        
        try {
            // Make a PUT request to notify the provider and update service request status
            await axios.put('http://localhost:8080/notifications/elderly/cancel-request', {
                serviceRequestId: requestId,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization token in the request header
                }
            });

            // Send notification to the provider based on the reported service status
            if (status === "reported") {
                sendNotifications(provider, "Mature Missions: Reported Account", "Your accounts has been deactivated as a result of a reported service. Please contact the admin to re-activate your account.");
            }

            window.location.reload();

        } catch (error) {
            console.log("Unable to notify the provider.");
        }
    };

    render() {
        return (
            <div className="reported-services-table">
                <span><p>Reported Services</p></span>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Elderly Username</th>
                            <th>Provider Username</th>
                            <th>Service Name</th>
                            <th>Date and Time</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through reported service data and display in table rows */}
                        {this.state.reportedServicesData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.username}</td>
                                <td>{item.providerUsername}</td>
                                <td>{item.serviceName}</td>
                                <td>{item.dateTime}</td>
                                <td>{item.description}</td>
                                {/* Render action button to notify provider */}
                                <td>
                                    <button className="btn btn-danger delete-button" onClick={() => this.notifyProvider(item.status, item.id, item.provider)}>Notify Provider</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ReportedServices;

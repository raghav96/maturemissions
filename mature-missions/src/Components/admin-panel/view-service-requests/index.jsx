/* 
    File: ViewServiceRequests.jsx
    Description: Component for viewing service requests.
*/

import React, { Component } from "react";
import "./index.css";
import axios from "axios";

class ViewServiceRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceRequestsData: []
        }
    }

    // Fetches service requests data from the server
    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:8080/admin/service-requests', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const service_requests = []

            // Filters and prepares service requests data for active users and non-complete status
            for(let i = 0; i < response.data.serviceRequestsList.length; i++) {
                if (response.data.serviceRequestsList[i].user.active && response.data.serviceRequestsList[i].status !== "complete") {
                    service_requests.push({
                        id: response.data.serviceRequestsList[i].id,
                        username: response.data.serviceRequestsList[i].user.username,
                        service: response.data.serviceRequestsList[i].service.name,
                        dateAndTime: (response.data.serviceRequestsList[i].requestTime),
                        status: (response.data.serviceRequestsList[i].status)
                    });
                }
            }

            this.setState({ serviceRequestsData: service_requests });

        } catch (error) {
            alert("Unable to get service requests.");
        }
    }

    // Handles deleting a service request
    deleteRequest = async (requestId) => {        
        try {
            await axios.put('http://localhost:8080/notifications/elderly/cancel-request', {
                serviceRequestId: requestId,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            window.location.reload();
        } catch (error) {
            alert("Unable to delete the service request.");
        }
    };


    render() {

        return (
            <div className="view-service-request-table">
                <span><p>View Service Requests</p></span>
                <table className="table table-hover"> {/* Corrected className attribute */}
                    <thead>
                        <tr>
                            <th>Service Request ID</th>
                            <th>Elderly Username</th>
                            <th>Service Name</th>
                            <th>Date and Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.serviceRequestsData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.service}</td>
                                <td>{item.dateAndTime}</td>
                                <td>{item.status}</td>
                                <td>
                                    { item.status !== "complete" && <button className="btn btn-danger delete-button" onClick={() => this.deleteRequest(item.id)}>Delete Request</button> }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ViewServiceRequests;

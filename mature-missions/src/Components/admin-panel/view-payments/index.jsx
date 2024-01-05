/* 
    File: ViewPayments.jsx
    Description: Component for viewing payments.
*/

import React, { Component } from "react";
import "./index.css";
import axios from "axios";

class ViewPayments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            paymentsData: []
        }
    }

    // Fetch payments data from the server when the component is mounted.
    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:8080/admin/payment', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const payments_data = []

            // Filter and process payment data before updating the component state.
            for(let i = 0; i < response.data.paymentsList.length; i++) {
                // Will only show payments for active providers so the admin can pay them.
                if (response.data.paymentsList[i].serviceRequest.provider.user.active) { 
                    payments_data.push({
                        paymentId: response.data.paymentsList[i].id,
                        amount: response.data.paymentsList[i].amount,
                        requestId: response.data.paymentsList[i].serviceRequest.id,
                        providerUsername: response.data.paymentsList[i].serviceRequest.provider.user.username,
                        userId: response.data.paymentsList[i].serviceRequest.provider.user.id,
                        status: response.data.paymentsList[i].status
                    });
                }
            }

            this.setState({ paymentsData: payments_data });

        } catch (error) {
            alert("Unable to access payments data");
        }
    } 

    // Function to handle payment processing for a specific provider.
    payProvider = async (index, paymentId, userId, status) => {  
        console.log(paymentId + " " + userId);
        
        // This conditional is accessed only when status is active (if payment is not made to the provider).
        if (status === 'Active') {
            try {
                const response = await axios.post('http://localhost:8080/admin/send-payment', {
                    paymentId: paymentId,
                    userId: userId,
                } ,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response);
                
                // Update the component state after successful payment processing.
                const updatPaymentsData = this.state.paymentsData.filter((item) => item.id !== userId);
                this.setState({ paymentsData: updatPaymentsData });
                
                const dupPaymentsData = this.state.paymentsData;
                dupPaymentsData[index].status = 'Complete';
            
                this.setState({ paymentsData: dupPaymentsData });
    
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
            window.location.reload(); // Refresh the page after payment processing.

        }
    };

    render() {
        return (
            <div className="view-payments-table">
                {/* Display header */}
                <span><p>View Payments</p></span>
                {/* Display payments data in a table */}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Service Request ID</th>
                            <th>Provider Username</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through payments data and display each payment */}
                        {this.state.paymentsData.map((item, index) => (
                            <tr key={item.paymentId}>
                                <td>{item.paymentId}</td>
                                <td>{item.requestId}</td>
                                <td>{item.providerUsername}</td>
                                <td>${item.amount}</td>
                                <td>{item.status}</td>
                                {/* Provide buttons to process payments based on payment status */}
                                <td>
                                    { item.status === "Active" && <button className="btn btn-success delete-button" onClick={() => this.payProvider(index, item.paymentId, item.userId, item.status)}>Pay to Provider</button> }
                                    { item.status === "Complete" && <button className="btn btn-danger delete-button" onClick={() => this.payProvider(index, item.paymentId, item.userId, item.status)}>Paid to Provider</button> }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ViewPayments;

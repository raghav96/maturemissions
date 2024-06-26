/**
 * File: SetupAccount.jsx
 * Description: Component for managing provider's Stripe account setup.
 */

import React, { Component } from "react";
import "./index.css";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

class PaymentAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            providerId: props.providerId,
            stripeAccountId: ""
        };
    }

    /**
     * Fetches the provider's services and Stripe account details from the server upon component mount.
     */
    async componentDidMount() {
        this.getAccount();
    }

    /**
     * Fetches the provider's Stripe account details from the server.
     */
    getAccount = async () => {
        try {
            const response = await axios.post(`${apiUrl}/caregiver/account`, {
                providerId: localStorage.getItem("providerId"),
                userId: localStorage.getItem("userId")
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);

            this.setState({ stripeAccountId: response.data.account.id });
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    /**
     * Redirects the provider to the Stripe account setup page.
     */
    setupAccount = async () => {
        try {
            const response = await axios.post(`${apiUrl}/caregiver/create-account`, {
                providerId: localStorage.getItem("providerId"),
                userId: localStorage.getItem("userId")
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);

            window.location.href = response.data;
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    render() {
        return (
            <div className="payment-account-container">
                <p className="payment-account-header">Payment Account</p>
                <p className="payment-account-subheading">
                    Set up your Stripe account to receive payments
                </p>
                {this.state.stripeAccountId ? (
                    <button className="save-changes-btn">Account Setup Done</button>
                ) : (
                    <button className="save-changes-btn" onClick={this.setupAccount}>Setup Account</button>
                )}
            </div>
        );
    }
}

export default PaymentAccount;

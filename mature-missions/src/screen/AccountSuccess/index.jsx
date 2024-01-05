/**
 * File: AccountSuccess.jsx
 * Description: Component for displaying account success message and handling account data retrieval.
 */

import React, { Component } from 'react';
import axios from 'axios'; 
import "./index.css"; 
import Header from '../../Components/header'; 
import Footer from '../../Components/footer';

class AccountSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRole: localStorage.getItem('userRole')
        }
        this.getAccount(); // Retrieve account data upon component initialization
    }

    /**
     * Function to fetch account data from the server.
     * Sends a POST request to the server endpoint to retrieve account details.
     * Uses the providerId and userId obtained from local storage for authentication.
     */
    getAccount = async () => {
        try {
            // Make a POST request to fetch account data from the server
            await axios.post('http://localhost:8080/caregiver/account', {
                providerId: localStorage.getItem("providerId"),
                userId: localStorage.getItem("userId")
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization token in the request header
                }
            });
        } catch (error) {
            console.log('Error fetching data: ', error); // Log errors to the console if any occur during data fetching
        }
    }

    /**
     * Renders the appropriate header based on the user's role.
     */
    renderHeader(userRole) {
        switch (userRole) {
            case 'ROLE_USER':
                return <Header type={"elderly"} loggedIn={true} elder={true} />;
            case 'ROLE_PROVIDER':
                return <Header type={"caregiver"} loggedIn={true} elder={false} />;
            default:
                return <Header type={"guest"} loggedIn={false} elder={false} />;
        }
    }

    render() {
        return (
            <div className="about-component">
                <div className='about-content'>
                    {this.renderHeader(this.state.userRole)}
                    <div className='about-container'>
                        <div className='success-fail-component'>
                            <div><b>ACCOUNT CREATION SUCCESS</b></div>
                            <div>Your Stripe account was created</div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
    
}

export default AccountSuccess;
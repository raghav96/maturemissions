/**
 * File: PaymentFailure.jsx
 * Description: Component to display payment failure message and options.
 */

import React, { Component } from 'react';
import "./index.css";
import Header from '../../Components/header';
import Footer from '../../Components/footer'; 

class PaymentFailure extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRole: localStorage.getItem('userRole')
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
                            <div><b>ACCOUNT CREATION FAILURE</b></div>
                            <div>Your stripe account creation has failed. Please enter other payment details or contact admin</div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }   
}

export default PaymentFailure;
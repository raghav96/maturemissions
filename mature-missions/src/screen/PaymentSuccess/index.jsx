/**
 * File: PaymentSuccess.jsx
 * Description: Component for displaying a success message after a successful payment.
 */

import React, { Component } from 'react';
import "./index.css"
import Header from '../../Components/header';
import Footer from '../../Components/footer';

class PaymentSuccess extends Component {

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
                    <div className='success-fail-component'>
                        <div><b>PAYMENT SUCCESS</b></div>
                        <div>Your payment was successful! You are now subscribed.</div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
    
}

export default PaymentSuccess;
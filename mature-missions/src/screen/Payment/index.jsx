/**
 * File: Payment.jsx
 * Description: Component for handling payment details.
 */

import React, { useState, useEffect } from 'react';
import "./index.css";
import Header from '../../Components/header';
import Lock from "../../images/lock.png";
import { useSubscription } from '../../SubscriptionContext';
import axios from 'axios';

const Payment = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    const { selectedPackage, secrets } = useSubscription();
    const items = secrets[selectedPackage]; // Access the secret for the selected package
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const date = new Date()
    const aMonthFromNow = new Date(date.setMonth(date.getMonth()+8));

    const onCustomerNameChange = (ev) => {
        setName(ev.target.value)
    }

    const onCustomerEmailChange = (ev) => {
        setEmail(ev.target.value)
    }


    useEffect(() => {
        setUserRole(localStorage.getItem('userRole'));
    }, []);

    const initiatePayment = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        try {
            const response = await axios.post("http://localhost:8080/checkout", {
                userId: localStorage.getItem('userId'),
                items: [items],
                name: name,
                email: email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.status === "Failed") {
                alert(response.data.message);
            } else {
                window.location.href = response.data;
            }
        } catch (error) {
            alert('Error in making payment');
        }

    }

    /**
     * Renders the appropriate header based on the user's role.
     */
    const renderHeader = (userRole) => {
        switch (userRole) {
            case 'ROLE_USER':
                return <Header type={"elderly"} loggedIn={true} elder={true} />;
            case 'ROLE_PROVIDER':
                return <Header type={"caregiver"} loggedIn={true} elder={false} />;
            default:
                return <Header type={"guest"} loggedIn={false} elder={false} />;
        }
    };

    if (userRole !== 'ROLE_PROVIDER' && userRole !== 'ROLE_USER') {
        return null; // If userRole is neither ROLE_PROVIDER nor ROLE_USER, component will not render anything
    }

    return (
        <div className="payment-component">
            {renderHeader(userRole)}
            <div className='payment-content'>
                <div className='payment-box'>
                    <div className='payment-box-title'>
                        <p className='payment-box-title-text'>PAYMENT METHOD</p>
                    </div>

                    <div className='chosen-plan'>
                        <div className='chosen-plan-headings'>
                            <div className='name-heading'>Name</div>
                            <div className='price-heading'>Price</div>
                            <div className='dates-heading'>Starting and ending date</div>
                        </div>
                        <div className='chosen-plan-details'>
                            <div className='package-details'>{items.name}</div>
                            <div className='price-details'>{items.price}</div>
                            <div className='dates-details'>{date.toDateString()} to {aMonthFromNow.toDateString()}</div>
                        </div>
                    </div>

                    <div className='payment-details'>
                        <div className='name-details'>
                            <div className='first-name-details'>
                                <span className='first-name-title'>NAME <span className='asterisk-symbol'>*</span></span>
                                <input className='first-name' variant='filled' placeholder='Customer Name' onChange={onCustomerNameChange} value={name}/>
                            </div>
                            <div className='last-name-details'>
                                <span className='last-name-title'>EMAIL <span className='asterisk-symbol'>*</span></span>
                                <input className='last-name' variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange} value={email}/>
                            </div>
                        </div>
                        <button className='pay-now-button' onClick={initiatePayment} ><img alt='' className='lock-symbol' src={Lock} ></img>Initiate Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Payment;

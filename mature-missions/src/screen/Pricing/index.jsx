/**
 * File: Pricing.jsx
 * Description: Pricing component for displaying subscriptions for the Elderly users.
 */

import React, { useState, useEffect } from 'react';
import "./index.css";
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import Tick from "../../images/tick.png";
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../SubscriptionContext';
import axios from 'axios';

const Pricing = (props) => {
    const { setSelectedPackage } = useSubscription();
    const [currentSubscriptionType, setCurrentSubscriptionType] = useState(null);
    
    const packageExists = localStorage.getItem('userId') == null ? false : true;
    const packages = [
        currentSubscriptionType === 'Bronze',
        currentSubscriptionType === 'Silver',
        currentSubscriptionType === 'Gold'
    ];
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8080/view-subscription', {
                params: {
                    userId: localStorage.getItem("userId"),
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.status === "Failed") {
                alert(response.data.message);
            } else  if (response.data.type !== "none") {
                setCurrentSubscriptionType(response.data.type);
            }

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

    }, []);

    const navigate = useNavigate();

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

    const bronzeSubscriptionSelected = () => {
        setSelectedPackage('bronze');
        if (packageExists) {
            navigate("/payment")
        } else {
            navigate("/register");
        }
        
    }

    const silverSubscriptionSelected = () => {
        setSelectedPackage('silver');
        if (packageExists) {
            navigate("/payment")
        } else {
            navigate("/register");
        }
    }

    const goldSubscriptionSelected = () => {
        setSelectedPackage('gold');
        if (packageExists) {
            navigate("/payment")
        } else {
            navigate("/register");
        }
    }

    return (
        <div className="pricing-component">
            <div className='pricing-content'>
                {renderHeader(userRole)}
                <div className='subscription-container'>

                    {/* Bronze Subscription */}
                    <div className='subscriptions' id='bronze'>
                        <div className='rectangle-bronze'></div>
                        <div className='top-half'>
                            <p className='package-name'>BRONZE
                                <br></br>
                                <p className='amount'>$60<p className='weekly'>/weekly</p></p>
                                <p className='monthly-payment'>Charging $240 per month</p>
                            </p>
                        </div>
                        <div className="divider" />
                        <div className='middle'>
                            <ul className='pricing-list'>
                                <li className='pricing-item'>
                                    <img src={Tick} alt="Tick Icon" />
                                    <p>Receive any 3 essential services for elderly care per week.</p>
                                </li>
                            </ul>
                        </div>
                        <div className='bottom-half'>
                            {packages[0] === true ? (
                                <button className='pricing-btn' id='bronze'>SELECTED PLAN</button>
                            ) : (
                                <button className='pricing-btn' id='bronze' onClick={bronzeSubscriptionSelected}>CHOOSE PLAN</button>
                            )}
                        </div>
                    </div>

                    {/* Silver Subscription */}
                    <div className='subscriptions' id='silver'>
                        <div className='rectangle-silver'></div>
                        <div className='top-half'>
                            <p className='package-name'>SILVER
                                <br></br>
                                <p className='amount'>$120<p className='weekly'>/weekly</p></p>
                                <p className='monthly-payment'>Charging $480 per month</p>
                            </p>
                        </div>
                        <div className="divider" />
                        <div className='middle'>
                            <ul className='pricing-list'>
                                <li className='pricing-item'>
                                    <img src={Tick} alt="Tick Icon" />
                                    <p>Benefit from 5 chosen services for comprehensive elderly care per week.</p>
                                </li>
                            </ul>
                        </div>
                        <div className='bottom-half'>
                            {packages[1] === true ? (
                                <button className='pricing-btn' id='silver'>SELECTED PLAN</button>
                            ) : (
                                <button className='pricing-btn' id='silver' onClick={silverSubscriptionSelected}>CHOOSE PLAN</button>
                            )}
                        </div>
                    </div>

                    {/* Gold Subscription */}
                    <div className='subscriptions' id='gold'>
                        <div className='rectangle-gold'></div>
                        <div className='top-half'>
                            <p className='package-name'>GOLD
                                <br></br>
                                <p className='amount'>$180<p className='weekly'>/weekly</p></p>
                                <p className='monthly-payment'>Charging $720 per month</p>
                            </p>
                        </div>
                        <div className="divider" />
                        <div className='middle'>
                            <ul className='pricing-list'>
                                <li className='pricing-item'>
                                    <img src={Tick} alt="Tick Icon" />
                                    <p>Enjoy a complete care experience with 7 selected services for elderly well-being per week.</p>
                                </li>
                            </ul>
                        </div>
                        <div className='bottom-half'>
                            {packages[2] === true ? (
                                <button className='pricing-btn' id='gold'>SELECTED PLAN</button>
                            ) : (
                                <button className='pricing-btn' id='gold' onClick={goldSubscriptionSelected}>CHOOSE PLAN</button>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Pricing;

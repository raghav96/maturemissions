/**
 * File: ActiveSubscription.jsx
 * Description: Component for managing user subscriptions and cancellation.
 */

import React, { useState, useEffect } from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Functional component for managing user subscriptions and cancellation.
 */
function ActiveSubscription() {
    const navigate = useNavigate();

    const [subscriptionId, setSubscriptionId] = useState(1);
    const [type, setType] = useState('Silver');
    const [price, setPrice] = useState('120');
    const [nextPaymentDate, setNextPaymentDate] = useState(new Date());
    const [subscriptionSelected, setValidSubscription] = useState(false);

    /**
     * Fetches user subscription details from the server upon component mount.
     */
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
                } else {
                    if (response.data.type === "none") {
                        setValidSubscription(false);
                    } else {
                        const subscriptionType = response.data.type;
                        const subscriptionId = response.data.subscription.subscriptionId;
                        const subscriptionPrice = response.data.subscription.price;
                        const nextPaymentDate = response.data.subscription.nextPaymentDate;
    
                        setType(subscriptionType);
                        setPrice(subscriptionPrice);
                        setSubscriptionId(subscriptionId);
                        setNextPaymentDate(nextPaymentDate);
                        setValidSubscription(true);
                    }
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    /**
     * Cancels the user's subscription and navigates back to the appropriate dashboard page.
     */
    const cancelSubscription = async () => {
        try {
            await axios.post('http://localhost:8080/cancel-subscription', {
                userId: localStorage.getItem("userId"),
                subscriptionId: subscriptionId, // I need a valid subscription Id.
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert("Subscription Cancelled");

            const userRole = localStorage.getItem('userRole');
            if (userRole === 'ROLE_USER') {
                navigate("/elderly");
            } else if (userRole === 'ROLE_PROVIDER') {
                navigate("/caregiver");
            }
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    return (
        <div className="active-subscription-container">
            <p className="subscription-heading">My Subscription</p>
            { subscriptionSelected === true  ? (
                <>
                    <div className="subscription-content">
                        <p className="subscription-subheading">{type} Subscription:</p>
                        <p className="subscription-text">
                            Your <b>{type}</b> subscription will automatically renew on <b>{nextPaymentDate}</b> and we will charge your credit card <b>${price} weekly</b> unless you cancel your subscription.
                        </p>
                    </div>
                    <div className="active-subscription-box">
                        <p>Current Plan - {type} (Weekly)</p>
                        <div className="subscription-edit">
                            <NavLink className="navlink-l" exact to={"/pricing"}>
                                <button>Change Subscription</button>
                            </NavLink>
                            <button id="subscription-cancel" onClick={cancelSubscription}>
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="subscription-content">
                        <p className="subscription-subheading">No Subscription Selected:</p>
                        <p className="subscription-text">
                            Select a subscription plan to unlock our services and enjoy the benefits tailored to your needs. 
                            Your selected subscription will grant you exclusive access to our features and content, enhancing your experience with our services.
                        </p>
                    </div>
                    <div className="active-subscription-box">
                        <p>No Subscription Selected</p>
                        <div className="subscription-edit">
                            <NavLink className="navlink-l" exact to={"/pricing"}>
                                <button style={{ width: '40vw' }}>Choose Subscription</button>
                            </NavLink>
                        </div>
                    </div>
                </>
            )};

            
        </div>
  );
}

export default ActiveSubscription;

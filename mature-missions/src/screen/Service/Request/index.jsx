/**
 * File: ServicesRequest.jsx
 * Description: Component for displaying service request options for elderly users.
 */

import React, { Component } from 'react';
import "./index.css"
import Header from '../../../Components/header';
import Footer from '../../../Components/footer';
import Request from '../../../Components/service-request';

class ServicesRequest extends Component {
    render() {
        return (
            <div className="request-component">
                <div className='request-content'>
                    <Header type={"elderly"} loggedIn={true} elder={true} />
                    <div className='request-container'>
                        <Request name="Care Assistance" description="Personalized support for your daily needs, ensuring comfort and well-being." serviceId={1} />
                        <Request name="Meal Preparation" description="Enjoy thoughtfully crafted meals that promote health and satisfaction, prepared according to your preferences." serviceId={2} />
                        <Request name="Housekeeping" description="Maintain a tidy and organized living space with our meticulous cleaning and tidying services." serviceId={3} />
                        <Request name="Family Interaction" description=" Stay effortlessly connected with loved ones through facilitated communication and updates on family matters." serviceId={4} />
                        <Request name="Mobility Support" description="Experience greater freedom and independence with our attentive mobility assistance." serviceId={5} />
                        <Request name="Social Outgoings" description=" Engage in enjoyable excursions to cafes, shops, and outings, fostering vibrant social connections." serviceId={6} />
                    </div>
                    <Footer />
                </div>
            </div>       
        );
    }
}

export default ServicesRequest;
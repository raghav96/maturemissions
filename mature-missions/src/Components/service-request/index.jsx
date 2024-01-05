/**
 * File: Request.jsx
 * Description: Component for displaying service requests.
 */

import React, { Component } from 'react';
import "./index.css";
import ServiceBooking from '../service-booking';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    /**
     * Toggles the modal to display or hide the service booking form.
     */
    toggleModal = () => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    }; 

    render() {
        const { name, description, serviceId } = this.props;
        const { showModal } = this.state;

        return (
            <div className="request">
                {/* Display service request details */}
                <p className='request-name'>{name}</p>
                <p className='request-summary'>{description}</p>

                {/* Button to book the service */}
                <button onClick={this.toggleModal}>Book Now</button>

                {/* Display service booking form modal if showModal state is true */}
                {showModal && <ServiceBooking service_name={name} serviceId={serviceId} />}
            </div>
        );
    }
}

export default Request;

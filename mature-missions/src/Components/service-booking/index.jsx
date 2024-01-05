/*
  File: ServiceBooking.jsx
  Description: Component for booking a service, allowing users to choose date and time.
*/

import React, { Component } from 'react';
import "./index.css"; 
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button'; 
import BookingCalander from '../calander'; 
import BookingTime from '../clock'; 
import axios from 'axios'; 

class ServiceBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"), 
            holidays: [], // Stores data from the external front-end API Holidays
            date: new Date(), // Initial date set to current date
            time: '12:00', // Initial time set to 12:00
            showBooking: true, 
            showConfirm: false, 
        }
    }

    // Fetch holidays data from an external API upon component mounting
    async componentDidMount() {
        try {
            const response = await axios.get("https://holidays.abstractapi.com/v1/?api_key=2e652125d9194a52936d1312325da870&country=AU&year=2020");
            const holidays_data = [];

            // Extract relevant holiday data (National and Local holidays) and store in holidays_data array
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].type === "National" || response.data[i].type === "Local holiday") {
                    holidays_data.push({
                        name: response.data[i].name,
                        type: response.data[i].type,
                        day: response.data[i].date_day,
                        month: response.data[i].date_month
                    });
                }
            }

            // Set holidays state with extracted data
            this.setState({ holidays: holidays_data });
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    // Close the booking modal
    handleCloseBooking = () => {
        this.setState({ showBooking: false });
    };

    // Close the confirmation modal
    handleCloseConfirm = () => {
        this.setState({ showConfirm: false })
    }

    // Open the confirmation modal after a delay
    handleConfirmBooking = () => {
        this.handleCloseBooking();
        setTimeout(() => {
            this.setState({ showConfirm: true })
        }, 500);
    };

    // Check if the selected date is an Australian holiday
    isAustralianHoliday = () => {
        const month = String(this.state.date.getMonth() + 1).padStart(2, "0");
        const day = String(this.state.date.getDate()).padStart(2, "0");
        for (let i = 0; i < this.state.holidays.length; i++) {
            if (this.state.holidays[i].day === day && this.state.holidays[i].month === month) {
                alert(`Our service providers are unavailable on a ${this.state.holidays[i].type} holiday - ${this.state.holidays[i].name}. Please choose an alternative date to book your service.`);
                return true;
            }
        }
        return false;
    }

    // Handle the confirmation of the booking
    handleConfirm = async () => {
        try {
            // Retrieve user subscription data
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
                // If user is not subscribed, show an alert and close the confirmation modal
                if (response.data.type === "none") {
                    alert('UNABLE TO MAKE BOOKING: You need to be a subscribed user in order to book services. You can choose a plan from our Pricing page or from your Profile under My Subscription.');
                    this.handleCloseConfirm();
                } else {
                    const { userId, date, time } = this.state;
                    const { serviceId } = this.props;

                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");

                    // Format date, time, and datetime for API request
                    const formattedDate = `${year}-${month}-${day}`;
                    const formattedTime = time + ":00.000";
                    const formattedDateTime = `${formattedDate}T${formattedTime}+11:00`;

                // Make a POST request to change user details (status) on the server
                axios.post('http://localhost:8080/check-subscription', {
                    userId: localStorage.getItem("userId"),
                    date: formattedDate, // Toggle user status
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authorization token in the request header
                    }
                }).then((response) => {
                    console.log(response);
                    if (response.data === false) {
                        alert("Service Request Limit Exceeded");
                    } else {
                        console.log("Service request limit not exceeded");
                        // Check if selected date is not an Australian holiday, then make the booking request
                        if (!this.isAustralianHoliday()) {
                            axios.post('http://localhost:8080/book-service', {
                                userId: userId,
                                serviceId: serviceId,
                                date: formattedDate,
                                times: formattedDateTime,
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            .then((response) => {
                                this.handleCloseConfirm();
                                alert('Service request placed successfully! Head over to Notifications to view requested services.');
                            })
                            .catch((error) => {
                                if (error.response) {
                                    console.error(error);
                                }
                            });
                        }
                    }
                }).catch((error) => {
                    if (error.response) {
                        console.error(error);
                    }
                });

                
            }}

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Handle change in selected time
    handleTimeChange = (selectedTime) => {
        this.setState({ time: selectedTime });
    }

    // Handle change in selected date
    handleDateChange = (selectedDate) => {
        this.setState({ date: selectedDate });
    }

    render() {
        const { service_name } = this.props;
        return (
            <div>
                <Modal className='slide-in' show={this.state.showBooking} size='xl'>
                    <Modal.Header className='modal-header'>
                        <Modal.Title className='modal-title'>Book {service_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-body'>
                        <div className='row'>
                            <div className='book col-md-6'>
                                <div className='circle'><span>1</span></div>
                                <BookingTime onTimeChange={this.handleTimeChange} />
                            </div>
                            <div className='book col-md-6'>
                                <div className='circle'><span>2</span></div>
                                <BookingCalander onDateChange={this.handleDateChange} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='modal-footer'>
                        <Button variant="secondary" id='book' onClick={this.handleConfirmBooking}>
                            Book Now
                        </Button>
                        <Button variant="primary" id='close' onClick={this.handleCloseBooking}>
                            Cancel Booking
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal className='slide-in' show={this.state.showConfirm} size='lg'>
                    <Modal.Header className='confirm-header'>
                        <Modal.Title className='confirm-title'>Confirm Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='confirm-body'>
                        <p><b>Confirm your booking for the following service:</b></p>
                        <ul>
                            <li><b>Service Name:</b> {service_name}</li>
                            <li><b>Date:</b> {this.state.date.toDateString()}</li>
                            <li><b>Time:</b> {this.state.time}</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer className='confirm-footer'>
                        <Button variant="secondary" id="book" onClick={this.handleConfirm}>
                            Confirm Booking
                        </Button>
                        <Button variant="danger" id="close" onClick={this.handleCloseConfirm}>
                            Cancel Booking
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    }
    
}

export default ServiceBooking;
/*
    File: BookingTime.jsx
    Description: Component for selecting and displaying booking time.
*/

import React, { Component } from 'react';
import "./index.css";

class BookingTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTime: '12:00', // Default selected time
        };
    }

    // Handle time change event
    handleTimeChange = (event) => {
        this.setState({ selectedTime: event.target.value });
    };

    // Handle time blur event, triggers the parent component's onTimeChange function
    handleTimeBlur = () => {
        this.props.onTimeChange(this.state.selectedTime);
    };

    render() {
        const { selectedTime } = this.state;

        return (
            <div className="timePicker">
                <p>Selected Time:</p>
                <input
                    type="time"
                    value={selectedTime}
                    onChange={this.handleTimeChange}
                    onBlur={this.handleTimeBlur}
                />
            </div>
        );
    }
}

export default BookingTime;

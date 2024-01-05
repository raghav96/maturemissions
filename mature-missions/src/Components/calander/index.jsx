/*
    File: BookingCalander.jsx
    Description: Component for rendering a calendar and handling date selection.
*/

import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./index.css";

class BookingCalander extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: new Date(),
        };
      }
    
      // Handle date change event and pass the selected date to the parent component
      handleDateChange = (date) => {
        this.setState({ selectedDate: date }, () => {
          this.props.onDateChange(date);
        });
      };

      // Format date as dd/mm/yyyy
      formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
    
      render() {
        const { selectedDate } = this.state;
    
        return (
          <div className='calendar-container'>
            {/* Calendar component */}
            <Calendar
                onChange={this.handleDateChange}
                value={selectedDate}
                minDate={new Date()}
            />
            {/* Display selected date */}
            {selectedDate && (
              <div className='selected-date'>
                Selected Date: {this.formatDate(selectedDate)}
              </div>
            )}
          </div>
        );
    }
}
    
export default BookingCalander;

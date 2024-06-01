/* 
    File: notification-sender.jsx
    Description: Utility function to send notifications via email and SMS using Axios.
*/

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Function to send notifications to a user via email and/or SMS
export function sendNotifications(user, subject, message) {
  // Setting authorization token from local storage for API requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

  // Sending email notification if user has email notifications enabled
  if (user.emailNotifications !== null && user.emailNotifications) {
    axios.post(`${apiUrl}/send-email`, {
        userId: user.id,
        subject: subject,
        message: message
    })
    .then(response => {
        console.log('Email sent:', response.data); // Logging successful email response
    })
    .catch(error => {
        console.error('Error sending email:', error); // Logging error if email sending fails
    });
  }

  // Sending SMS notification if user has SMS notifications enabled
  if (user.smsNotifications !== null && user.smsNotifications) {
    axios.post(`${apiUrl}/send-sms`, {
        userId: user.id,
        message: message
    })
    .then(response => {
        console.log('SMS sent:', response.data); // Logging successful SMS response
    })
    .catch(error => {
        console.error('Error sending SMS:', error); // Logging error if SMS sending fails
    });
  }
}

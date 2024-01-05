/**
 * File: AdminLogin.jsx
 * Description: Component for admin login functionality.
 */

import React, { useState } from "react";
import "./index.css"; 
import Button from 'react-bootstrap/Button';
import Hide from '../../../images/hide.png'; 
import Visible from '../../../images/visible.png'; 
import { useNavigate } from "react-router-dom"; 
import axios from 'axios'; 

function AdminLogin() {
    // State variables for password visibility and password input type
    const [isPwdVisible, setIsPwdVisible] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

    // Navigate function to redirect users to different routes
    const navigate = useNavigate();

    /**
     * Function to toggle password visibility.
     * Changes password input type between "text" and "password".
     */
    const changePwdVisibility = () => {
        setIsPwdVisible(!isPwdVisible); // Toggle password visibility state
        setPasswordType(isPwdVisible ? "password" : "text"); // Change password input type based on visibility state
    }

    /**
     * Function to check the validity of admin credentials.
     * Sends a POST request to the server to validate admin login credentials.
     * If valid, stores user data in local storage and redirects to admin panel.
     * If invalid, displays an error alert.
     */
    const checkValidCredentials = async () => {
        // Get username and password from input fields
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        try {
            // Make a POST request to validate admin login credentials
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password,
            });

            // Retrieve user data based on the received response
            const response1 = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: response.data.userId
                },
                headers: {"Authorization" : `Bearer ${response.data.jwtToken}`},
                withCredentials: true
            });

            // Check if the user is active
            if (response1.data.user.active) {
                // Store user data in local storage
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('token', response.data.jwtToken);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userRole', response.data.role);
                localStorage.setItem('active', response1.data.user.active);
                localStorage.setItem('userImage', response1.data.user.imageLoc);

                // Check user role and navigate to appropriate route
                const userRole = localStorage.getItem('userRole');
                if (userRole === 'ROLE_ADMIN') {
                    navigate('/admin'); // Redirect to admin panel
                } else {
                    alert("Invalid Admin User"); // Display error alert for invalid admin user
                }

            } else {
                alert("Invalid User"); // Display error alert for inactive user
            }

        } catch (error) {
            alert('Invalid username or password'); // Display error alert for invalid username or password
        }
    }

    return (
        <div className="admin-login-container">
            <div className="admin-login-left">
                <p>Welcome to<br></br>Mature Missions</p>
            </div>
            <div className="admin-login-right">
                <div className="admin-login-title" id="admin-components">
                    <p className='admin-title'>Mature Missions<p className='admin-subtitle'>Rewarding kindness towards the elderly</p></p>
                </div>
                <div className="admin-credentials" id="admin-components">
                    <label className="credential-label">Username <span>*</span></label>
                    <input type="text" name="username" id="username" className="username-textfield"></input>
                </div>
                <div className="admin-credentials" id="admin-components">
                    <div className="admin-password-header">
                        <label className="credential-label">Password <span>*</span></label>
                        <button className="pwd-visibility" onClick={changePwdVisibility}>
                            {isPwdVisible ? (
                                <img src={Visible} alt="Visible"></img>
                            ) : (
                                <img src={Hide} alt="Hide"></img>
                            )}
                        </button>
                    </div>
                    <input type={passwordType} name="password" id="password" className="password-textfield"></input>
                </div>
                <div className="login-btn-container" id="admin-components">
                    <Button className="admin-login-btn btn-secondary" onClick={checkValidCredentials}>Log In</Button>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;

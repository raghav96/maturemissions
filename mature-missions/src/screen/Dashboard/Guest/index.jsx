/**
 * File: Guest.jsx
 * Description: Component for the guest user's landing page.
 */

import React, { Component } from "react";
import "./index.css";
import Elderly from "../../../images/dashboard.png";
import Header from "../../../Components/header";
import Footer from "../../../Components/footer";
import { NavLink } from "react-router-dom";

class Guest extends Component {

    constructor(props) {
        super(props);
        localStorage.clear();
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <Header type={"guest"} loggedIn={false} elder={false} />
                    <div className='dashboard-subcontainer'>
                        <div className='dashboard-sub-subcontainer'>
                            <div className='dashboard-title-container'>
                                <p className='dashboard-title'>Elevating Elderly Care with Compassion</p>           
                            </div>
                            <div className='dashboard-content-container'>
                                <p className='dashboard-subtitle'>
                                    At Mature Missions, we are passionate about elevating elderly care with compassion. Our caregivers are dedicated to providing exceptional support and companionship to the elderly, ensuring their well-being and comfort in every way.<br></br><br></br> 
                                    Discover a new standard of care that prioritizes respect, dignity, and a joyful journey through aging with Mature Missions.
                                </p>           
                            </div>
                        </div>
                        <div className='guest-content-buttons'>
                            <NavLink className="navlink-l" exact to={`/register`}>
                                <button className='btn' id='primary'>Sign Up &gt;</button>  
                            </NavLink>    
                            <NavLink className="navlink-r" exact to={`/about`}>
                                <button className='btn' id='secondary'>Learn More &gt;</button>  
                            </NavLink>    
                        </div>
                    </div>
                    
                </div>
                <div className="image-container">
                    <img alt="" src={Elderly}></img>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Guest;
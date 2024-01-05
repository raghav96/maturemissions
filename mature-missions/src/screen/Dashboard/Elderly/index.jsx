/**
 * File: Elderly.jsx
 * Description: Component for the elderly user's landing page.
 */

import { Component } from "react";
import "./index.css"
import ElderlyImage from "../../../images/dashboard.png";
import Header from "../../../Components/header";
import Footer from "../../../Components/footer";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

class Elderly extends Component {
    render() {
        const userRole = localStorage.getItem('userRole');
        if(userRole === 'ROLE_USER') {
            return (
                <div className="dashboard-container">
                    <div className="dashboard-content">
                        <Header type={"elderly"} loggedIn={true} elder={true} />
                        <div className='elderly-subcontainer'>
                            <div className='dashboard-sub-subcontainer'>
                                <div className='dashboard-title-container'>
                                    <p className='dashboard-title'>Elevating Elderly Care with Compassion</p>           
                                </div>
                            </div>
                            <div className='elderly-content-buttons'>
                                <NavLink className="navlink-l" exact to={`/services-request`}>
                                    <Button className='btn' id='primary'>Request Service Now &gt;</Button>  
                                </NavLink>    
                                <NavLink className="navlink-r" exact to={`/about`}>
                                    <Button className='btn' id='secondary'>Learn More &gt;</Button>  
                                </NavLink>    
                            </div>
                        </div>
                        
                    </div>
                    <div className="image-container">
                        <img alt="" src={ElderlyImage}></img>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

export default Elderly;
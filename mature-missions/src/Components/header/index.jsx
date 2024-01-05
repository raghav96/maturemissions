/* 
    File: Header.jsx
    Description: Component for the website header, including navigation links and buttons.
*/

import React, { Component } from 'react';
import "./index.css";
import { NavLink } from "react-router-dom";
import Notification from "../../images/notifications.png";
import AdminLogout from '../../images/admin-logout.png'; 

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headerType: props.type,
            isLoggedIn: props.loggedIn,
            isElder: props.elder,
            userRole: localStorage.getItem('userRole')
        }
    }

    // Function to handle admin logout by clearing admin status in local storage
    adminLogOut = () => {
        localStorage.setItem('admin', null);
    }

    // Function to render home button based on user role
    renderHomeButton(userRole) {
        // Renders different home buttons based on user role
        // User, Provider, and Default roles have specific home routes
        // Default route is for general visitors
        switch (userRole) {
            case 'ROLE_USER':
                return <a className='header-anchor' href='/elderly'>Home</a>;
            case 'ROLE_PROVIDER':
                return <a className='header-anchor' href='/caregiver'>Home</a>;
            default:
                return <a className='header-anchor' href='/'>Home</a>;
        }
    }

    // Function to render the header title based on user role
    renderHeadTitle(userRole) {
        // Renders different titles based on user role
        // User, Provider, and Default roles have specific titles
        switch (userRole) {
            case 'ROLE_USER':
                return <a href='/elderly'><p className='title'>Mature Missions<p className='subtitle'>Rewarding kindness towards the elderly</p></p></a>;
            case 'ROLE_PROVIDER':
                return <a href='/caregiver'><p className='title'>Mature Missions<p className='subtitle'>Rewarding kindness towards the elderly</p></p></a>;
            default:
                return <a href='/'><p className='title'>Mature Missions<p className='subtitle'>Rewarding kindness towards the elderly</p></p></a>;
        }
    }

    // Function to render different components based on header type
    renderSwitch(type) {
        // Renders different components based on header type
        // Each type has specific buttons and functionalities
        switch(type) {
            // Guest header with login and signup buttons
            case 'guest':
              return (
                <div className='header-buttons'>
                    <NavLink className="navlink-l" exact to={`/login`}>
                        <button className='btn' id='primary'>Login &gt;</button>  
                    </NavLink>    
                    <NavLink className="navlink-r" exact to={`/register`}>
                        <button className='btn' id='secondary'>Sign Up &gt;</button>  
                    </NavLink>    
                </div>
              );
            // Caregiver header with notification and profile buttons
            case 'caregiver':
              return(
                <div className='header-buttons'>
                    <a href='/caregiver/notifications' className='notification-anchor'><img alt='' src={Notification}></img></a>
                    <a href='/caregiver/profile' className='profile-anchor'><img alt='' src={localStorage.getItem('userImage')}></img></a>
                </div>      
              )
            // Elderly header with notification and profile buttons
            case 'elderly':
              return(
                <div className='header-buttons'>
                    <a href='/elderly/notifications' className='notification-anchor'><img alt='' src={Notification}></img></a>
                    <a href='/elderly/profile' className='profile-anchor'><img alt='' src={localStorage.getItem('userImage')}></img></a>
                </div>
              )
            // Admin header with admin-specific buttons and functionalities
            case 'admin':
                return(
                    <div className='admin-button'>     
                        <NavLink className="navlink-r" exact to={`/`}>
                            <button className='btn admin-btn' id='secondary'>Go to Main Site &gt;</button>  
                        </NavLink>    
                        <div className='btn admin-username' id='primary'>Username: {localStorage.getItem('username')}</div>  
                        <a href='/admin/login' className='admin-anchor'><img alt='' src={AdminLogout}></img></a>
                    </div>
                )
            // Register header with signup button
            case 'register':
                return(
                    <div className='header-buttons'>
                        <NavLink className="navlink-r" exact to={`/register`}>
                            <button className='btn' id='secondary'>Sign Up &gt;</button>  
                        </NavLink>    
                    </div>
                )
            // Login header with login button
            case 'login':
                return(
                    <div className='header-buttons'>
                        <NavLink className="navlink-l" exact to={`/login`}>
                            <button className='btn' id='primary'>Login &gt;</button>  
                        </NavLink>  
                    </div>
                )
            // Default header for other cases, includes admin logout button
            case 'default':
                return(
                    <div className='admin-button'>     
                        <a href='/login' className='admin-anchor' onClick={() => this.adminLogOut()}><img alt='' src={AdminLogout}></img></a>
                    </div>
                )
            // Default case for unsupported header types
            default:
                <></>
        }
    }

    // Render function for the Header component
    render() {
        return (
            <div className="header-component">
                
                {this.state.headerType !== 'admin' && this.state.headerType !== 'default' &&
                    <>
                        <div className='head-title'>
                            {this.renderHeadTitle(this.state.userRole)}           
                        </div>
                        <div className='header-items'>
                            {this.renderHomeButton(this.state.userRole)}
                            <div class="dropdown">
                                {/* Dropdown menu for services */}
                                <a href="#!" className="btn dropdown-toggle" role="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                    Services
                                </a>
                                <ul class="dropdown-menu">
                                    {/* Dropdown items for different services */}
                                    <li><a class="dropdown-item" href="/services/care-assistance">Care Assistance</a></li>
                                    <li><a class="dropdown-item" href="/services/meal-preparation">Meal Preparation</a></li>
                                    <li><a class="dropdown-item" href="/services/housekeeping">Housekeeping</a></li>
                                    <li><a class="dropdown-item" href="/services/family-interaction">Family Interaction</a></li>
                                    <li><a class="dropdown-item" href="/services/mobility-support">Mobility Support</a></li>
                                    <li><a class="dropdown-item" href="/services/social-outgoings">Social Outgoings</a></li>
                                </ul>
                            </div>
                            { this.state.userRole !== 'ROLE_PROVIDER' && <a className='header-anchor' href='/pricing'>Pricing</a> }
                        </div>
                    </>
                }
                {/* Renders different components based on header type */}
                {this.renderSwitch(this.state.headerType)}
            </div>
        );
    }
}

export default Header;

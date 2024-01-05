/**
 * File: Profile.jsx
 * Description: User profile component for displaying user information and profile items.
 */

import React, { Component } from "react";
import "./index.css";
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import Address from '../../Components/profile/address';
import PaymentAccount from '../../Components/profile/payment-account';
import MedicalInformation from '../../Components/profile/medical-info';
import PersonalInformation from '../../Components/profile/personal-info';
import ActiveSubscription from '../../Components/profile/subscription';
import ToggleNotifications from '../../Components/profile/toggle-notifications';
import Camera from '../../images/photo.png';
import AddressIcon from '../../images/address.png';
import SignOut from "../../Components/profile/signout";
import axios from "axios";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.state = {
            itemClicked: 0, // Index of profile item to render
            currentUserData: [],
            profile_items: [
                <PersonalInformation />,
                <Address />,
                <PaymentAccount />,
                <MedicalInformation />,
                <ActiveSubscription />,
                <ToggleNotifications />,
                <SignOut />
            ],
            userImage: localStorage.getItem('userImage'),
            userName: "",
            userAge: "",
            userAddress: "",
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: localStorage.getItem("userId"),
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            this.setState({ currentUserData: response.data.user });
            this.setState({ userName: response.data.user.name });
            this.setState({ userAge: response.data.user.age });
            this.setState({ userAddress: response.data.user.address });
            
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    setItemClicked = (index) => {
        this.setState({ itemClicked: index });
    }

    handleFileInputClick = () => {
        this.fileInputRef.current.click();
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const { currentUserData } = this.state;
                this.setState({
                    userImage: e.target.result
                });
                
                localStorage.setItem('userImage', e.target.result);
                
                if( currentUserData.age === undefined){
                    currentUserData.age = null;
                }
                if( currentUserData.medicareNumber === undefined){
                    currentUserData.medicareNumber = null;
                }
                if( currentUserData.address === undefined){
                    currentUserData.address = null;
                }
                if( currentUserData.emailNotifications === undefined){
                    currentUserData.emailNotifications = false;
                }
                if( currentUserData.smsNotifications === undefined){
                    currentUserData.smsNotifications = false;
                }

                try {
                    await axios.post('http://localhost:8080/user/change-details', {
                        userId: localStorage.getItem("userId"),
                        imageLoc: e.target.result.toString(),
                        type: "IMAGE"
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                } catch (error) {
                    console.log('Error fetching data: ', error);
                } 
            };
            reader.readAsDataURL(file);
        } else {
            alert("Invalid file selected.");
        }
    }

    renderSwitch = (type) => {
        switch(type) {
            case 'caregiver':
              return(
                <div className="profile-header-content"> 
                    <div className="profile-pic">
                        <a href="#!" onClick={this.handleFileInputClick}><img alt="" id="profile-img" src={this.state.userImage}></img></a>
                        <a href="#!" onClick={this.handleFileInputClick}>
                            <span>
                                <img alt="" id="camera" src={Camera}></img>
                                <p>Edit Photo</p>
                            </span>
                        </a>
                        <input
                            type="file"
                            accept="image/*"
                            ref={this.fileInputRef}
                            style={{ display: 'none' }} // Hide the file input
                            onChange={this.handleFileChange}
                        />
                    </div>
                    <div className="profile-summary">
                        <p className="profile-name">{this.state.userName}</p>
                        <p className="profile-age">Caregiver, {this.state.userAge} years old</p>
                    </div>

                </div>      
            )
            case 'elderly':
              return(
                <div className="profile-header-content">
                    <div className="profile-pic">
                        <a href="#!" onClick={this.handleFileInputClick}><img alt="" id="profile-img" src={this.state.userImage}></img></a>
                        <a href="#!"onClick={this.handleFileInputClick}>
                            <span>
                                <img alt="" id="camera" src={Camera}></img>
                                <p>Edit Photo</p>
                            </span>
                        </a>
                        <input
                            type="file"
                            accept="image/*"
                            ref={this.fileInputRef}
                            style={{ display: 'none' }} // Hide the file input
                            onChange={this.handleFileChange}
                        />
                    </div>
                    <div className="profile-summary">
                        <p className="profile-name">{this.state.userName}</p>
                        <p className="profile-age">Elderly, {this.state.userAge} years old</p>
                        <p className="profile-address"><img alt="" src={AddressIcon}></img>Lives in {this.state.userAddress}</p>
                    </div>
                </div>
            )
            default:
                return ( <></> )

        }
    }

    render() { 
        const { itemClicked, profile_items } = this.state;
        const { userType } = this.props;

        let userItem;
        let subscriptionItem;
        let address;

        if (userType === 'caregiver') {
            userItem = <a href="#!" onClick={() => this.setItemClicked(2)} className="list-group-item profile-item list-group-item-action" data-bs-toggle="list">Payment Account</a>
        } else if (userType === 'elderly') {
            address = <a href="#!" onClick={() => this.setItemClicked(1)} className="list-group-item profile-item list-group-item-action" data-bs-toggle="list">Address</a>
            userItem = <a href="#!" onClick={() => this.setItemClicked(3)} className="list-group-item profile-item list-group-item-action" data-bs-toggle="list">Medical Information</a>
            subscriptionItem = <a href="#!" onClick={() => this.setItemClicked(4)} className="list-group-item profile-item list-group-item-action" data-bs-toggle="list">My Subscription</a>
        }

        return (
            <div className="profile-component">
                <Header type={userType} loggedIn={false} elder={false} />
                <div className="profile-content">
                    <div className="profile-header">
                        {this.renderSwitch(userType)}
                    </div>
                    <div className="profile-body">
                        <div className="list-group profile-items">
                            <a href="#!" onClick={() => this.setItemClicked(0)} className="list-group-item profile-item list-group-item-action active" data-bs-toggle="list">Personal Information</a>
                            {address}
                            {userItem}
                            {subscriptionItem}
                            <a href="#!" onClick={() => this.setItemClicked(5)} className="list-group-item profile-item list-group-item-action" data-bs-toggle="list">Notifications</a>
                            <a href="#!" onClick={() => this.setItemClicked(6)} className="list-group-item profile-item list-group-item-action">Sign Out</a>
                        </div>
                        <div className="profile-item-value">
                            {/* Displays the selected profile item => Render a profile item component */}
                            {profile_items[itemClicked]}
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>
        )
    }



}

export default Profile 
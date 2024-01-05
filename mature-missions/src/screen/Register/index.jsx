/**
 * File: Register.jsx
 * Description: User registration component.
 */

import React from 'react';
import "./index.css";
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

function Register(props) {

    const [userType, setUserType] = useState('Elderly');
    
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [street, setStreet] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [medicare, setMedicare] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
    const [australianStates] = useState([
        'Australian Capital Territory',
        'New South Wales',
        'Northern Territory',
        'Queensland',
        'South Australia',
        'Tasmania',
        'Victoria',
        'Western Australia'
    ]);

    const navigate = useNavigate();

    const clearData = () => {
        setName("");
        setUsername("");
        setPhoneNumber("");
        setAge("");
        setStreet("");
        setName("");
        setState("");
        setCity("");
        setZip("");
        setMedicare("");
        setEmail("");
        setPassword("");
    }

    const verifyZip = () => {
        const regex = /^\d{3,5}$/;

        if (regex.test(zip) && zip >= 1000 && zip <= 9999) {
            return true;
        }
        alert("Invalid ZIP/Postcode. Please try again.");
        return false;
    }

    const verifyStreet = () => {
        const regex = /^(?:[A-Za-z0-9\s]+ )+[A-Za-z0-9\s]+$/;
        if (regex.test(street)) {
            return true;
        }
        alert("Invalid Street. Please try again.");
        return false;
    }

    const verifyEmail = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (emailRegex.test(email)) {
            return true;
        }
        alert("Invalid Email. Please try again.");
        return false;
    }

    const verifyNumber = () => {
        const numberString = phonenumber.toString();
        if (numberString.length === 9 && numberString.charAt(0) !== '0' && (numberString.charAt(0) === '4' || numberString.charAt(0) === '5')) {
            return true; 
        } else if (numberString.length === 10 && numberString.charAt(0) === '0' && (numberString.charAt(1) === '4' || numberString.charAt(1) === '5') ) {
            return true;
        }

        alert("Invalid Phone Number. Please try again.");
        return false;
    }

    const verifyMedicare = () => {
        const medicareRegex = /^[2-6]\d{9}$/;
        if (medicare.toString() === "NaN" || medicare === "") { // Medicare number is optional value
            return true;
        }

        if (medicareRegex.test(medicare)) {
            return true;
        } 
        
        alert("Invalid Medicare Number. Please try again.");
        return false;
    }

    const verifyAge = () => {
        if (age > 0) {
           return true;
        }
        alert("Invalid Age. Please try again.");
        return false;
    }

    const verifyProviderDetails = () => {
        if (verifyEmail() && verifyNumber() && verifyAge()) {
            if (name.length > 0 && username.length > 0 && password.length > 0) {
                return true;
            } 
            alert("Missing/Invalid Details. Please try again");
            return false;
        }
        return false;
    }

    const verifyUserDetails = () => {
        if (verifyEmail() && verifyNumber() && verifyAge() && verifyZip() && verifyStreet() && verifyMedicare()) {
            if (name.length > 0 && username.length > 0 && password.length > 0 && city.length > 0 && state.length > 0) {
                return true;
            } 
            alert("Missing/Invalid Details. Please try again");
            return false;
        }
        return false;
    }

    const handleRegister = async () => {        
        if (password !== repeatPassword) {
            alert("Passwords don't match. Please re-enter the correct password.");
        } else if (!checkTermsAndConditions()) {
            alert("Please check the Terms and Conditions before signing up.");
        } else {
            setPhoneNumber(parseInt(phonenumber), 10);
            setMedicare(parseInt(medicare), 10);

            let fullAddress = street + ", " + city + ", " + state + ", " + zip;

            try {
                if(userType === 'Elderly' && verifyUserDetails()) {
                    await axios.post('http://localhost:8080/signup-user', {
                        name: name,
                        username: username,
                        phoneNumber: phonenumber,
                        age: age,
                        address: fullAddress,
                        medicareNumber: medicare,
                        email: email,
                        password: password
                    });
                    navigate("/login");
                } else if(userType === 'Caregiver' && verifyProviderDetails()) {
                    await axios.post('http://localhost:8080/signup-provider', {
                        name: name,
                        username: username,
                        phoneNumber: phonenumber,
                        age: age,
                        email: email,
                        password: password,
                    });
                    navigate("/login");
                }
            } catch (error) {
                alert('Something went wrong. Try again');
            }
        }
    }

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        clearData();
    }

    const checkTermsAndConditions = () => {
        const tc_checked = document.getElementById('tc').checked;
        return tc_checked;
    }

    const openTermsAndConditions = () => {
        navigate("/terms-and-conditions");
    }

    return (
        <div className="register-screen-container">
            <Header type={"login"} loggedIn={false} elder={false} />
            <div className='register-screen-content'>
                <div className='register-image-box'></div>
                <div className='register-content-box'>
                    <div className='registration-box'>
                        <div className='register-credentials-box'>

                            <div className='frame-235'>
                                <div className='frame-8'>
                                    <p className='create-account-title'>Create an account</p>
                                </div>
                            </div>

                            <div className='radio-buttons'>
                                <label className='radio-button-content'>
                                    <input className='radio-button-style' 
                                        type="radio" 
                                        value="Elderly" 
                                        checked={userType === 'Elderly'}
                                        onChange={handleUserTypeChange} 
                                    />
                                    Elderly
                                </label>
                                <label className='radio-button-content'>
                                    <input className='radio-button-style'
                                        type="radio" 
                                        value="Caregiver" 
                                        checked={userType === 'Caregiver'}
                                        onChange={handleUserTypeChange} 
                                    />
                                    Caregiver
                                </label>
                            </div>

                            <div className='input-fields'>
                                <div className='name-field'>
                                    <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                        <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                            <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Name</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                        </div>
                                        <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type="text" 
                                                placeholder="Name"
                                                value = {name}
                                                onChange={e => setName(e.target.value)}>
                                        </input>
                                    </div>
                                </div>
                        
                                <div className='username-field'>
                                    <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                        <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                            <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Username</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                        </div>
                                        <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type="text" 
                                                placeholder="Username"
                                                value = {username}
                                                onChange={e => setUsername(e.target.value)}>
                                        </input>
                                    </div>
                                </div>

                                <div className='phone-number-field'>
                                    <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                        <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                            <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Phone Number</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                        </div>
                                        <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type="number" 
                                                placeholder="Phone Number"
                                                value = {phonenumber}
                                                onChange={e => setPhoneNumber(e.target.value)}>
                                        </input>
                                    </div>
                                </div>

                                <div className='age-field'>
                                    <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                        <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                            <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Age</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                        </div>
                                        <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type="number" 
                                                placeholder="Age"
                                                value = {age}
                                                onChange={e => setAge(e.target.value)}>
                                        </input>
                                    </div>
                                </div>

                                { userType === "Elderly" &&
                                    <>
                                        <div className='street-field'>
                                            <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                                <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                                    <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Street Address</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                                </div>
                                                <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                        type="text" 
                                                        placeholder="Street Address"
                                                        value = {street}
                                                        onChange={e => setStreet(e.target.value)}>
                                                </input>
                                            </div>
                                        </div>

                                        <div className='state-field'>
                                            <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                                <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                                    <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>State</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                                </div>
                                                <select onChange={e => setState(e.target.value)} style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} >
                                                    <option value="" disabled selected>Select a state</option>
                                                    {australianStates.map((state, index) => (
                                                        <option key={index} value={state}>
                                                            {state}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className='city-field'>
                                            <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                                <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                                    <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>City</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                                </div>
                                                <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                        type="text" 
                                                        placeholder="City"
                                                        value = {city}
                                                        onChange={e => setCity(e.target.value)}>
                                                </input>
                                            </div>
                                        </div>

                                        <div className='zip-field'>
                                            <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                                <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                                    <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Zip/Postcode</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                                </div>
                                                <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                        type="number" 
                                                        placeholder="ZIP/Postcode"
                                                        value = {zip}
                                                        onChange={e => setZip(e.target.value)}>
                                                </input>
                                            </div>
                                        </div>
                        
                                        <div className='medicare-number-field'>
                                            <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                                <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                                    <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Medicare Number</span></div>
                                                </div>
                                                <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                        type="number" 
                                                        placeholder="Medicare Number"
                                                        value = {medicare}
                                                        onChange={e => setMedicare(e.target.value)}>
                                                </input>
                                            </div>
                                        </div>
                                    </>
                                }
                                
                                <div className='email-field'>
                                    <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                        <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                            <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Email</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                        </div>
                                        <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type="email" 
                                                placeholder="Email"
                                                value = {email}
                                                onChange={e => setEmail(e.target.value)}>
                                        </input>
                                    </div>
                                </div>
                
                                <div className='password-field'>
                                    <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                        <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                            <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Password</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                        </div>
                                        <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type="password" 
                                                placeholder="Password"
                                                value = {password}
                                                onChange={e => setPassword(e.target.value)}>
                                        </input>
                                    </div>
                                </div>                          
                                <div className='re-enter-password-field'>
                                    <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                        <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                            <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Re-Enter Password</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                        </div>
                                        <input style={{width: 700, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type="password" 
                                                placeholder="Re-Enter Password"
                                                onChange={e => setRepeatPassword(e.target.value)}>
                                        </input>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                        <div className='agree-tcs-check'>
                            <input type='checkbox' id='tc' />
                            <p>By signing up you agree to our <a href='#!' onClick={openTermsAndConditions}>Terms and Conditions</a></p>
                        </div>
                        <Button className="create-account-button btn-secondary" onClick={handleRegister}>Create an account</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    
}

export default Register;
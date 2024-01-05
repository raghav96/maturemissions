/**
 * File: Login.jsx
 * Description: Component for user login functionality.
 */

import React, { useState } from 'react';
import "./index.css";
import Hide from "../../images/hide.png";
import Visible from "../../images/visible.png";
import Header from '../../Components/header';
import Footer from '../../Components/footer';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {

    localStorage.clear();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password,
            });
    
            const response1 = await axios.get('http://localhost:8080/getUserById', {
                params: {
                    userId: response.data.userId
                },
                headers: {"Authorization" : `Bearer ${response.data.jwtToken}`},
                withCredentials: true
            });

            if (response1.data.user.active) {
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('token', response.data.jwtToken);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('userRole', response.data.role);
                localStorage.setItem('active', response1.data.user.active);
                localStorage.setItem('userImage', response1.data.user.imageLoc);
                
                const userRole = localStorage.getItem('userRole');
                if(userRole === 'ROLE_USER') {
                    navigate("/elderly")
                } else if(userRole === 'ROLE_PROVIDER') {
                    navigate("/caregiver")
                } else {
                    localStorage.clear();
                    alert("Invalid User");
                }

            } else {
                alert("Invalid User");
            }

        } catch (error) {
            alert('Invalid username or password');
        }
        
    };

    return (
        <div className="login-screen-container">
            <Header type={"register"} loggedIn={false} elder={false} />
            <div className='login-screen-content'>
                <div className='image-box'></div>
                <div className='content-box'>
                    <div className='login-box'>
                        <div className='credentials-box'>

                            <div className='frame-235'>
                                <div className='frame-8'>
                                    <p className='login-title'>Log In</p>
                                </div>
                            </div>

                            <div className='frame-303'>

                                <div style={{height: 87, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
                                    <div style={{paddingBottom: 5, paddingRight: 353, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                        <div><span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Username</span><span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}> *</span></div>
                                    </div>
                                    <input style={{width: 580, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                            type="text" 
                                            placeholder="Username"
                                            value = {username}
                                            onChange={e => setUsername(e.target.value)}>
                                    </input>
                                </div>

                                <div className='frame-302'>
                                    <div className='frame-286'>

                                        <div className='frame-243'>
                                            <div>
                                                <span style={{color: '#666666', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>Password </span>
                                                <span style={{color: '#FF0000', fontSize: 16, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>*</span>
                                            </div>
                                            <div style={{width: 73, height: 27, position: 'relative'}}>
                                                <span className='hide-icon-box' onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <img alt='' style={{width: '25px', height: '25px', viewBox: '0px 0px 19px 17px', fill: 'none'}} src={Visible}></img> : <img alt='' style={{width: '25px', height: '25px', viewBox: '0px 0px 19px 17px', fill: 'none'}} src={Hide}></img>}
                                                </span>
                                            </div>
                                        </div>

                                        <input style={{width: 580, height: 56, padding: 12, position: 'relative', borderRadius: 12, border: '1px #666666 solid'}} 
                                                type={showPassword ? "text" : "password"} 
                                                placeholder="Password"
                                                value = {password}
                                                onChange={e => setPassword(e.target.value)}>
                                        </input>
                                    
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                        <Button className="login-button btn-secondary" onClick={handleLogin}>Log In</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default Login;



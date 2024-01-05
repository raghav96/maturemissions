/**
 * File: About.jsx
 * Description: About component displaying information about the organization and its mission.
 */

import React, { Component } from 'react';
import "./index.css";
import Header from '../../Components/header'; 
import Footer from '../../Components/footer'; 

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRole: localStorage.getItem('userRole')
        }
    }

    /**
     * Renders the appropriate header based on the user's role.
     */
    renderHeader(userRole) {
        switch (userRole) {
            case 'ROLE_USER':
                return <Header type={"elderly"} loggedIn={true} elder={true} />;
            case 'ROLE_PROVIDER':
                return <Header type={"caregiver"} loggedIn={true} elder={false} />;
            default:
                return <Header type={"guest"} loggedIn={false} elder={false} />;
        }
    }

    render() {
        return (
            <div className="about-component">
                <div className='about-content'>
                    {this.renderHeader(this.state.userRole)}
                    <div className='about-container'>
                        <div className='about'>ABOUT US</div>
                        <div className='about-description'>
                            <p className='description'>
                                Welcome to <b>Mature Missions</b>, where compassionate care meets the needs of our elderly community. We are dedicated to enhancing the lives of seniors through personalized services that prioritize well-being, companionship, and a dignified aging experience.
                                <br></br><br></br>
                                At <b>Mature Missions</b>, we are driven by a profound understanding of the unique journey that seniors undertake. Our journey began with a clear mission: to revolutionize elderly care by infusing every interaction with empathy, respect, and unwavering dedication.
                                <br></br><br></br>
                                Our team of experienced caregivers embodies this mission, infusing each day with warmth, expertise, and heartfelt companionship. Beyond being professionals, our caregivers are companions who build genuine connections and understand the nuances of elderly needs.
                                <br></br><br></br>
                                Our services are thoughtfully crafted to cover a wide spectrum of needs. From personal care that promotes comfort and hygiene to joyful companionship that alleviates loneliness, our caregivers are committed to making every moment meaningful. We recognize that every individual's journey is unique, and our care plans are tailored to honor those individual preferences and requirements.
                                <br></br><br></br>
                                <b>Mature Missions</b> is more than just a care assistance service; we are your trusted partner in the pursuit of aging gracefully. We acknowledge that the later stages of life can present challenges, and we are here to navigate them together. Upholding safety, dignity, and the essence of quality living, we provide families with the peace of mind that their loved ones are in the best of hands.
                                <br></br><br></br>
                                As you explore <b>Mature Missions</b>, you will find that our mission echoes through every facet of our work. From the careful selection of caregivers to the ongoing communication with families, our commitment radiates. Join us in reshaping elderly care – let's co-create a future where every senior experiences the comfort, respect, and companionship they rightfully deserve.
                            </p>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
    
}

export default About;
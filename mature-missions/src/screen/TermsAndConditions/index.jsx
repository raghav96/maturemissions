/**
 * File: TermsAndConditions.jsx
 * Description: Component for displaying terms and conditions.
 */

import React from 'react';
import "./index.css"; 
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="tc-container">
            <div className='tc-box'>
                <div className='tc-title'>
                    <p className='title'>Mature Missions<p className='subtitle'>Rewarding kindness towards the elderly</p></p>     
                </div>
                <div className='tc-body'>
                    <p className='tc-heading'>Terms and Conditions</p>
                    <p className='tc-agreement'>Your Agreement</p>
                    <div className='tc-data'>
                        <p>
                            1. Acceptance of Terms: By accessing or using Mature Missions, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services. 
                            <br></br><br></br>
                            2. Description of Services Mature Missions provides a platform that connects elderly individuals in need of caregiving services with compassionate caregivers offering various essential services. These services may include, but are not limited to, meal preparation, housekeeping, companionship, and more. 
                            <br></br><br></br>
                            3. Eligibility You must be at least 18 years old to use Mature Missions. By using our services, you represent and warrant that you meet this age requirement. 
                            <br></br><br></br>
                            4. Caregiver Services 
                            <br></br>
                            a. Caregiver Registration: 
                            Caregivers seeking to offer their services through Mature Missions must register and provide accurate information about their qualifications and services. 
                            <br></br>
                            b. Compensation: 
                            Mature Missions ensures that caregivers receive fair compensation for their services, and payment terms will be outlined in separate agreements between caregivers and clients. 
                            <br></br><br></br>
                            5. Client Services 
                            <br></br>
                            a. Client Registration: 
                            Clients in need of caregiving services must register and provide accurate information about their needs and preferences. 
                            <br></br>
                            b. Service Selection: 
                            Clients can choose from a range of caregiving services available on our platform. 
                            <br></br><br></br> 
                            6. Payment and Financial Terms 
                            <br></br>
                            a. Payment: 
                            Clients agree to pay for caregiving services as agreed upon with caregivers. Mature Missions may facilitate payment processing but is not responsible for financial transactions between clients and caregivers. 
                            <br></br><br></br>
                            7. Privacy and Data Security Mature Missions respects your privacy and is committed to protecting your personal information. Our Privacy Policy governs the collection, use, and storage of your data. 
                            <br></br><br></br>
                            8. Intellectual Property All content, trademarks, and intellectual property on Mature Missions are the property of Mature Missions. Users may not reproduce, distribute, or modify any content without prior written consent. 
                            <br></br><br></br>
                            9. Termination Mature Missions reserves the right to terminate or suspend user accounts for violations of these Terms and Conditions or for any other reason deemed necessary. 
                            <br></br><br></br>
                            10. Limitation of Liability Mature Missions is not liable for any disputes between clients and caregivers or for the quality of services provided. We are a platform connecting users, and we do not endorse or guarantee the services offered. 
                            <br></br><br></br>
                            11. Governing Law These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles. 
                            <br></br><br></br>
                            12. Changes to Terms and Conditions Mature Missions reserves the right to update or modify these Terms and Conditions at any time. Users will be notified of any changes, and continued use of the platform constitutes acceptance of the updated terms. 
                            <br></br><br></br>
                            13. Contact Information: For questions or concerns regarding these Terms and Conditions, please contact us at [Your Contact Information]. 
                            <br></br><br></br>
                            By using Mature Missions, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
                        </p>
                    </div>
                    <div className='go-back-btn'>
                        <button className='btn' id='primary' onClick={() => goBack()}>Go Back</button>  
                    </div>   
                </div>
            </div>
        </div>
    );
}

export default TermsAndConditions;
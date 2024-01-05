/* 
    File: Footer.jsx
    Description: Footer component for the application.
*/

import React from 'react';
import "./index.css";

function Footer() {
    return (
        // Footer component containing links to About Us and Terms and Conditions pages.
        <div className="footer-component">
            <div className='footer-items'>
                {/* Link to the About Us page */}
                <a href='/about'>About Us</a>
                {/* Link to the Terms and Conditions page */}
                <a href='/terms-and-conditions'>Terms and Conditions</a>
            </div>
        </div>
    );
}

export default Footer;

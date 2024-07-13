import React from 'react';
import './Privacy.css'

const Privacy = () => {
    return (
        <div className='privacy-page'>
            <div className='privacy-section'>
                <div className='faq-title'>Privacy policy</div>
                <p>We are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our predictive and automated canteen reservation and serving system.</p>

                <h4>Information We Collect</h4>
                <p><strong>Personal Information:</strong> We may collect personal information such as your name, email address, university ID, dietary preferences, and order history.</p>
                <p><strong>Usage Data:</strong> We collect data on how you access and use the system, including device information, IP addresses, browser type, and usage patterns.</p>

                <h4>How We Use Your Information</h4>
                <p><strong>To Provide Services:</strong> We use your personal information to facilitate meal reservations, customize your dining experience, and manage your profile.</p>
                <p><strong>To Improve Our Services:</strong> Usage data helps us understand how users interact with the system, allowing us to enhance features and performance.</p>
                <p><strong>To Communicate:</strong> We may use your contact information to send notifications about your orders, updates, and promotional offers related to the canteen services.</p>
                <p><strong>To Ensure Security:</strong> Information is used to protect the security and integrity of the system and your personal data.</p>

                <h4>Information Sharing and Disclosure</h4>
                <p><strong>With Service Providers:</strong> We may share your information with third-party service providers who assist us in operating the system and providing services.</p>
                <p><strong>For Legal Reasons:</strong> We may disclose your information if required by law or if we believe it is necessary to protect our rights, comply with legal obligations, or protect your safety and the safety of others.</p>
                <p><strong>With Your Consent:</strong> We may share your information with other parties if you provide explicit consent.</p>

                <h4>Data Security</h4>
                <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no security measures are perfect or impenetrable, and we cannot guarantee absolute security.</p>

                <h4>Your Privacy Rights</h4>
                <p><strong>Access and Correction:</strong> You have the right to access and update your personal information. You can review and modify your profile information through the system’s user interface.</p>
                <p><strong>Deletion:</strong> You may request the deletion of your personal information, subject to certain legal exceptions.</p>
                <p><strong>Opt-Out:</strong> You can opt out of receiving promotional communications by following the unsubscribe instructions in the communication or adjusting your settings in the system.</p>

                <h4>Cookies and Tracking Technologies</h4>
                <p>We use cookies and similar tracking technologies to track activity on our system and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of the system.</p>
            </div>
        </div>
    );
};

export default Privacy;
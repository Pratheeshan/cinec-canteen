import React from 'react';
import './FAQ.css'
import Accordion from 'react-bootstrap/Accordion';

const FAQ = () => {
    return (
        <div className='faq-page'>
            <div className="faq-section">
                <div className='faq-title'>Frequently Asked Questions</div>
            </div>
            <Accordion className='faq-section' defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What is the purpose of the predictive and automated canteen reservation and serving system?</Accordion.Header>
                    <Accordion.Body>
                        The system aims to enhance efficiency in campus canteens by reducing wait times, optimizing food preparation, and providing a seamless dining experience for students, staff, and faculty.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How can users pre-order meals using the reservation system?</Accordion.Header>
                    <Accordion.Body>
                        Users can log into the reservation platform via desktop or mobile devices, select their desired meals from the menu, and schedule a pickup time based on their convenience.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>How we get the invoice?</Accordion.Header>
                    <Accordion.Body>
                        You will get invoice in QR format, In collection of the meal scan to complete the order
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>How we get the invoice?</Accordion.Header>
                    <Accordion.Body>
                        You will get invoice in QR format, In collection of the meal scan to complete the order
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>How we get the invoice?</Accordion.Header>
                    <Accordion.Body>
                        You will get invoice in QR format, In collection of the meal scan to complete the order
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>How we get the invoice?</Accordion.Header>
                    <Accordion.Body>
                        You will get invoice in QR format, In collection of the meal scan to complete the order
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default FAQ;
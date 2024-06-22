import React from 'react';
import "./About.css";

const About = () => {
    return (
        <div className="about-page">
            <section className="about-project">
                <img src="Frame.jpg" alt="Dish" className="project-image" />
                <div className="project-info">
                    <h2>About Our <span>Project</span></h2>
                    <p>
                        Welcome to our project website dedicated to showcasing the
                        innovative canteen reservation and serving system designed to
                        revolutionize the dining experience on campus. Learn more about our
                        vision, mission, and the team behind this groundbreaking project.
                        Explore how advanced technologies are harnessed to enhance
                        efficiency, convenience, and user satisfaction in campus dining.
                    </p>
                </div>
            </section>

            <section className="technology-stack">
                <h2>Our <span>Technology</span> Stack</h2>
                <div className="tech-cards">
                    <div className="tech-card">
                        <div className='divservice-img1'>
                            <img
                                className="icon11png"
                                alt=""
                                src="icon11.svg"
                            />
                        </div>
                        <h3>Responsive Front-End Design</h3>
                        <p>
                            Utilizes the latest web technologies to ensure an optimized and
                            seamless user experience across all devices.
                        </p>
                    </div>
                    <div className="tech-card">
                        <div className='divservice-img2'>
                            <img
                                className="icon11png"
                                alt=""
                                src="icon13.svg"
                            />
                        </div>
                        <h3>Data Management with Firebase</h3>
                        <p>
                            The power of Firebase has enabled efficient and scalable data
                            storage and synchronization with our frontend interface.
                        </p>
                    </div>
                    <div className="tech-card">
                        <div className='divservice-img3'>
                            <img
                                className="icon11png"
                                alt=""
                                src="icon12.svg"
                            />
                        </div>
                        <h3>Python-Powered Predictive Analysis</h3>
                        <p>
                            Our system leverages predictive analytics to provide personalized
                            meal options and improve service efficiency.
                        </p>
                    </div>
                </div>
            </section>

            <section className="meet-team">
                <div className="team-member">
                    <div className="member-info">
                        <h2>Meet <span>Our Team</span></h2>
                        <p className="get-to-know">
                            Get to know the talented individuals behind the development of our innovative canteen reservation and serving system. Our team members bring a diverse range of skills and expertise to the table, working collaboratively to bring our vision to life.
                        </p>
                        <p className="name"><b>Pratheeshan Vijayan</b></p>
                        <ul className="mem-details">
                            <li className="role-project-lead">
                                <span>Role: Project Lead</span>
                            </li>
                            <li className="course-bsc-hons-computer-sc">
                                <span>Course: BSc (Hons) Computer Science (Software Engineering) – Top-Up</span>
                            </li>
                            <li className="batch-10">
                                <span>Batch: 10</span>
                            </li>
                            <li>
                                <span>Wolverhampton ID: 2436304</span>
                            </li>
                        </ul>
                    </div>
                    <img src="pratheeshan.png" alt="Pratheesh Vijayan" className="member-image" />
                </div>
            </section>
        </div>
    );
};

export default About;
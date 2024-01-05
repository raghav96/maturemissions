/**
 * File: ServiceDescription.jsx
 * Description: Component for displaying detailed information about different services.
 */

import React, { Component } from 'react';
import "./index.css";
import Header from '../../../Components/header';
import Footer from '../../../Components/footer';
import FAQ from '../../../Components/faq';
import ServiceBooking from '../../../Components/service-booking';

class ServiceDescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            loggedIn: this.props.loggedIn,
            isElderly: this.props.isElderly,
            serviceName: this.props.serviceName,
            userRole: localStorage.getItem('userRole')
        }
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
        }));
    };   

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

    renderSwitch(name) {
        const { showModal } = this.state;
        switch(name) {
            case 'care-assistance':
                return (
                    <div className='services-container'>
                        <div className='service'>CARE ASSISTANCE</div>
                        {this.state.userRole === "ROLE_USER" && <button className='req-btn' onClick={this.toggleModal}>Request Service Now</button>}
                        {showModal && <ServiceBooking service_name="Care Assistance" serviceId={1} />}
                        <div className='service-description'>
                            <p className='about-service'>
                                At Mature Missions, our <b>Care Assistance</b> service is tailored to the unique needs of elderly individuals. Our dedicated caregivers offer a wide range of essential services, including meal preparation, housekeeping, companionship, and more, allowing seniors to maintain their independence and live comfortably in their own homes. We understand the challenges of an aging population and the importance of reliable, affordable care. With Mature Missions, you can access trustworthy caregivers who are committed to enhancing the quality of life for our beloved seniors.
                            </p>
                            <br></br>
                            <p className='why-join'>
                                Why choose Care Assistance:       
                                <br></br>                         
                                <p className='about-service'>
                                    <b>1. Compassionate Caregivers:</b><br></br>At Mature Missions, we take pride in our team of caregivers who are not only highly qualified but also deeply compassionate. Each caregiver undergoes rigorous screening and training to ensure they provide the best possible care. They go beyond mere assistance; they build meaningful connections with seniors, offering companionship and emotional support, making Mature Missions a trusted choice for care assistance.
                                    <br></br><br></br>
                                    <b>2. Personalized Care Plans:</b><br></br>We understand that every senior's needs are unique. That's why we offer personalized care plans tailored to the specific requirements and preferences of each client. Whether it's assistance with daily activities, medication reminders, or simply having a friendly face around, our caregivers adapt to ensure seniors receive the care they deserve. With Mature Missions, you can rest assured that your loved ones are receiving the individualized attention and support they need to thrive in the comfort of their own homes.
                                </p>
                           </p>
                           <br></br>
                        </div>
                        <div class="faq">
                            <p>Frequently Asked Questions:</p>
                            <FAQ question={"What types of services are included in the Care Assistance provided by Mature Missions?"} answer={"Our Care Assistance services encompass a wide range of essential care tasks, including assistance with daily activities, medication reminders, companionship, meal preparation, housekeeping, and more. We tailor our services to meet the individual needs and preferences of our senior clients."} />
                            <FAQ question={"How do I choose the right caregiver for my loved one?"} answer={"We understand the importance of a good caregiver-client match. When you engage our Care Assistance services, we will conduct an assessment to understand your loved one's needs, personality, and preferences. Based on this information, we will match them with a caregiver who has the appropriate skills and temperament to provide the best care."} />
                            <FAQ question={"Is Care Assistance available on a 24/7 basis, or can it be scheduled according to specific hours or days?"} answer={"Our Care Assistance services are flexible and can be scheduled according to your specific requirements. Whether you need round-the-clock care, daily assistance, or care on specific days and hours, we can accommodate your loved one's care schedule. We work to ensure that your loved one receives the care they need when they need it."} />
                        </div>
                    </div>
                );
            case 'meal-preparation':
                return(
                    <div className='services-container'>
                        <div className='service'>MEAL PREPARATION</div>
                        {this.state.userRole === "ROLE_USER" && <button className='req-btn' onClick={this.toggleModal}>Request Service Now</button>}
                        {showModal && <ServiceBooking service_name="Meal Preparation" serviceId={2} />}
                        <div className='service-description'>
                            <p className='about-service'>
                                At Mature Missions, our <b>Meal Preparation</b> service is designed to make sure that seniors not only receive nourishing and delicious meals but also enjoy the process. Our dedicated caregivers take the time to understand dietary preferences and restrictions, creating customized meal plans. We provide more than just sustenance; we deliver a dining experience that promotes well-being and happiness for our cherished seniors, allowing them to savor every bite in the comfort of their own homes.
                            </p>
                            <br></br>
                            <p className='why-join'>
                                Why choose Meal Preparation:
                                <p className='about-service'>
                                    <b>1. Nutritious and Tasty Meals:</b><br></br>Our caregivers are culinary experts who prioritize both nutrition and taste. They craft meals that cater to individual dietary needs while ensuring they are a delight to the senses. Whether it's special dietary requirements or favorite family recipes, we ensure that seniors enjoy their meals while maintaining a balanced diet.
                                    <br></br><br></br>
                                    <b>2. Independence and Convenience:</b><br></br>We understand that meal preparation can become challenging for seniors. Mature Missions' Meal Preparation service not only provides nutritious options but also restores a sense of independence. Seniors can savor their meals without the stress of cooking, ensuring they stay well-fed and content in their homes.
                                </p>
                           </p>
                           <br></br>
                        </div>
                        <div class="faq">
                            <p>Frequently Asked Questions:</p>
                            <FAQ question={"Can I request specific dietary preferences or restrictions for meal preparation?"} answer={"Yes, absolutely. Our caregivers are trained to accommodate various dietary preferences and restrictions. When you sign up for our Meal Preparation service, you can discuss your specific dietary needs, and our caregivers will create customized meal plans to suit your preferences and ensure you receive nutritious and delicious meals."} />
                            <FAQ question={"Are the meals provided by Mature Missions only for seniors, or can they be shared with family members living in the same household?"} answer={"The meals prepared by our caregivers can certainly be enjoyed by other family members living in the same household. Our goal is to make mealtime convenient and enjoyable for everyone. Just let our caregivers know the portion sizes and any special requests, and they will accommodate your family's needs."} />
                            <FAQ question={"How often can I use the Meal Preparation service?"} answer={"You can schedule our Meal Preparation service according to your needs. Whether you require daily assistance, a few times a week, or on a more occasional basis, we are here to help. Our flexible scheduling allows you to choose the frequency that suits you best."} />
                        </div>
                    </div>   
                )
            case 'housekeeping':
                return(
                    <div className='services-container'>
                        <div className='service'>HOUSEKEEPING</div>
                        {this.state.userRole === "ROLE_USER" && <button className='req-btn' onClick={this.toggleModal}>Request Service Now</button>}
                        {showModal && <ServiceBooking service_name="Housekeeping" serviceId={3} />}
                        <div className='service-description'>
                            <p className='about-service'>
                                At Mature Missions, our <b>Housekeeping</b> service is dedicated to creating clean and comfortable living spaces for seniors. Our meticulous caregivers provide thorough cleaning and organization, ensuring a safe and clutter-free environment. We understand the importance of a tidy home, and we take pride in maintaining the highest standards of cleanliness, allowing seniors to live in a welcoming and hygienic setting.
                            </p>
                            <br></br>
                            <p className='why-join'>
                                Why choose Housekeeping:
                                <p className='about-service'>
                                    <b>1. Safety and Comfort:</b><br></br>A clean and organized living space is essential for the safety and well-being of seniors. Our caregivers not only clean but also assess the home for potential hazards. By choosing Mature Missions' Housekeeping service, you're ensuring that your loved ones live in an environment that promotes their physical and emotional comfort.
                                    <br></br><br></br>
                                    <b>2. More Time for Enjoyment:</b><br></br>Housekeeping tasks can be time-consuming and physically demanding. Our service not only maintains a clean home but also frees up valuable time for seniors to engage in activities they love. Whether it's pursuing hobbies, spending time with family, or simply relaxing, our Housekeeping service provides the gift of time and peace of mind.
                                </p>
                                
                           </p>
                           <br></br>
                        </div>
                        <div class="faq">
                            <p>Frequently Asked Questions:</p>
                            <FAQ question={"What types of cleaning services are included in the Housekeeping service?"} answer={"Our Housekeeping service covers a wide range of cleaning tasks, including dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and more. Our caregivers can also assist with laundry, changing linens, and organization to ensure your living space is clean and comfortable."} />
                            <FAQ question={"How long does a typical Housekeeping session last, and can I customize the cleaning tasks?"} answer={"The duration of a Housekeeping session can vary based on the size of your home and your specific cleaning needs. Our caregivers will work with you to create a customized cleaning plan that aligns with your preferences. You can prioritize certain tasks or areas to ensure your home is cleaned to your satisfaction."} />
                            <FAQ question={"Are your caregivers trained in eco-friendly or green cleaning practices?"} answer={"Yes, many of our caregivers are trained in eco-friendly and green cleaning practices. If you have specific preferences for environmentally friendly cleaning products, please let us know, and we will do our best to accommodate your requests."} />
                        </div>
                    </div>
                )
            case 'family-interaction':
                return(
                    <div className='services-container'>
                        <div className='service'>FAMILY INTERACTION</div>
                        {this.state.userRole === "ROLE_USER" && <button className='req-btn' onClick={this.toggleModal}>Request Service Now</button>}
                        {showModal && <ServiceBooking service_name="Family Interaction" serviceId={4} />}
                        <div className='service-description'>
                            <p className='about-service'>
                                At Mature Missions, our <b>Family Interaction</b> service is designed to foster meaningful connections between seniors and their loved ones, even when distance or busy schedules are a challenge. Our caregivers facilitate and support regular family visits, video calls, and quality time spent together, ensuring that the bonds between generations remain strong and cherished.
                            </p>
                            <br></br>
                            <p className='why-join'>
                                Why choose Family Interaction:
                                <p className='about-service'>
                                    <b>1. Strengthening Family Bonds:</b><br></br>Maintaining strong family relationships is vital for the emotional well-being of seniors. Our caregivers not only facilitate family interactions but also create a warm and welcoming atmosphere for visits. We understand that family is at the heart of our seniors' lives, and our service aims to make every moment spent together special and memorable.
                                    <br></br><br></br>
                                    <b>2. Peace of Mind for Families:</b><br></br>For families with busy schedules or when geographical distances separate them from their senior loved ones, our Family Interaction service provides peace of mind. We ensure that seniors receive the love and attention they need from their families, promoting emotional well-being and happiness.
                                </p>
                           </p>
                           <br></br>
                        </div>
                        <div class="faq">
                            <p>Frequently Asked Questions:</p>
                            <FAQ question={"How can Mature Missions facilitate family interactions when family members live far away from their senior loved ones?"} answer={"We understand that distance can be a challenge. Mature Missions offers various solutions, including video calls, virtual family gatherings, and the coordination of visits for family members who can travel to spend time with their senior loved ones. Our goal is to ensure that family connections remain strong, even when physical distance separates you."} />
                            <FAQ question={"Can I schedule regular family visits through Mature Missions?"} answer={"Yes, you can schedule regular family visits with the assistance of our caregivers. We work with you to create a visitation schedule that aligns with your family's availability and preferences. Our caregivers can also help plan and organize special family events and celebrations."} />
                            <FAQ question={"What if there are language or communication barriers between seniors and family members?"} answer={"Our caregivers are trained to handle diverse communication needs. If language barriers exist, we can provide caregivers who are fluent in multiple languages or arrange for translation services. Our goal is to ensure that seniors and their family members can communicate effectively and share meaningful moments."} />
                        </div>
                    </div>
                )
            case 'mobility-support':
                return(
                    <div className='services-container'>
                        <div className='service'>MOBILITY SUPPORT</div>
                        {this.state.userRole === "ROLE_USER" && <button className='req-btn' onClick={this.toggleModal}>Request Service Now</button>}
                        {showModal && <ServiceBooking service_name="Mobility Support" serviceId={5} />}
                        <div className='service-description'>
                            <p className='about-service'>
                                At Mature Missions, our <b>Mobility Support</b> service is dedicated to ensuring that seniors enjoy freedom of movement and independence. Our caregivers provide physical assistance, mobility aids, and exercise routines tailored to individual needs. We understand the significance of maintaining mobility, and we are committed to helping seniors lead active and fulfilling lives in their own homes.
                            </p>
                            <br></br>
                            <p className='why-join'>
                                Why choose Mobility Support:
                                <p className='about-service'>
                                    <b>1. Enhancing Independence:</b><br></br>Mobility challenges can be a significant hurdle for seniors. Our caregivers are trained to provide the necessary support, whether it's assistance with walking, transfers, or mobility exercises. By choosing our Mobility Support service, seniors regain their independence and enjoy a higher quality of life.
                                    <br></br><br></br>
                                    <b>2. Customized Care Plans:</b><br></br>We recognize that mobility needs vary from person to person. Our service offers personalized care plans that address specific mobility challenges and goals. We work closely with seniors to create a plan that helps them achieve and maintain the level of mobility they desire, ensuring they can continue to engage in the activities they love.
                                </p>
                           </p>
                           <br></br>
                        </div>
                        <div class="faq">
                            <p>Frequently Asked Questions:</p>
                            <FAQ question={"What types of mobility support services do you offer?"} answer={"We offer a comprehensive range of mobility support services, including assistance with walking, transfers, exercises to improve strength and balance, and the use of mobility aids such as walkers or wheelchairs. Our caregivers work closely with seniors to determine their specific mobility needs and goals."} />
                            <FAQ question={"How do you ensure the safety of seniors during mobility assistance?"} answer={"Safety is our top priority. Our caregivers are trained in proper lifting and transfer techniques to minimize the risk of injury. Additionally, we conduct home assessments to identify and address potential hazards that could affect mobility. We work closely with seniors to ensure that their mobility support is provided safely and comfortably."} />
                            <FAQ question={"Is mobility support a long-term commitment, or can it be arranged on an as-needed basis?"} answer={"Mobility support can be tailored to your needs. Whether you require short-term assistance after an injury or surgery or ongoing support to maintain mobility, our services are flexible. We work with you to create a care plan that suits your specific requirements."} />
                        </div>
                    </div>
            )
            case 'social-outgoings':
                return(
                    <div className='services-container'>
                        <div className='service'>SOCIAL OUTGOINGS</div>
                        {this.state.userRole === "ROLE_USER" && <button className='req-btn' onClick={this.toggleModal}>Request Service Now</button>}
                        {showModal && <ServiceBooking service_name="Social Outgoings" serviceId={6} />}
                        <div className='service-description'>
                            <p className='about-service'>
                                At Mature Missions, our <b>Social Outgoings</b> service is all about enriching the lives of seniors by providing opportunities for social engagement and meaningful experiences. Our caregivers organize outings, activities, and events tailored to seniors' interests, allowing them to connect with peers, explore new interests, and maintain an active social life. We understand the importance of staying connected to the community, and our service is designed to promote a fulfilling and vibrant lifestyle for our senior clients.
                            </p>
                            <br></br>
                            <p className='why-join'>
                                Why choose Social Outgoings:
                                <p className='about-service'>
                                    <b>1. Community Engagement:</b><br></br>Staying connected to the community is essential for seniors' mental and emotional well-being. Our Social Outgoings service offers a variety of opportunities for seniors to engage with others, participate in community events, and enjoy a sense of belonging.
                                    <br></br><br></br>
                                    <b>2. Personalized Activities:</b><br></br>We take the time to get to know our senior clients and their interests. Our caregivers curate outings and activities that align with each individual's preferences, ensuring that every experience is enjoyable and meaningful. Whether it's cultural events, nature outings, or group activities, our service is tailored to enrich the lives of our senior clients in ways that resonate with them.
                                </p>
                           </p>
                           <br></br>
                        </div>
                        <div class="faq">
                            <p>Frequently Asked Questions:</p>
                            <FAQ question={"What types of social outings and activities are offered through Social Outgoings?"} answer={"We offer a diverse range of social outings and activities based on seniors' interests. These can include trips to local attractions, cultural events, group excursions, hobby clubs, and more. We work closely with seniors to plan outings that align with their preferences."} />
                            <FAQ question={"How are the costs of social outings and activities covered?"} answer={"The costs of social outings and activities may vary depending on the nature of the event. Some outings may be covered by Mature Missions, while others may require a nominal fee. We will provide you with details on the costs associated with each outing in advance, so you can make informed choices."} />
                            <FAQ question={"Can family members or friends join seniors on social outings?"} answer={"Yes, family members and friends are welcome to join seniors on social outings, fostering a sense of togetherness and enjoyment. We encourage social engagement and believe that sharing experiences with loved ones can enhance the overall enjoyment of the outings."} />
                        </div>
                    </div>
            )
            default:
                return ( <></> )
        }
    }

    render() {
        return (
            <div className="services-component">
                <div className='services-content'>
                    {this.renderHeader(this.state.userRole)}
                    {this.renderSwitch(this.state.serviceName)}
                    <Footer />
                </div>
            </div>
        );
    }
    
}

export default ServiceDescription;
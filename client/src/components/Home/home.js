import React from 'react';
import Jumbotron from '../Jumbotron/jumbotron';
import Courses from '../Courses/courses';
import Us from '../Us/us';
import ContactUs from '../widgets/ContactUs/contactUs';

const Home = () => {
    return (
        <div>
            <Jumbotron type='home'/>
            <Courses/>
            <Us/>
            <ContactUs/>
        </div>
    );
};

export default Home;
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Jumbotron from '../Jumbotron/jumbotron';
import Courses from '../Courses/courses';
import { getCourses} from '../../actions';
import Us from '../Us/us';
import ContactUs from '../widgets/ContactUs/contactUs';

const Home = (props) => {

    useEffect(()=>{
        props.getCourses();
    },[props])
    
    return (
        <div>
            <Jumbotron auth={props.user} type='home'/>
            <Courses courses={props.courses} />
            <Us/>
            <ContactUs/>
        </div>
    );
};

const matchStateToProps=(state)=>{
    return {
        courses:state.courses
    }
}

const matchDispatchToProps=(dispatch)=>{
    return bindActionCreators({getCourses},dispatch);
}

Home.propTypes={
    courses:PropTypes.object,
    getCourses:PropTypes.func
}

export default connect(matchStateToProps,matchDispatchToProps)(Home);
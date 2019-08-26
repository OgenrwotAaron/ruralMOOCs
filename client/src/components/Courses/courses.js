import React from 'react';
import {Link} from 'react-router-dom'

import Card from '../widgets/Cards/cards';

const Courses = () => {
    return (
        <div style={{textAlign:'center'}}>
            <div  style={{backgroundColor:'#337ab7',margin:'0',padding:'5%',borderRadius:'0 0 100% 100%'}}>
            <h1 data-aos="fade-in" data-aos-duration="500">Availabble MOOCs</h1>
            </div>
            <div className='row' style={{width:'100%', marginLeft:'0',color:'#1e486d'}}>
                <div className='col-sm-4'>
                    <Link to='/'>
                        <Card/>
                    </Link>
                </div>
                <div className='col-sm-4'>
                    <Link to='/'>
                        <Card/>
                    </Link>
                </div>
                <div className='col-sm-4'>
                    <Link to='/'>
                        <Card/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Courses;
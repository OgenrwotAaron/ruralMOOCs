import React from 'react';
import {Link} from 'react-router-dom';

import Card from '../widgets/Cards/cards';

const Courses =(props)=>{
    let { courses } = props.courses;

    if(!courses){
        return (
            <div style={{textAlign:'center'}}>
                <h3>Loading...</h3>
            </div>
        );
    }

    const renderCourses=(data)=>{
       return data.slice(0,3).map((item,i)=>
            (
            <div key={i}>
                <div className='col-sm-4'>
                    <Link to={`/course/${item._id}`}>
                        <Card {...props} item={item}/>
                    </Link>
                </div>
            </div>
            )
        )
    }

    return (
        <div style={{textAlign:'center'}}>
            <div  style={{margin:'0'}}>
            <h1 style={{color:'#163550',marginBottom:'0'}} data-aos="fade-in" data-aos-duration="500">Available MOOCs</h1>
            <hr style={{borderTop:'2px solid #1e486d',width:'8%',marginTop:'0'}}/>
            </div>
            <div className='row' style={{width:'100%', marginLeft:'0',color:'#1e486d'}}>
                {renderCourses(courses)}
            </div>
            <div style={{color:'#337ab7',margin:'25px',fontSize:'18px'}}>
                <Link to='/category'>View All...</Link>
            </div>
        </div>
    );
};

export default Courses;
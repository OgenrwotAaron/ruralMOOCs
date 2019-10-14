import React from 'react';

const InstructorCard = (props) => {

    return ( 
        <div className='card' style={{textAlign:'center',padding:'10px',margin:'10px',border:'1px solid #e4dcdc',borderRadius:'5px'}}>
            <b style={{color:'#555',fontSize:'18px'}}>Course Instructor</b>
            <hr/>
            <img alt='instructor' src='/images/agriculture.jpg' style={{width:'50px',height:'50px',borderRadius:'50%'}}/>
            <p style={{color:'#555',fontWeight:'bold',fontSize:'18px',margin:'0'}}>instructor</p>
            <p style={{color:'#5f5e5e',fontSize:'16px',margin:'0'}}> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
    );
}
 
export default InstructorCard;
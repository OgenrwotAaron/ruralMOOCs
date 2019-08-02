import React from 'react';

const Card = () => {
    return (
        <div data-aos="fade-up" data-aos-duration="500" className='cards'>
            <div style={{background:'white',marginTop:'25px',border:'1px solid #343a4030',borderTop:'0',paddingBottom:'20px'}}>
                <img className='img-responsive' alt='card' src='/images/card.jpg'/>
                <h2>Course Name</h2>
                <p style={{color:'gray'}}>Description</p>
                <div>Duration</div>
                <div>Instructor</div>
            </div>
        </div>
    );
};

export default Card;
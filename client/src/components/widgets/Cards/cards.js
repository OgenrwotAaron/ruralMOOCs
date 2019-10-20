import React from 'react';

const Card = ({item}) => {
    return (
        <div data-aos="fade-up" data-aos-duration="500" className='cards'>
            <div style={{background:'white',marginTop:'25px',border:'1px solid #343a4030',borderTop:'0',paddingBottom:'20px'}}>
                <img className='img-responsive' alt='card' src={`/api/image/${item.filename}`}/>
                <h2>{item.metadata.course}</h2>
                <p style={{color:'gray'}}>{item.metadata.description}</p>
                <div>{item.metadata.duration}</div>
                <div>{item.metadata.instructor}</div>
            </div>
        </div>
    );
};

export default Card;
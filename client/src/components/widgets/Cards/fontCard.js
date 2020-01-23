import React from 'react';

const FontCard = (props) => {
    return (
        <div>
            <div data-aos="fade-up" data-aos-duration="800" style={{color:'white',textAlign:'center'}}>
                <div>
                    <span style={{color:'#dcdcdc',fontSize:'100px'}} className={`icon icon-${props.icon}`}></span>
                </div>
                <div>
                <div><h1>{props.title}</h1></div>
                    <p style={{color:'#dcdcdc'}}>{props.details}</p>
                </div>
            </div>
        </div>
    );
};

export default FontCard;
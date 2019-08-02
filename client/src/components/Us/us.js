import React from 'react';
import FontCard from '../widgets/Cards/fontCard';

const Us = () => {
    return (
        <div>
            <h1 style={{color:'#1e486d',textAlign:'center',marginBottom:'0'}}>About Us</h1>
            <hr style={{borderTop:'2px solid #1e486d',width:'5%',marginTop:'0'}}/>
            <div className='row' style={{margin:'0',width:'100%'}}>
                <h2 style={{paddingLeft:'10px'}}>
                    We strive for the success in educating people in the rural areas globally
                </h2>
                <div className='col-xs-4'>
                   <FontCard/> 
                </div>
                <div className='col-xs-4'>
                   <FontCard/> 
                </div>
                <div className='col-xs-4'>
                   <FontCard/> 
                </div>
            </div>
        </div>
    );
};

export default Us;
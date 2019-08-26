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
                <div className='col-xs-6'>
                   <FontCard title='Mission' details='To increase access to high-quality education for everyone everywhere, focusing on those living in low bandwidth areas of the developing countries.'/> 
                </div>
                <div className='col-xs-6'>
                   <FontCard title='Our Difference' details='The traditional content access method for MOOCs through high speed Internet and constant connectivity is not realistic to many developing countries especially those in Africa even in the near future. This platform delivers content to students under low bandwidth environments.'/> 
                </div>
            </div>
        </div>
    );
};

export default Us;
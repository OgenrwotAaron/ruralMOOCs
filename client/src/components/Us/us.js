import React from 'react';
import FontCard from '../widgets/Cards/fontCard';

const Us = () => {
    return (
        <div style={{backgroundImage:'url("/images/economics.jpg")',backroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'bottom',backgroundAttachment:'fixed'}}>
            <div style={{background:'linear-gradient(to top, black, #000713d1)',paddingTop:'10px'}}>
                <h1 style={{color:'whitesmoke',textAlign:'center',marginBottom:'0'}}>About Us</h1>
                <hr style={{borderTop:'2px solid whitesmoke',width:'5%',marginTop:'0'}}/>
                <div className='row' style={{margin:'0',width:'100%'}}>
                    <h2 style={{padding:'10px',textAlign:'center',fontSize:'18px',fontWeight:'100'}}>
                        We strive for the success in educating people in the rural areas globally
                    </h2>
                    <div className='col-sm-6'>
                    <FontCard icon='bullseye' title='Mission' details='To increase access to high-quality education for everyone everywhere, focusing on those living in low bandwidth areas of the developing countries.'/> 
                    </div>
                    <div className='col-sm-6'>
                    <FontCard icon='compare' title='Our Difference' details='The traditional content access method for MOOCs through high speed Internet and constant connectivity is not realistic to many developing countries especially those in Africa even in the near future. This platform delivers content to students under low bandwidth environments.'/> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Us;
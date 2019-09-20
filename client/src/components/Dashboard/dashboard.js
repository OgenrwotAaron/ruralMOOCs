import React from 'react';
import SideNav from '../widgets/SideNav/sideNav';
const Dashboard =()=>{
    return(
        <div 
            style={{
                backgroundImage:'url("/images/hero.jpg")',
                height:'100vh',
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                backgroundAttachment:'fixed'
            }}
        >
            <div style={{background:'rgba(7,6,28,0.88)',height:'100%'}}>
                <div className='row' style={{width:'100%'}}>
                    <div className='col-sm-3'>
                        <SideNav/>
                    </div>
                    <div className='col-sm-9'>

                    </div>
                </div> 
            </div>
            
        </div>
    )
}

export default Dashboard;
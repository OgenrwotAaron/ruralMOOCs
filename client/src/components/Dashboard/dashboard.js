import React from 'react';
import SideNav from '../widgets/SideNav/sideNav';
const Dashboard =()=>{
    return(
        <div>
            <div className='row'>
                <div className='col-sm-4'>
                    <SideNav/>
                </div>
                <div className='col-sm-8'></div>
            </div>
        </div>
    )
}

export default Dashboard;
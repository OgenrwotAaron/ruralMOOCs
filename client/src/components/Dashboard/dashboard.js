import React,{ useEffect } from 'react';

import SideNav from '../widgets/SideNav/sideNav';
import DashCourse from '../widgets/DashCourse/dashCourse';
import DashStudent from '../widgets/DashStudent/dashStudent';
import DashInstructor from '../widgets/DashInstructor/dashInstructor';
import DashFeeds from '../widgets/DashFeeds/dashFeeds';
import DashMail from '../widgets/DashMail/dashMail';
import DashDefault from '../widgets/DashDefault/dashDefault';
import DashMessage from '../widgets/DashMessage/dashMessage';
import DashProgram from '../widgets/DashProgram/dashProgram';

const Dashboard =(props)=>{

    useEffect(()=>{

    },[props])

    const renderDashboard=()=>{
        let template=null;

        switch (props.match.params.id) {
            case 'programs':
                template=(
                    <DashProgram/>
                );
                break;
            case 'courses':
                template=(
                    <DashCourse {...props}/>
                );
                break;
            
            case 'students':
                template=(
                    <DashStudent {...props} student={[]}/>
                )
                break;

            case 'instructors':
                template=(
                    <DashInstructor {...props}/>
                )
                break;

            case 'feeds':
                template=(
                    <DashFeeds/>
                )
                break;

            case 'mail':
                template=(
                    <DashMail/>
                )
                break;
            case 'message':
                template=(
                    <DashMessage {...props}/>
                )
                break;
        
            default:
                template=(
                    <DashDefault {...props}/>
                )
                break;
        }

        return template;
    }

    return(
        <div 
            style={{
                backgroundImage:'url("/images/hero.jpg")',
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                backgroundAttachment:'fixed'
            }}
        >
            <div style={{background:'white',height:'100%'}}>
                <div className='row' style={{width:'100%'}}>
                    <div className='col-sm-3'>
                        <div style={{padding:'32% 0 0 0'}}>
                            <SideNav user={props.user.user}/>
                        </div>
                    </div>
                    {renderDashboard()}
                </div> 
            </div>
            
        </div>
    )
}

export default Dashboard;
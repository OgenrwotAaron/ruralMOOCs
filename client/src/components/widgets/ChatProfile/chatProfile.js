import React from 'react';
import { Link } from 'react-router-dom'

const ChatProfile = (props) => {
    if(!props.receiver){
        return null;
    }

    return ( 
        <div data-aos="fade-up" data-aos-duration="500" style={{paddingBottom:'20px'}}>
            <div style={{
                height:'80px',
                width:'80px',
                overflow:'hidden',
                backgroundImage:`${props.receiver.avatar? props.receiver.avatar:'url(/images/coverProfile.jpg)'}`,
                borderRadius:'50%',
                border:'solid 2px #f3f3f3',
                margin:'auto',
                backgroundSize:'cover'
                }}>
                
            </div>
            <div style={{textAlign:'center'}}>
                <Link to={`/user-profile/${props.receiver.id}`}>
                    <h2 style={{color:'#4c4c4c',margin:'0',fontWeight:'300'}}>{props.receiver.fname} {props.receiver.lname}</h2>
                </Link>
                <div style={{color:'#6d6d6d',fontSize:'15px'}}>{props.receiver.email}</div>
                <div style={{color:'#6d6d6d',fontSize:'15px'}}>{props.receiver.phone}</div>
            </div>
        </div>
     );
}
 
export default ChatProfile;
import React from 'react';
import { Link } from 'react-router-dom'

const OnlineUsers = ({receiver}) => {
    return ( 
        <Link to={`/inbox/${receiver._id}`}>
            <div className='row'>
                <div className="col-sm-2" style={{paddingTop:'8px',paddingLeft:'0',paddingRight:'10px'}}>
                    <img style={{width:'30px',height:'30px',float:'right'}} className="img img-responsive img-circle" src={receiver.avatar? receiver.avatar:'/images/coverProfile.jpg'} alt='avatar'/>
                </div>
                <div className="col-sm-9" style={{padding:'0'}}>
                    <div className="col-sm-9" style={{padding:'0'}}>
                        <p style={{color:'#03a9f0',fontWeight:'600',marginBottom:'0',marginTop:'0'}}>{receiver.fname} {receiver.lname}</p>
                    </div>
                    <div className="col-sm-3" style={{padding:'0'}}>
                        <p style={{backgroundColor:'green',textAlign:'center',fontWeight:'bolder',height:'10px',width:'10px',fontSize:'9px',borderRadius:'50%',float:'left'}}></p>
                    </div>
                </div>
            </div>
            
        </Link>
     );
}
 
export default OnlineUsers;
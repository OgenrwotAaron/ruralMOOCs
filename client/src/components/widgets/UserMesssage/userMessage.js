import React from 'react';
import { Link } from 'react-router-dom'

const UserMessage = ({message}) => {
    if(!message){
        return null
    }
    return ( 
        <Link to={`/inbox/${message.sender}`}>
            <div className="col-sm-2" style={{paddingTop:'8px',paddingLeft:'0',paddingRight:'10px'}}>
                <img style={{width:'40px',height:'40px',float:'right'}} className="img img-responsive img-circle" src="/images/coverProfile.jpg" alt='avatar'/>
            </div>
            <div className="col-sm-9" style={{padding:'0'}}>
                    <div className="col-sm-9">
                        <p style={{color:'#03a9f0',fontWeight:'600',marginBottom:'0',marginTop:'0'}}>Aaron Ogenrwot</p>
                        <p style={{color:'#888888',marginTop:'0',fontSize:'15px'}}>{message.body}</p>
                    </div>
                    <div className="col-sm-3" style={{padding:'0'}}>
                        <p style={{color:'#b2b2b2',marginBottom:'0',fontSize:'14px',marginTop:'0'}}>10:40 PM</p>
                        <p style={{backgroundColor:'#03a9f0',textAlign:'center',fontWeight:'bolder',height:'15px',width:'15px',fontSize:'9px',borderRadius:'50%',float:'right',color:'white'}}>1</p>
                    </div>
            </div>
        </Link>
     );
}
 
export default UserMessage;
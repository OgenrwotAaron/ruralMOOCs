import React,{useState,useEffect} from 'react';
import { timeSent } from '../../../utils';
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserMessage = ({message}) => {

    let [receiver,setReceiver]=useState()

    useEffect(()=>{
        axios.get(`/api/user/${message.receiver}`)
        .then(user=>{
            setReceiver(user.data[0])
        })
    },[message,receiver])

    if(!message){
        return null
    }

    if(!receiver){
        return null
    }
    return ( 
        <Link to={`/inbox/${message.sender}`}>
            <div className="row" style={{margin:'0',width:'100%'}}>
                <div className="col-sm-2" style={{paddingTop:'8px',paddingLeft:'0',paddingRight:'10px'}}>
                    <img style={{width:'40px',height:'40px',float:'right'}} className="img img-responsive img-circle" src={receiver.avatar? receiver.avatar:'/images/coverProfile.jpg'} alt='avatar'/>
                </div>
                <div className="col-sm-9" style={{padding:'0'}}>
                    <div className="col-sm-9">
                        <p style={{color:'#03a9f0',fontWeight:'600',marginBottom:'0',marginTop:'0'}}>{receiver.fname} {receiver.lname}</p>
                        <p style={{color:'#888888',marginTop:'0',fontSize:'15px'}}>{message.body}</p>
                    </div>
                    <div className="col-sm-3" style={{padding:'0'}}>
                        <p style={{color:'#b2b2b2',marginBottom:'0',fontSize:'14px',marginTop:'0'}}>{timeSent(message.sentAt)}</p>
                        <p style={{backgroundColor:'#03a9f0',textAlign:'center',fontWeight:'bolder',height:'15px',width:'15px',fontSize:'9px',borderRadius:'50%',float:'right',color:'white'}}>1</p>
                    </div>
                </div>
            </div>
        </Link>
     );
}
 
export default UserMessage;
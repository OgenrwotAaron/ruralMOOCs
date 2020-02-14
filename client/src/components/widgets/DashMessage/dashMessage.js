import React,{useEffect,useState} from 'react';
import axios from 'axios';

const DashMessage = (props) => {

    let [message,setMessage]=useState()

    useEffect(()=>{
        axios.get(`/api/inbox/${props.match.params.role}`)
        .then(res=>{
            setMessage(res.data)
        },[])
    })

    if(!message){
        return null;
    }

    const deleteMessage=(item)=>{
        axios.delete(`/api/message/${item}`)
        .then(()=>{
            props.history.push(`/dashboard/mail/1`)
        })
    }

    const date=new Date(message.created_at).toLocaleString()
    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
            <h1 style={{width:'100%',fontSize:'15px',float:'left',margin:'20px 20px 0 20px'}}>Sender:{` ${message.fname} ${message.lname}`}</h1>
            <div className="row" style={{background:'#1918289c',border:'#0ea0a030 2px solid',borderRadius:'0 0 10px 10px',margin:'5px',padding:'10px'}}>
            <h1 style={{width:'100%',fontSize:'15px',margin:'20px 20px 0 0'}}>Email: {message.email}</h1> 
            <h1 style={{width:'100%',fontSize:'15px',margin:'0 20px 0 0'}}>Subject: {message.subject}</h1>
            <h1 style={{width:'100%',fontSize:'15px',margin:'20px'}}>{message.message}</h1>
            <h1 style={{width:'100%',fontSize:'15px',margin:'20px 20px 0 0'}}>Date: {date}</h1>
            <span style={{padding:'2px 10px',cursor:'pointer',color:'red',fontSize:'20px'}} onClick={()=>deleteMessage(message._id)} className='icon icon-delete'></span>
            </div>
            </div>
            
        </div>
     );
}
 
export default DashMessage;
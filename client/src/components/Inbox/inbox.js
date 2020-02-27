import React,{ useState,useEffect} from 'react';
import axios from 'axios'
import { socket } from '../Header/header'

import UserMessage from '../widgets/UserMesssage/userMessage';
import MessageThread from '../widgets/MessageThread/messageThread';
import ChatProfile from '../widgets/ChatProfile/chatProfile';
const Inbox = (props) => {

    let [receiver,setReceiver]=useState()
    let [messages,setMessages]=useState()

    useEffect(()=>{
        socket.emit('get_all_messages',{receiver:props.user.user._id})
        socket.on('all_messages',msgs=>{
            setMessages(msgs.data)
        })
        axios.get(`/api/user/${props.match.params.id}`)
        .then(res=>{
            setReceiver(res.data[0])
        })
    },[props.user,messages])

    if(props.match.params.id===props.user.user._id){
        props.history.push(`/messages/${props.user.user._id}`)
    }

    if(!messages){
        return null
    }

    const uniqueAddresses = Array.from(new Set(
        messages.reverse().map(a => a.sender)))
        .map(sender => {
        return messages.find(a => a.sender === sender)
    })

    const renderMessages=(messages)=>{
        return messages.map((item,i)=>(
            <UserMessage message={item} key={i}/>
        ))
    }

    return ( 
        <div className="row" style={{margin:'60px 0 0 0',width:'100%',height:'100vh'}}>
            <div className="col-sm-4" style={{backgroundColor:'#f3f3f3',height:'100%',paddingRight:'0'}}>
                <input style={{margin:'20px',border:'none',borderRadius:'25px',height:'25px',width:'80%'}} className="form-control" type="search" placeholder="Search for Chat"/>
                {renderMessages(uniqueAddresses)}
            </div>
            <div className="col-sm-6" style={{height:'95vh'}}>
                <MessageThread receiver={receiver} {...props}/>
            </div>
            <div className="col-sm-2" style={{backgroundColor:'#f3f3f3',height:'100%',paddingTop:'3%'}}>
                <ChatProfile receiver={receiver}/>
            </div>
        </div>
     );
}
 
export default Inbox;
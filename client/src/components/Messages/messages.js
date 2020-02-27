import React,{useState,useEffect} from 'react';
import { socket } from '../Header/header'
import UserMessage from '../widgets/UserMesssage/userMessage';
import OnlineUsers from '../widgets/OnlineUsers/onlineUsers';

const Messages = (props) => {

    let [messages,setMessages]=useState()
    let [onlineUsers,setOnlineUsers]=useState()

    useEffect(()=>{
        socket.emit('online_users',{status:true})
        socket.on('active_users',data=>{
            setOnlineUsers(data.users)
        })
        socket.emit('get_all_messages',{receiver:props.match.params.id})
        socket.on('all_messages',msgs=>{
            setMessages(msgs.data)
        })
    },[props.match.params.id,messages,onlineUsers])

    if(!messages){
        return null
    }

    if(!onlineUsers){
        return null
    }

    const uniqueAddresses = Array.from(new Set(
        messages.map(a => a.sender)))
        .map(sender => {
        return messages.reverse().find(a => a.sender === sender)
    })

    const renderMessages=(messages)=>{
        return messages.map((item,i)=>(
            <UserMessage message={item} key={i}/>
        ))
    }

    const renderOnlineUsers=(users)=>{
        return users.map((item,i)=>(
            <OnlineUsers receiver={item} key={i}/>
        ))
    }

    return ( 
        <div className='row' style={{width:'100%',margin:'60px 0 0 0'}}>
            <div className="col-sm-4">
                <h3 style={{color:'#616161'}}>Online Users</h3>
                {renderOnlineUsers(onlineUsers)}
            </div>
            <div className="col-sm-6">
                <h3>All messages</h3>
                {renderMessages(uniqueAddresses)}
            </div>
            <div className="col-sm-2"></div>
        </div>
     );
}
 
export default Messages;
import React,{useState,useEffect} from 'react';
import { socket } from '../Header/header'
import UserMessage from '../widgets/UserMesssage/userMessage';

const Messages = (props) => {

    let [messages,setMessages]=useState()

    useEffect(()=>{
        socket.emit('get_all_messages',{receiver:props.match.params.id})
        socket.on('all_messages',msgs=>{
            setMessages(msgs.data)
        })
    })

    if(!messages){
        return null
    }

    const uniqueAddresses = Array.from(new Set(
        messages.map(a => a.sender)))
        .map(sender => {
        return messages.find(a => a.sender === sender)
    })

    const renderMessages=(messages)=>{
        return messages.map((item,i)=>(
            <UserMessage message={item} key={i}/>
        ))
    }

    return ( 
        <div className='row' style={{width:'100%',margin:'60px 0 0 0'}}>
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
                <h3>All messages</h3>
                {renderMessages(uniqueAddresses)}
            </div>
            <div className="col-sm-3"></div>
        </div>
     );
}
 
export default Messages;
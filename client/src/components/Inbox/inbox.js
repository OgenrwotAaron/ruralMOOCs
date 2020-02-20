import React,{ useEffect,useState} from 'react';
import { socket } from '../Header/header';
const Inbox = (props) => {
    let [messages,setMessages]=useState();

    useEffect(()=>{
        socket.emit("get_inbox","my inbox");
        socket.on('messages',messages=>{
            setMessages(messages);
        })
    })

    return ( 
        <div className="row">
            <div className="col-sm-4">Messages</div>
            <div className="col-sm-4">Single Message</div>
            <div className="col-sm-4">Online Users</div>
        </div>
     );
}
 
export default Inbox;
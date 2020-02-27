import React,{ useState,useEffect} from 'react';
import Chat from '../Chat/chat';
import { socket } from '../../Header/header'

const MessageThread = (props) => {

    let [message,setMessage]=useState('')
    let [messages,setMessages]=useState()

    useEffect(()=>{
        socket.emit("get_inbox_private",{threadId:props.match.params.id,sender:props.user.user._id});
        socket.on('messages_private',messages=>{
            setMessages(messages);
        })
        socket.on('msg_private_updated',msg=>{
            if(!msg.success){
                console.error(msg.doc)
            }
            socket.emit("get_inbox_private",{threadId:props.match.params.id,sender:props.user.user._id});
        })
    },[props,messages])

    const updateChat=(event)=>{
        setMessage(event.target.value)
    }

    const sendMessage=(event)=>{
        event.preventDefault()
        socket.emit('msg_private_sent',{sender:`${props.user.user._id}`,receiver:`${props.match.params.id}`,body:message,threadId:`${props.match.params.id}`})
        setMessage('')
    }

    if(!props.receiver){
        return null;
    }

    return ( 
        <>
            <div className="row" style={{width:'100%',margin:'0',padding:'0 10px',borderBottom:'2px solid #ececec'}}>
                <div className="col-sm-1" style={{paddingTop:'8px',paddingLeft:'0',paddingRight:'0'}}>
                    <img style={{width:'30px',height:'30px',float:'right'}} className="img img-responsive img-circle" src={props.receiver.avatar? props.receiver.avatar:'/images/coverProfile.jpg'} alt='avatar'/>
                </div>
                <div className="col-sm-9" style={{padding:'0'}}>
                    <div className="col-sm-9">
                        <p style={{color:'#03a9f0',padding:'10px 0 10px 5px',margin:'0'}}>{props.receiver.fname} {props.receiver.lname}</p>
                        {
                            props.receiver.online? <div style={{width: '8px',height: '8px',background: 'green',position: 'absolute',right: '120px',borderRadius: '5px',bottom: '18px',margin: '0'}}></div>:null
                        }
                    </div>
                </div>
            </div>

            <div style={{height:'74%'}}>
                <Chat {...props} chats={messages}/>
            </div>
            <div style={{borderTop:'2px solid #ececec',padding:'20px'}}>
                <input onChange={(e)=>updateChat(e)} value={message} className="form-control" style={{borderRadius:'25px',height:'40px',backgroundColor:'#f3f3f3',border:'none'}}/>
                <button onClick={(e)=>sendMessage(e)} disabled={message===''? true:false} style={{color:'white',position:'absolute',right:'35px',fontSize:'20px',height:'40px',background:'#03a9f0',textAlign:'center',width:'40px',border:'none',padding:'10px',bottom:'40px',borderRadius:'50%'}} className="icon icon-send"></button>
            </div>
        </>
     );
}
 
export default MessageThread;
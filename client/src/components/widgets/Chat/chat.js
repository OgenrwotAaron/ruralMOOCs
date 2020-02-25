import React from 'react';

const Chat = (props) => {

    if(!props.chats){
        return null;
    }

    const renderChat=(chats)=>{
        const newChats=chats.sort((a,b)=>new Date(a.sentAt)-new Date(b.sentAt))
        return newChats.map((item,i)=>(
            <div key={i}>
                {
                    item.receiver!==props.match.params.id ?
                    <div style={{color:'#3c3c3c',background:'#f3f3f3',width:'fit-content',padding:'5px',borderRadius:'0 5px 5px',margin:'5px'}}>
                        {item.body}
                    </div>
                    :
                    <div className="row" style={{margin:'0'}}>
                        <div style={{float:'right',color:'white',background:'#03a9f0',width:'fit-content',padding:'5px',borderRadius:'5px 5px 0 5px',margin:'5px'}}>
                            {item.body}
                        </div>
                    </div>
                }
            </div>
        ))
    }

    return ( 
        <>
            {props.chats.success? renderChat(props.chats.data):null}
        </>
     );
}
 
export default Chat;
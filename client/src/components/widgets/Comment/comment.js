import React,{useState,useEffect} from 'react';
import { socket } from '../../Header/header'

const Comment = (props) => {

    let [comments,setComments]=useState([])

    useEffect(()=>{
        socket.emit('get_all_comments',{type:props.type})
        socket.on('comment_added',comment=>{
            if(!comment.success){
                console.error(comment.doc)
            }else{
                socket.emit('get_all_comments',{type:props.type})
            }
        })
        socket.on('all_comments',comments=>{
            if(!comments.success){
                console.error(comments.doc)
            }else{
                setComments(comments.data)
            }
        })
    })

    const renderComments=(comments)=>{
        return comments.map((item,i)=>(
            <div key={i} className="row" style={{color:"black",margin:'0',width:'100%'}}>
                <div className="col-xs-12">
                    <div className="col-xs-2">
                        <span className="icon icon-user-o" style={{fontSize:'25px'}}></span>
                    </div>
                    <div className="col-xs-5" style={{padding:'5px'}}>
                        <p style={{color:'#444444',fontSize:'15px',margin:'0'}}>Fname Lname</p>
                    </div>
                    <div className="col-xs-5" style={{textAlign:'right'}}>
                        <p style={{color:'#444444',fontSize:'15px',margin:'0'}}>{item.updatedAt}</p>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="col-xs-8">
                        <p style={{color:'#676767',fontSize:'15px'}}>{item.body}</p> 
                    </div>
                    <div className="col-xs-2" style={{fontSize:'18px',margin:'15px 0'}}>
                        <span className="icon icon-arrow-up">{item.upVote}</span>
                    </div>
                    <div className="col-xs-2" style={{fontSize:'18px',margin:'15px 0'}}>
                        <span className="icon icon-arrow-down">{item.downVote}</span>
                    </div>
                </div>
            </div>
        ))
    }
    
    if(comments.length<1){
        return (<p>Loading comments...</p>);
    }

    return ( 
        <>
            {renderComments(comments)}
        </>
     );
}
 
export default Comment;
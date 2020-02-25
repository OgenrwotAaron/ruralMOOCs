import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { socket } from '../../Header/header';

const Comment = (props) => {

    let [comments,setComments]=useState()

    useEffect(()=>{
        socket.emit('get_all_comments',{type:props.type,topic:props.match.params.id})
        socket.on('comment_added',comment=>{
            if(!comment.success){
                console.error(comment.doc)
            }else{
                socket.emit('get_all_comments',{type:props.type,topic:props.match.params.id})
            }
        })
        socket.on('all_comments',comments=>{
            if(!comments.success){
                console.error(comments.doc)
            }else{
                setComments(comments.data)
            }
        })
    },[props])

    const upvoteComment=(_id)=>{
        socket.emit('upVote_comment',{id:_id})
    }

    const downvoteComment=(_id)=>{
        socket.emit('downVote_comment',{id:_id})
    }

    const renderComments=(comments)=>{
        if(!comments){
            return null
        }
        return comments.map((item,i)=>{
            return(
                <div key={i} className="row well" style={{color:"black",margin:'0',width:'100%'}}>
                    <div className="col-xs-12">
                        <div className="col-xs-1" style={{padding:'5px',textAlign:'center'}}>
                            <Link
                                style={{padding:'15px 5px'}}
                                to={`/user-profile/${item.sender._id}`}
                            >
                                <span className="icon icon-user-o" style={{fontSize:'20px'}}></span>
                            </Link>
                            
                        </div>
                        <div className="col-xs-6" style={{padding:'5px'}}>
                            <p style={{color:'#444444',fontWeight:'bold',fontSize:'15px',margin:'0'}}>{`${item.sender.fname} ${item.sender.lname}`}</p>
                        </div>
                        <div className="col-xs-5" style={{textAlign:'right',padding:'5px'}}>
                            <p style={{color:'#444444',fontSize:'15px',margin:'0'}}>{new Date(item.sentAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="col-xs-12 well " style={{backgroundColor:'white'}}>
                        <div className="col-xs-8">
                            <p style={{color:'#676767',fontSize:'15px',marginBottom:'0'}}>{item.body}</p> 
                        </div>
                        <div className="col-xs-2" style={{fontSize:'18px',margin:'15px 0'}}>
                            <span style={{cursor:'pointer',color:'#3b7b3b'}} onClick={()=>upvoteComment(item._id)} className="icon icon-arrow-up">{item.upVotes}</span>
                        </div>
                        <div className="col-xs-2" style={{fontSize:'18px',margin:'15px 0'}}>
                            <span style={{cursor:'pointer',color:'#a76a6a'}} onClick={()=>downvoteComment(item._id)} className="icon icon-arrow-down">{item.downVotes}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }
    
    if(!comments){
        return (<p>Loading comments...</p>);
    }

    return ( 
        <>
            {renderComments(comments)}
        </>
     );
}
 
export default Comment;
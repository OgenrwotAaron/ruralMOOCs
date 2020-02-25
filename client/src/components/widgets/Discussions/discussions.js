import React,{useState} from 'react';
import { socket } from '../../Header/header'

const Discussions = (props) => {

    let [comment,setComment]=useState('');

    const updateFormData=(e)=>{
        setComment(e.target.value)
    }

    const addComment=(e)=>{
        e.preventDefault();
        socket.emit('add_comment',
            {
                sender:props.user.user,
                topic:props.match.params.id,
                body:comment,
                type:props.type
            }
        )
        socket.on('comment_added',data=>{
            if(!data.success){
                console.error(data.data)
            }else{
                setComment('')
            }
        })
        
    }

    return ( 
        <div>
            <form onSubmit={(e)=>addComment(e)}>
                <div className='form-group'>
                    <textarea onChange={(e)=>updateFormData(e)} value={comment} style={{width:'100%',borderRadius:'5px',border:'1px solid #b3b3b3',marginTop:'20px'}} className="form-control" cols='20' rows='3' placeholder='Write your Comments here'></textarea>
                </div>
                <div className='row'>
                    <div className='col-xs-3'>
                        <div className='col-xs-6'>
                        </div>
                        <div className='col-xs-6' style={{paddingLeft:'0'}}>
                        </div>
                    </div>
                    <div className='col-xs-6'></div>
                    <div className='col-xs-3'>
                        <input disabled={comment===''? true:false} type='submit' style={{padding:'5px',float:'right'}} value='Add Comment' className="btn btn-white"/>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Discussions;
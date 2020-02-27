import React,{ useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const DashMail = () => {

    let [inbox,setInbox]=useState()

    useEffect(()=>{
        axios.get('/api/inbox')
        .then(res=>{
            setInbox(res.data)
        })
    },[])

    const deleteMessage=(item)=>{
        axios.delete(`/api/message/${item}`)
        .then(res=>{
            let newInbox=inbox.filter(item=>item._id!==res.data._id)
            setInbox(newInbox)
        })
    }

    const renderInbox=(inbox)=>{
        return inbox.map((item,i)=>
        (
            <tr key={i}>
                <td>{`${item.fname} ${item.lname}`}</td>
                <td>{item.subject}</td>
                <td>
                    {
                        new Date(item.updatedAt).toLocaleDateString()
                    }
                </td>
                <td>
                    <Link to={`/dashboard/message/${item._id}`}>
                        <span style={{padding:'2px 10px',cursor:'pointer',color:'green',fontSize:'20px'}} className='icon icon-eye'></span>
                    </Link>
                    <span style={{padding:'2px 10px',cursor:'pointer',color:'red',fontSize:'20px'}} onClick={()=>deleteMessage(item._id)} className='icon icon-delete'></span>
                </td>
            </tr>
        ))
    }

    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
            <h1 style={{float:'left',margin:'20px',color:'#191828'}}>Messages</h1>
                {/* <Link style={{float:'right',margin:'20px'}} className='btn btn-primary btn-pill' to='/add-instructor'>
                    <span className='icon icon-mail_outline' style={{fontSize:'14px',padding:'2px 5px 0 2px'}}></span>
                    Message
                </Link> */}
            <div className="row" style={{margin:'5px',padding:'10px'}}>
                <table className='table' style={{fontSize:'14px',color:'#191828'}}>
                        <tbody style={{color:'#191828'}}>
                            <tr style={{fontWeight:'bold'}}>
                                <td>Sender</td>
                                <td>Subject</td>
                                <td>Date</td>
                                <td>Action</td>
                            </tr>
                            {inbox? renderInbox(inbox):null}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
     );
}
 
export default DashMail;
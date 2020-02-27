import React,{ useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashInstructor = (props) => {

    let [instructors,setInstructors]=useState();

    useEffect(()=>{
        axios.get('/api/users/1')
        .then(instructors=>{
            setInstructors(instructors.data)
        })
    },[props])

    const deleteInstructor=(id,name)=>{
        if(window.confirm(`Are you sure you want to delete instructor ${name}'s account?`)){
            axios.delete(`/api/user/${id}`)
            .then(res=>{
                let newInstructors=instructors.filter(item=>item.id!==res.data._id)
                setInstructors(newInstructors)
            })
        }
    }

    const renderInstructors=(instructors)=>{
        return instructors.map((instructor,i)=>(
            <tr key={i}>
                <td>{instructor.fname}</td>
                <td>{instructor.lname}</td>
                <td>{instructor.email}</td>
                <td>
                    {
                        props.user.user.role===2 &&
                       <Link to={`/edit-instructor/${instructor.id}`}>
                            <span style={{padding:'2px',color:'green'}} className='icon icon-edit'></span>
                        </Link> 
                    }
                    
                    <Link to={`/user-profile/${instructor.id}`}>
                        <span style={{padding:'5px'}} className='icon icon-eye'></span>
                    </Link>
                    {
                        props.user.user.role===2 &&
                         <span style={{padding:'2px',color:'red',cursor:'pointer'}} onClick={()=>deleteInstructor(instructor.id,instructor.fname)} className='icon icon-delete'></span>
                    }
                </td>
            </tr>
        ))
    }

    if(!props.user){
        return null
    }

    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
                <h1 style={{float:'left',margin:'20px',color:'#191828'}}>Instructors</h1>
                {
                     props.user.user.role===2 &&
                    <Link style={{float:'right',margin:'20px'}} className='btn btn-primary btn-pill' to='/add-instructor'>
                        <span className='icon icon-person_add' style={{fontSize:'14px',padding:'2px 5px 0 2px'}}></span>
                        Instructor
                    </Link>
                }
                
                <div className="row">
                    <table className='table' style={{fontSize:'14px',color:'#191828'}}>
                        <tbody style={{color:'#191828'}}>
                            <tr style={{fontWeight:'bold'}}>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Email</td>
                                <td>Action</td>
                            </tr>
                            {instructors? renderInstructors(instructors):null}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
     );
}
 
export default DashInstructor;
import React,{ useEffect,useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const DashStudent = (props) => {

    let [students,setStudents]=useState()

    useEffect(()=>{
        axios.get('/api/users/0')
        .then(students=>{
            setStudents(students.data)
        })
    },[])

    const deleteStudent=(id,name)=>{
        if(window.confirm(`Are you sure you want to delete ${name}'s account?`)){
            axios.delete(`/api/user/${id}`)
            .then(res=>{
                let newstudents=students.filter(item=>item.id!==res.data._id)
                setStudents(newstudents)
            })
        }
    }

    const renderStudents=(students)=>{
        return students.map((student,i)=>(
            <tr key={i}>
                <td>{student.fname}</td>
                <td>{student.lname}</td>
                <td>{student.email}</td>
                <td>
                    <Link to={`/user-profile/${student.id}`}>
                        <span style={{padding:'5px',color:'green'}} className='icon icon-eye'></span>
                    </Link>
                    {
                        props.user.user.role===2&&
                        <span onClick={()=>deleteStudent(student.id,student.fname)} style={{padding:'2px',color:'red',cursor:'pointer'}} className='icon icon-delete'></span>
                    }
                </td>
            </tr>
        ))
    }

    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
            <h1 style={{color:'#191828'}}>Students</h1>
            <div className="row">
                <table className='table' style={{fontSize:'14px',color:'#191828'}}>
                        <tbody style={{color:'#191828'}}>
                            <tr style={{fontWeight:'bold'}}>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Email</td>
                                <td>Action</td>
                            </tr>
                            {students? renderStudents(students):null}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
     );
}
 
export default React.memo(DashStudent);
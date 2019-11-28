import React,{ useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const DashDefault = () => {

    let [courses,setCourses]=useState('0');
    let [students,setStudents]=useState('0')
    let [instructors,setInstructors]=useState('0');

    useEffect(()=>{
        axios.get('/api/courses')
        .then(res=>{
            axios.get('/api/users/0')
            .then(students=>{
                axios.get('/api/users/1')
                .then(instructors=>{
                    setCourses(res.data.length);
                    setStudents(students.data.length);
                    setInstructors(instructors.data.length)
                })
            })
        })
    })

    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
                <h1 style={{color:'#191828'}}>Dashboard</h1>
                <div className="row" id='dash'>
                    <Link to='/dashboard/courses'>
                        <div className="col-sm-4" style={{textAlign:"center",background:'white',paddingTop:'3%',borderBottom:'#c1c1c1 solid 1px',borderRadius:'6px'}}>
                            <span className="icon icon-university" style={{fontSize:'50px',color:'#191828'}}></span>
                            <h2 style={{color:'#191828',fontSize:'25px',margin:'0'}}>{courses}</h2>
                            <p style={{color:'#565661',margin:'5px 0'}}>Courses</p>
                        </div>
                    </Link>
                    <Link to='/dashboard/students'>
                        <div className="col-sm-4" style={{textAlign:"center",background:'white',paddingTop:'3%',borderBottom:'#c1c1c1 solid 1px',borderRadius:'6px'}}>
                            <span className="icon icon-graduation-cap" style={{fontSize:'50px',color:'#191828'}}></span>
                            <h2 style={{color:'#191828',fontSize:'25px',margin:'0'}}>{students}</h2>
                            <p style={{color:'#565661',margin:'5px 0'}}>Students</p>
                        </div>
                    </Link>
                    <Link to='/dashboard/instructors'>
                        <div className="col-sm-4" style={{textAlign:"center",background:'white',paddingTop:'3%',borderBottom:'#c1c1c1 solid 1px',borderRadius:'6px'}}>
                            <span className="icon icon-users" style={{fontSize:'50px',color:'#191828'}}></span>
                            <h2 style={{color:'#191828',fontSize:'25px',margin:'0'}}>{instructors}</h2>
                            <p style={{color:'#565661',margin:'5px 0'}}>Instructors</p>
                        </div>
                    </Link>
                    
                </div>
            </div>
            
        </div>
     );
}
 
export default DashDefault;
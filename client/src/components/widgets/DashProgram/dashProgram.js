import React,{ useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const DashProgram = () => {

    let [courses,setCourses]=useState();
    let [instructors,setInstructors]=useState();

    useEffect(()=>{
        axios.get('/api/courses')
        .then(res=>{
            axios.get('/api/users/1')
            .then(doc=>{
                setInstructors(doc.data)
                setCourses(res.data)
            })
        })
    },[])

    const renderData=(data)=>{
        return data.map((item,i)=>(
            <tr key={i}>
                <td>{item.metadata.course}</td>
                <td>
                    {
                        instructors.map(ite=>{
                            return ite.id===item.metadata.instructor ? 
                                `${ite.fname} ${ite.lname}`
                                :
                                null
                            }
                        )
                    }
                </td>
                <td>{item.metadata.duration}</td>
                <td>
                    <span style={{padding:'2px'}} className='icon icon-edit'></span>
                    <span style={{padding:'2px'}} className='icon icon-eye'></span>
                    <span style={{padding:'2px'}} className='icon icon-delete'></span>
                </td>
            </tr>
            )
        )
    }

    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
            <h1 style={{float:'left',margin:'20px',color:'#191828'}}>Programs</h1>
                <Link style={{float:'right',margin:'20px'}} className='btn btn-primary btn-pill' to='/add-course'>
                    <span className='icon icon-playlist_add' style={{fontSize:'18px',padding:'5px 5px 0 2px'}}></span>
                    Add Program
                </Link>
                <div className="row">
                <table className='table' style={{fontSize:'14px',color:'#191828'}}>
                        <tbody style={{color:'#191828'}}>
                            <tr style={{fontWeight:'bold'}}>
                                <td>Program Title</td>
                                <td>Courses</td>
                                <td>Duration</td>
                                <td>Action</td>
                            </tr>
                            {courses? renderData(courses):null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
     );
}
 
export default DashProgram;
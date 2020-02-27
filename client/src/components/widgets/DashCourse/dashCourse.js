import React,{ useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const DashCourse = (props) => {

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
    },[props])

    const deleteCourse=(item,name)=>{
        if(window.confirm(`Are you sure you want to delete ${name} course?`)){
            axios.delete(`/api/course/${item}`)
            .then(res=>{
                let newCourses=courses.filter(item=>item._id!==res.data.id)
                setCourses(newCourses)
            })
        }
    }

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
                    {
                        props.user.user.role===2&&
                        <Link to={`/edit-course/${item._id}`}>
                            <span style={{padding:'2px',color:'green'}} className='icon icon-edit'></span>
                        </Link>
                    }
                    <Link to={`/course/${item._id}`}>
                        <span style={{padding:'5px'}} className='icon icon-eye'></span>
                    </Link>
                    {
                        props.user.user.role===2&&
                        <span style={{padding:'2px',color:'red',cursor:'pointer'}} onClick={()=>deleteCourse(item._id,item.metadata.course)} className='icon icon-delete'></span>
                    }
                </td>
            </tr>
            )
        )
    }

    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
                <h1 style={{float:'left',margin:'20px',color:'#191828'}}>Courses</h1>
                {
                    props.user.user.role===2&&
                    <Link style={{float:'right',margin:'20px'}} className='btn btn-primary btn-pill' to='/add-course'>
                        <span className='icon icon-playlist_add' style={{fontSize:'18px',padding:'5px 5px 0 2px'}}></span>
                        Add Course
                    </Link>
                }
                
                <div className="row">
                <table className='table' style={{fontSize:'14px',color:'#191828'}}>
                        <tbody style={{color:'#191828'}}>
                            <tr style={{fontWeight:'bold'}}>
                                <td>Course Title</td>
                                <td>Instuctor</td>
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
 
export default DashCourse;
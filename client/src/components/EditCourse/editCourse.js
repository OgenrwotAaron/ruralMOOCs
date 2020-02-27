import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const EditCourse=(props)=>{

    let [instructors,setInstructors]=useState()
    let [course,setCourse]=useState()
    let [loading,setLoading]=useState(false)
    let [updated,setUpdated]=useState('')

    useEffect(()=>{
        axios.get(`/api/course/${props.match.params.id}`)
        .then(res=>{
            setCourse(res.data)
            axios.get('/api/users/1')
            .then(instructor=>{
                setInstructors(instructor.data)
            })
        })
    },[props,loading,updated])
    if(!instructors){
        return null;
    }
    if(!course){
        return null
    }

    const renderOptions=(instructors)=>{
        return instructors.map((instructor,i)=>(
            <option key={i} value={instructor.id}>{`${instructor.fname} ${instructor.lname}`}</option>
        ))
    }

    const updateForm=(event,id)=>{
        event.preventDefault()
        const newFormData={...course}
        let newElement=newFormData.metadata[id]

        newElement=event.target.value;

        newFormData.metadata[id]=newElement;
        setCourse(newFormData)
    }

    const updateCourse=(e)=>{
        e.preventDefault();
        setLoading(true)
        let dataToSubmit={}
        for(let key in course){
            dataToSubmit[key]=course[key]
        }
        axios.post(`/api/editCourse/${dataToSubmit._id}`,dataToSubmit.metadata)
        .then(res=>{
            if(res.data.success){
                setUpdated(true)
            }else{
                setUpdated(false)
            }
            setLoading(false)
        })
        .catch(e=>{
            setLoading(false)
            setUpdated(false)
        })
    }

    return(
        <div className="slide-1">
            <div className="container jumb" style={{background:'linear-gradient(to right top, #d1d2f1, #ffffff)',width:'100%'}}>
                <div className="row jumbo">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-duration="500">
                        <form onSubmit={(e)=>updateCourse(e)} className="form-box" style={{boxShadow:'#0000005e 1px 1px 20px 1px'}}>
                            <h1 style={{textAlign:'center',color:'#3c3c3c'}}>Edit {course.metadata.course} course</h1>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <input required name='course' onChange={(e)=>updateForm(e,"course")} value={course.metadata.course} className="form-control" type="text" placeholder="Course Name"/>
                                </div>
                                <div className="col-sm-6">
                                    <input required name='duration' onChange={(e)=>updateForm(e,"duration")} value={course.metadata.duration} type="text" placeholder="Duration" className="form-control"/>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <select name='instructor' onChange={(e)=>updateForm(e,"instructor")} value={course.metadata.instructor} className="form-control">
                                        <option value={course.metadata.instructor}>{instructors.filter(item=>item.id===course.metadata.instructor)[0].fname} {instructors.filter(item=>item.id===course.metadata.instructor)[0].lname}</option>
                                        <option>Choose other Instructor</option>
                                        {renderOptions(instructors)}
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <select name='category' onChange={(e)=>updateForm(e,"category")} value={course.metadata.category} required className="form-control">
                                        <option value={course.metadata.category}>{course.metadata.category}</option>
                                        <option>Choose other Category</option>
                                        <option value='Technology'>Technology</option>
                                        <option value='Language'>Language</option>
                                        <option value='Science'>Science</option>
                                        <option value='Health'>Health</option>
                                        <option value='Humanities'>Humanities</option>
                                        <option value='Business'>Business</option>
                                        <option value='Mathematics'>Mathematics</option>
                                        <option value='Marketing'>Marketing</option>
                                        <option value='Lifestyle'>Lifestyle</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea name='description' onChange={(e)=>updateForm(e,"description")} value={course.metadata.description} className="form-control" type="text" placeholder="Course Description..."/>
                            </div>
                            <button disabled={loading?true:false} type='submit' className='btn btn-primary btn-block'>
                                {loading ? `Loading...`:`Update`}
                            </button>
                            { 
                                updated===true?
                                    <p style={{color:'green'}}>Course updated Successfully</p>
                                    :
                                    updated===true?
                                        <p style={{color:'red'}}>Course update failed</p>
                                        :
                                        null
                            }
                            <Link style={{position:'absolute',color:'white',backgroundColor:'red',height:'15px',width:'15px',textAlign:'center',borderRadius:'50%',top:'30px',right:'40px'}} to={`/dashboard/courses/${props.user.user.role}`}>
                                <span className="icon icon-close"></span>
                            </Link>
                        </form>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </div>
    )
}

export default EditCourse;
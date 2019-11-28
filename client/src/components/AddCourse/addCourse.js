import React,{ useEffect,useState} from 'react';
import axios from 'axios';

const changeLabel=(event)=>{
    const file=event.target.files[0];
    if(file.size>62914560){
        alert('File too large')
        event.target.value=''
        document.getElementById('thename').innerText='Upload Video';
    }else{
       document.getElementById('thename').innerText=file.name; 
    }
    
}

const AddCourse=()=>{

    let [instructors,setInstructors]=useState()

    useEffect(()=>{
        axios.get('/api/users/1')
        .then(instructors=>{
            setInstructors(instructors.data)
        })
    },[])

    if(!instructors){
        return null;
    }

    const renderOptions=(instructors)=>{
        return instructors.map((instructor,i)=>(
            <option key={i} value={instructor.id}>{`${instructor.fname} ${instructor.lname}`}</option>
        ))
    }

    return(
        <div className="slide-1" style={{backgroundImage:"url('images/science.jpg')",backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:"50% 50%",backgroundAttachment:'fixed'}}>
            <div className="container jumb" style={{backgroundColor:'white',width:'100%'}}>
                <div className="row jumbo">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-duration="500">
                        <form style={{boxShadow:'#e4e2e2 2px 2px 4px',padding:'10%',borderRadius:'5%'}} encType='multipart/form-data' method='POST' action='/api/addCourse'>
                            <h1 style={{textAlign:'center'}}>Add Course</h1>
                            <div className="custom-file mb-3">
                                <input type="file" name="file" id="file" onChange={(e)=>changeLabel(e)} className="custom-file-input"/>
                                <label id="thename" htmlFor="file" className="custom-file-label">Choose Poster Photo</label>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <input required name='course' className="form-control" type="text" placeholder="Course Name"/>
                                </div>
                                <div className="col-sm-6">
                                    <input required name='duration' type="text" placeholder="Duration" className="form-control"/>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <select name='instructor' className="form-control">
                                        <option value='Instructor'>Choose Instructor</option>
                                        {renderOptions(instructors)}
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <select name='category' required className="form-control">
                                        <option value='misc'>Category</option>
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
                                <textarea name='description' className="form-control" type="text" placeholder="Course Description..."/>
                            </div>
                                <button type='submit' className='btn btn-primary btn-block'>
                                    Add Course
                                </button>
                        </form>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse;
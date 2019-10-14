import React from 'react';

const AddCourse=()=>{
    return(
        <div className="slide-1" style={{backgroundImage:"url('images/science.jpg')",backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:"50% 50%",backgroundAttachment:'fixed'}}>
            <div className="container jumb" style={{backgroundColor:'rgba(7,6,28,0.88)',width:'100%'}}>
                <div className="row jumbo">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-duration="500">
                        <form encType='multipart/form-data' method='POST' action='/addCourse'>
                            <h1 style={{textAlign:'center'}}>Add Course</h1>
                            <div className="custom-file mb-3">
                                <input type="file" name="file" id="file" className="custom-file-input"/>
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
                                        <option value='Instructor'>Instructor</option>
                                        <option value='Instructor1'>Instructor1</option>
                                        <option value='Instructor2'>Instructor2</option>
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
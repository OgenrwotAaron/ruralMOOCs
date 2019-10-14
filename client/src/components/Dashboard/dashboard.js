import React from 'react';
import SideNav from '../widgets/SideNav/sideNav';
import { Link } from 'react-router-dom';

const Dashboard =(props)=>{
    const renderDashboard=()=>{
        let template=null;

        switch (props.match.params.id) {
            case 'courses':
                template=(
                    <div className='col-sm-9'>
                        <div style={{padding:'9% 0 0 0'}}>
                        <h1 style={{float:'left',margin:'20px'}}>Courses</h1>
                            <Link style={{float:'right',margin:'20px'}} className='btn btn-primary btn-pill' to='/add-course'>
                                <span className='icon icon-playlist_add' style={{fontSize:'18px',padding:'5px 5px 0 2px'}}></span>
                                Add Course
                            </Link>
                            <div className="row">
                            <table className='table' style={{fontSize:'14px'}}>
                                    <tbody>
                                        <tr style={{fontWeight:'bold'}}>
                                            <td>Course Title</td>
                                            <td>Instuctor</td>
                                            <td>Topics</td>
                                            <td>Duration</td>
                                            <td>Action</td>
                                        </tr>
                                        <tr>
                                            <td>Java Basics</td>
                                            <td>Khuliso</td>
                                            <td>5</td>
                                            <td>12:30:00</td>
                                            <td>
                                                <span style={{padding:'2px'}} className='icon icon-edit'></span>
                                                <span style={{padding:'2px'}} className='icon icon-eye'></span>
                                                <span style={{padding:'2px'}} className='icon icon-delete'></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>HTML Basics</td>
                                            <td>Aaron</td>
                                            <td>10</td>
                                            <td>10:27:00</td>
                                            <td>
                                                <span style={{padding:'2px'}} className='icon icon-edit'></span>
                                                <span style={{padding:'2px'}} className='icon icon-eye'></span>
                                                <span style={{padding:'2px'}} className='icon icon-delete'></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
                break;
            
            case 'students':
                template=(
                    <div className='col-sm-9'>
                        <div style={{padding:'9% 0 0 0'}}>
                        <h1>Students</h1>
                        <div className="row">
                            <table className='table' style={{fontSize:'14px'}}>
                                    <tbody>
                                        <tr style={{fontWeight:'bold'}}>
                                            <td>First Name</td>
                                            <td>Last Name</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            <td>Action</td>
                                        </tr>
                                        <tr>
                                            <td>Hello</td>
                                            <td>World</td>
                                            <td>Hello@world.com</td>
                                            <td>123456789</td>
                                            <td>
                                                <span style={{padding:'2px 5px'}} className='icon icon-eye'></span>
                                                <span style={{padding:'2px 5px'}} className='icon icon-delete'></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Hello</td>
                                            <td>World</td>
                                            <td>Hello@world.com</td>
                                            <td>123456789</td>
                                            <td>
                                                <span style={{padding:'2px 5px'}} className='icon icon-eye'></span>
                                                <span style={{padding:'2px 5px'}} className='icon icon-delete'></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                )
                break;

            case 'instructors':
                template=(
                    <div className='col-sm-9'>
                        <div style={{padding:'9% 0 0 0'}}>
                            <h1 style={{float:'left',margin:'20px'}}>Instructors</h1>
                            <Link style={{float:'right',margin:'20px'}} className='btn btn-primary btn-pill' to='/add-instructor'>
                                <span className='icon icon-person_add' style={{fontSize:'14px',padding:'2px 5px 0 2px'}}></span>
                                Instructor
                            </Link>
                            <div className="row">
                                <table className='table' style={{fontSize:'14px'}}>
                                    <tbody>
                                        <tr style={{fontWeight:'bold'}}>
                                            <td>First Name</td>
                                            <td>Last Name</td>
                                            <td>Course</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            <td>Action</td>
                                        </tr>
                                        <tr>
                                            <td>Hello</td>
                                            <td>World</td>
                                            <td>Schores</td>
                                            <td>Hello@world.com</td>
                                            <td>123456789</td>
                                            <td>
                                                <span style={{padding:'2px'}} className='icon icon-edit'></span>
                                                <span style={{padding:'2px'}} className='icon icon-eye'></span>
                                                <span style={{padding:'2px'}} className='icon icon-delete'></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Hello</td>
                                            <td>World</td>
                                            <td>Schores</td>
                                            <td>Hello@world.com</td>
                                            <td>123456789</td>
                                            <td>
                                                <span style={{padding:'2px'}} className='icon icon-edit'></span>
                                                <span style={{padding:'2px'}} className='icon icon-eye'></span>
                                                <span style={{padding:'2px'}} className='icon icon-delete'></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                )
                break;

            case 'feeds':
                template=(
                    <div className='col-sm-9'>
                        <div style={{padding:'9% 0 0 0'}}>
                            <h1 style={{margin:'20px'}}>News Feeds</h1>
                            <div className="row">
                                <div className='col-sm-2'>
                                    <img className='img img-responsive' src='/images/header-img.png' alt='Avatar'/>
                                </div>
                                <div className='col-sm-10'>
                                    <form>
                                        <div className='form-group'>
                                            <textarea style={{width:'100%',borderRadius:'5px',border:'2px solid #4d4d50'}} className="form-control" cols='20' rows='3' placeholder='write your message here'></textarea>
                                        </div>
                                        <div className='row'>
                                            <div className='col-xs-3'>
                                                <div className='col-xs-6'>
                                                    <input id='photo' type='file'/>
                                                    <label htmlFor='photo'>
                                                        <span className="icon icon-camera"></span>
                                                    </label>
                                                </div>
                                                <div className='col-xs-6' style={{paddingLeft:'0'}}>
                                                    <input id='video' type='file'/>
                                                    <label htmlFor='video'>
                                                        <span className="icon icon-video-camera"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-xs-6'></div>
                                            <div className='col-xs-3'>
                                                <input type='submit' style={{padding:'5px',float:'right'}} value='Post Feed' className="btn btn-white"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <h1 style={{fontSize:'30px',color:'#d6d3d3',margin:'20px',textAlign:'center'}}>Recent Updates</h1>
                                <div style={{background:'#1918289c',border:'#0ea0a030 2px solid',borderRadius:'10px',margin:'5px',padding:'10px'}} className="row">
                                    <div className='col-sm-2'>
                                        <img className='img img-responsive' src='/images/header-img.png' alt='Avatar'/>
                                    </div>
                                    <div className="col-sm-10">
                                        <div>
                                            <b style={{fontSize:'18px'}}>Ogenrwot Aaron</b>
                                            <i style={{padding:'0px 5px',fontSize:'12px'}}>09 October 2019</i>
                                        </div>
                                        <p style={{marginTop:'0'}}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa nulla sed quis rerum amet natus quas necessitatibus.
                                        </p>
                                        <div>
                                            <img className="img img-responsive" src='/images/card.jpg' alt='post_image'/>
                                        </div>
                                        <div style={{marginTop:'10px'}}>
                                            <span style={{padding:'5px',fontWeight:'bold',fontSize:'12px'}} className="icon icon-thumbs-o-up"> Like</span>
                                            <span style={{padding:'5px',fontWeight:'bold',fontSize:'12px'}} className="icon icon-reply"> Reply</span>
                                            <span style={{padding:'5px',fontWeight:'bold',fontSize:'12px'}} className="icon icon-share2"> Share</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;

            case 'mail':
                template=(
                    <div className='col-sm-9'>
                        <div style={{padding:'9% 0 0 0'}}>
                        <h1 style={{float:'left',margin:'20px'}}>Messages</h1>
                            <Link style={{float:'right',margin:'20px'}} className='btn btn-primary btn-pill' to='/add-instructor'>
                                <span className='icon icon-mail_outline' style={{fontSize:'14px',padding:'2px 5px 0 2px'}}></span>
                                Message
                            </Link>
                        <div className="row" style={{background:'#1918289c',border:'#0ea0a030 2px solid',borderRadius:'0 0 10px 10px',margin:'5px',padding:'10px'}}>
                            <table className='table' style={{fontSize:'14px'}}>
                                    <tbody>
                                        <tr style={{fontWeight:'bold'}}>
                                            <td>Sender</td>
                                            <td>Subject</td>
                                            <td>Date</td>
                                            <td>Action</td>
                                        </tr>
                                        <tr>
                                            <td>Okello Okello</td>
                                            <td>Regards</td>
                                            <td>May 15</td>
                                            <td>
                                                <span style={{padding:'2px 5px'}} className='icon icon-eye'></span>
                                                <span style={{padding:'2px 5px'}} className='icon icon-delete'></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                )
                break;
        
            default:
                template=(
                    <div className='col-sm-9'>
                        <div style={{padding:'9% 0 0 0'}}>
                            <h1>Dashboard</h1>
                            <div className="row" id='dash'>
                                <Link to='/dashboard/courses'>
                                    <div className="col-sm-4" style={{textAlign:"center",background:'white',paddingTop:'3%',border:'#191828 solid 3px',borderRadius:'6px'}}>
                                        <span className="icon icon-university" style={{fontSize:'50px',color:'#191828'}}></span>
                                        <h2 style={{color:'#191828',fontSize:'25px',margin:'0'}}>3</h2>
                                        <p style={{color:'#565661',margin:'5px 0'}}>Courses</p>
                                    </div>
                                </Link>
                                <Link to='/dashboard/students'>
                                    <div className="col-sm-4" style={{textAlign:"center",background:'white',paddingTop:'3%',border:'#191828 solid 3px',borderRadius:'6px'}}>
                                        <span className="icon icon-graduation-cap" style={{fontSize:'50px',color:'#191828'}}></span>
                                        <h2 style={{color:'#191828',fontSize:'25px',margin:'0'}}>43</h2>
                                        <p style={{color:'#565661',margin:'5px 0'}}>Students</p>
                                    </div>
                                </Link>
                                <Link to='/dashboard/instructors'>
                                    <div className="col-sm-4" style={{textAlign:"center",background:'white',paddingTop:'3%',border:'#191828 solid 3px',borderRadius:'6px'}}>
                                        <span className="icon icon-users" style={{fontSize:'50px',color:'#191828'}}></span>
                                        <h2 style={{color:'#191828',fontSize:'25px',margin:'0'}}>2</h2>
                                        <p style={{color:'#565661',margin:'5px 0'}}>Instructors</p>
                                    </div>
                                </Link>
                                
                            </div>
                        </div>
                        
                    </div>
                )
                break;
        }

        return template;
    }

    return(
        <div 
            style={{
                backgroundImage:'url("/images/hero.jpg")',
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                backgroundAttachment:'fixed'
            }}
        >
            <div style={{background:'rgba(7,6,28,0.88)',height:'100%'}}>
                <div className='row' style={{width:'100%'}}>
                    <div className='col-sm-3'>
                        <div style={{padding:'32% 0 0 0'}}>
                            <SideNav/>
                        </div>
                    </div>
                    {renderDashboard()}
                </div> 
            </div>
            
        </div>
    )
}

export default Dashboard;
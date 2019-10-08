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
                height:'100vh',
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
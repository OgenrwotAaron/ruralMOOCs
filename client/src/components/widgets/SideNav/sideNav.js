import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const SideNav = (props)=> {

    const logout=(e)=>{
        e.preventDefault();
        axios.get('/api/logout')
        .then(res=>{
            window.location.assign('/')
        })
        .catch(err=>console.error(err))
    }

    return(
        <div style={{padding:'0'}}>
            <div style={{background:'white'}}>
                <ul id="board">
                    <li>
                        <Link style={{color:'rgb(25,24,40)'}} to='/dashboard'>
                            <span style={{padding:'0 5px'}} className='icon icon-bar-chart'></span>
                            Dashboard
                        </Link>
                    </li>
                    <hr/>
                    {/* <li>
                        <Link style={{color:'rgb(25,24,40)'}} to='/dashboard/programs/1'>
                            <span style={{padding:'0 5px'}} className='icon icon-th-large'></span>
                            Programs
                        </Link>
                    </li> */}
                    <li>
                        <Link style={{color:'rgb(25,24,40)'}} to={`/dashboard/courses/${props.user.role}`}>
                            <span style={{padding:'0 5px'}} className='icon icon-apps'></span>
                            Courses
                        </Link>
                    </li>
                    <hr/>
                    <li>
                        <Link style={{color:'rgb(25,24,40)'}} to={`/dashboard/students/${props.user.role}`}>
                            <span style={{padding:'0 5px'}} className='icon icon-users'></span>
                            Students
                        </Link>
                    </li>
                    <li>
                        {   props.user.role===2?
                                <Link style={{color:'rgb(25,24,40)'}} to={`/dashboard/instructors/${props.user.role}`}>
                                    <span style={{padding:'0 5px'}} className='icon icon-id-card'></span>
                                    Instructors
                                </Link>
                                :
                                null
                        }
                        
                    </li>
                    <hr/>
                    {/* <li>
                        <Link style={{color:'rgb(25,24,40)',display:'none'}} to='/dashboard/feeds/1'>
                            <span style={{padding:'0 5px'}} className='icon icon-feed'></span>
                            News Feed
                        </Link>
                    </li> */}
                    <li>
                        {
                            props.user.role===2?
                                <Link style={{color:'rgb(25,24,40)'}} to='/dashboard/mail/1'>
                                    <span style={{padding:'0 5px'}} className='icon icon-mail_outline'></span>
                                    Inbox
                                </Link>
                                :
                                null
                        }
                    </li><li>
                        <Link style={{color:'rgb(25,24,40)'}} to={`/profile/${props.user._id}`}>
                            <span style={{padding:'0 5px'}} className='icon icon-user-o'></span>
                            Profile
                        </Link>
                    </li>
                    <hr/>
                    <li>
                        <button onClick={(e)=>logout(e)} style={{border:'none',background:'none',color:'rgb(25,24,40)'}} to='/dashboard/mail/1'>
                            <span style={{padding:'0 5px'}} className='icon icon-exit_to_app'></span>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav;
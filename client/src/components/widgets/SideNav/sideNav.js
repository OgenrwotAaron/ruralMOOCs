import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

class SideNav extends Component{
    render(){
        return(
            <div style={{padding:'0'}}>
                <div style={{background:'rgb(25,24,40)'}}>
                    <ul id="board">
                        <li>
                            <Link style={{color:'white'}} to='/dashboard'>
                                <span style={{padding:'0 5px'}} className='icon icon-bar-chart'></span>
                                Dashboard
                            </Link>
                        </li>
                        <hr/>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/courses/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-apps'></span>
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/students/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-users'></span>
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/instructors/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-id-card'></span>
                                Instructors
                            </Link>
                        </li>
                        <hr/>
                        <li>
                            <Link style={{color:'white',display:'none'}} to='/dashboard/feeds/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-feed'></span>
                                News Feed
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/mail/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-mail_outline'></span>
                                Inbox
                            </Link>
                        </li>
                        <hr/>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/mail/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-exit_to_app'></span>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SideNav;
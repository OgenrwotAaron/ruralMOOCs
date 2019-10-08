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
                                Dashboard
                            </Link>
                        </li>
                        <hr/>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/courses'>
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/students'>
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/instructors'>
                                Instructors
                            </Link>
                        </li>
                        <hr/>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/feeds'>
                                News Feed
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'white'}} to='/dashboard/mail'>
                                Inbox
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SideNav;
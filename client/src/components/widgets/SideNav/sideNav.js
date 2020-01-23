import React,{ Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SideNav extends Component{

    logout=(e)=>{
        e.preventDefault();
        axios.get('/api/logout')
        .then(res=>{
            window.location.assign('/')
        })
        .catch(err=>console.log(err))
    }

    render(){
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
                        <li>
                            <Link style={{color:'rgb(25,24,40)'}} to='/dashboard/courses/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-apps'></span>
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'rgb(25,24,40)'}} to='/dashboard/students/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-users'></span>
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'rgb(25,24,40)'}} to='/dashboard/instructors/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-id-card'></span>
                                Instructors
                            </Link>
                        </li>
                        <hr/>
                        <li>
                            <Link style={{color:'rgb(25,24,40)',display:'none'}} to='/dashboard/feeds/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-feed'></span>
                                News Feed
                            </Link>
                        </li>
                        <li>
                            <Link style={{color:'rgb(25,24,40)'}} to='/dashboard/mail/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-mail_outline'></span>
                                Inbox
                            </Link>
                        </li><li>
                            <Link style={{color:'rgb(25,24,40)'}} to={`/profile/${this.props.user._id}`}>
                                <span style={{padding:'0 5px'}} className='icon icon-user-o'></span>
                                Profile
                            </Link>
                        </li>
                        <hr/>
                        <li>
                            <button onClick={(e)=>this.logout(e)} style={{border:'none',background:'none',color:'rgb(25,24,40)'}} to='/dashboard/mail/1'>
                                <span style={{padding:'0 5px'}} className='icon icon-exit_to_app'></span>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default SideNav;
import React,{ useEffect,useState} from 'react';
import axios from 'axios'

import Jumbotron from '../Jumbotron/jumbotron';
import { Link } from 'react-router-dom';

const UserProfile = (props) => {

    let [user,setUser]=useState();

    useEffect(()=>{
        axios.get(`/api/user/${props.match.params.id}`)
        .then(res=>{
            setUser(res.data[0])
        })
        .catch(e=>{
            setUser(false)
        })
    },[props])

    if(!user){
        return null;
    }

    if(props.match.params.id===props.user.user._id){
        props.history.push(`/profile/${props.user.user._id}`)
    }

    return ( 
        <div>
            <Jumbotron type="profile"/>
            <div className="row" style={{width:'100%',margin:'0'}}>
                <div className="col-sm-3">
                    <div data-aos="fade-up" data-aos-duration="500" style={{background:'white',border:'1px solid #343a4030',borderTop:'0',paddingBottom:'20px'}}>
                            <div style={{
                                height:'200px',
                                width:'200px',
                                overflow:'hidden',
                                backgroundImage:'url(/images/coverProfile.jpg)',
                                position:'absolute',
                                top:'-210px',
                                borderRadius:'50%',
                                border:'solid',
                                left:'20px',
                                boxShadow:'black 1px 1px 10px',
                                backgroundSize:'cover'
                                }}>
                                
                            </div>
                            <div style={{textAlign:'center'}}>
                                <h2 style={{color:'#4c4c4c',margin:'5px 0'}}>{user.fname} {user.lname}</h2>
                                <div style={{color:'#6d6d6d',fontSize:'15px',padding:'0 5px 5px 5px',fontWeight:'bold',borderRight:'2px solid white'}}>{user.email}</div>
                                <div style={{color:'#6d6d6d',fontSize:'15px',padding:'0 5px 5px 5px',fontWeight:'bold',borderRight:'2px solid white'}}>{user.phone}</div>
                                <Link to={`/inbox/${user.id}`}>
                                    <span style={{fontSize:'25px',color:'#03a9f0'}} className="icon icon-chat"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                <div className="col-sm-9">
                    <ul className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab" href="#topics">Activities</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="topics" className="tab-pane fade in active well">
                            <br/>
                            <h3 style={{textTransform:'capitalize'}}>{user.fname}'s activities</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default UserProfile;
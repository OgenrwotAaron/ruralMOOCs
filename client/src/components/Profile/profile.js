import React,{useEffect,useState} from 'react';

import Jumbotron from '../Jumbotron/jumbotron';
import ProfileForm from './profileForm';

const Profile = (props) => {
    let [user,setUser]=useState();

    useEffect(()=>{
        setUser(props.user.user)
    },[props])


    const uploadPhoto=(event)=>{
        console.log(event.target.files[0])
    }

    if(!user){
        return null;
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
                                <input onChange={(e)=>uploadPhoto(e)} id='photo' type='file'/>
                                <label htmlFor='photo'>
                                    <span className="icon icon-camera"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                <div className="col-sm-9">
                    <ul className="nav nav-tabs">
                        <li><a data-toggle="tab" href="#settings">Edit Profile</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="settings" className="tab-pane fade in active well">
                            <br/>
                            <h3>Edit Profile</h3>
                            <ProfileForm {...props}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;
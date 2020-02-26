import React,{ useEffect,useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const InstructorCard = (props) => {

    let [instructor,setInstructor]=useState()

    useEffect(()=>{
        if(props.id===undefined){
            console.error('Error fetching Instructor')
        }else{
            axios.get(`/api/user/${props.id}`)
            .then(res=>{
                setInstructor(res.data[0])
            })
        }
        
    },[props.id])
    if(!instructor){
        return null;
    }
    return ( 
        <div id="instructor-card" className='card' style={{textAlign:'center',padding:'10px',margin:'10px',border:'1px solid #e4dcdc',borderRadius:'5px'}}>
            <b style={{color:'#555',fontSize:'18px'}}>Course Instructor</b>
            <hr/>
            <Link to={`/user-profile/${instructor.id}`}>
                <img alt='instructor' src={instructor.avatar? instructor.avatar:'/images/agriculture.jpg'} style={{width:'50px',height:'50px',borderRadius:'50%'}}/>
                <p style={{color:'#555',fontWeight:'bold',fontSize:'18px',margin:'0'}}>{`${instructor.fname} ${instructor.lname}`}</p>
            </Link>
            <p style={{color:'#5f5e5e',fontSize:'16px',margin:'0'}}>{`Email: ${instructor.email}`}</p>
            <Link to={`/inbox/${instructor.id}`}>
                <span style={{fontSize:'25px',color:'#03a9f0'}} className="icon icon-chat"></span>
            </Link>
        </div>
    );
}

const propsAreEqual=(prevProps,nextProps)=>{
    return prevProps.id===nextProps.id
}
 
export default React.memo(InstructorCard,propsAreEqual);
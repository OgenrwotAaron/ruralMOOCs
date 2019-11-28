import React,{ useEffect,useState} from 'react';
import axios from 'axios'

const Card = ({item}) => {

    let [instructors,setInstructors]=useState()

    useEffect(()=>{
        axios.get(`/api/user/${item.metadata.instructor}`)
        .then(res=>{
            setInstructors(res.data)
        })
    },[item.metadata.instructor])
    if(!instructors){
        return null;
    }

    return (
        <div data-aos="fade-up" data-aos-duration="500" className='cards'>
            <div style={{background:'white',marginTop:'25px',border:'1px solid #343a4030',borderTop:'0',paddingBottom:'20px'}}>
                <div style={{height:'200px',overflow:'hidden'}}>
                    <img style={{width:'100%'}} className='img-responsive' alt='card' src={`/api/image/${item.filename}`}/>
                </div>
                <div style={{height:'120px'}}>
                    <h2>{item.metadata.course}</h2>
                    <p style={{color:'gray'}}>{item.metadata.description}</p>
                    <div>{item.metadata.duration}</div>
                    <div>
                        {
                            instructors.map(ite=>{
                                return ite.id===item.metadata.instructor ? 
                                    `${ite.fname} ${ite.lname}`
                                    :
                                    'null'
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
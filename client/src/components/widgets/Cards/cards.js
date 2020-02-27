import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

const Card = ({item,type}) => {

    let [instructors,setInstructors]=useState();

    useEffect(()=>{
        axios.get(`/api/user/${item.metadata.instructor}`)
        .then(res=>{
            setInstructors(res.data)
        })
    },[item]);
    
    if(!instructors){
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading</span>
            </div>
        );
    }

    const renderCard=()=>{
        let template=null;
        switch(type){
            case 'category':
                template=(
                    <div style={{background:'white',marginTop:'25px',border:'1px solid #343a4030',borderTop:'0',paddingBottom:'20px'}}>
                        <div style={{height:'100px',overflow:'hidden'}}>
                            <img style={{width:'100%'}} className='img-responsive' alt='card' src={`/api/image/${item.filename}`}/>
                        </div>
                        <div style={{height:'70px',textAlign:'center'}}>
                            <h2>{item.metadata.course}</h2>
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <div style={{color:'#03a9f0',padding:'0 5px',fontWeight:'bold',borderRight:'2px solid white'}}>{item.metadata.duration}</div>
                            </div> 
                        </div>
                    </div>
                )
            break;
            default:
                template=(
                    <div style={{background:'white',marginTop:'25px',border:'1px solid #343a4030',borderTop:'0',paddingBottom:'20px'}}>
                        <div style={{height:'200px',overflow:'hidden'}}>
                            <img style={{width:'100%'}} className='img-responsive' alt='card' src={`/api/image/${item.filename}`}/>
                        </div>
                        <div style={{height:'120px'}}>
                            <h2>{item.metadata.course}</h2>
                            <div style={{display:'flex',justifyContent:'center'}}>
                                <div style={{color:'#03a9f0',padding:'0 5px',fontWeight:'bold',borderRight:'2px solid white'}}>{item.metadata.duration}</div>
                            </div>  
                            <div>
                                {
                                    instructors.map(ite=>{
                                        return ite.id===item.metadata.instructor ? 
                                            `By ${ite.fname} ${ite.lname}`
                                            :
                                            'null'
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            break;
        }

        return template;
    }

    return (
        <div data-aos="fade-up" data-aos-duration="500" className="cards">
            <div className="card-in">
               {renderCard()} 
            </div>                                                                                                                                                                         
        </div>
    );
};

Card.propTypes={
    item:PropTypes.object,
    type:PropTypes.string
}

export default Card;
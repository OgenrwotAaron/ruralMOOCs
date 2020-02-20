import React from 'react';
import { Link } from 'react-router-dom';

const Topics = (props) => {
    const topic=props.topic;
    return ( 
        <div className='row' style={{padding:'10px',borderBottom:'solid 1px lightgray'}}>
            <Link to={`/video/${topic._id}`}>
                <div className='col-xs-2' style={{background:`url("${topic.poster}")`,backgroundSize:'cover',width:'50px',height:'50px',padding:'0',textAlign:'center'}}>
                    <span style={{color:'white',fontSize:'40px',textAlign:'center',background:'linear-gradient(90deg, transparent, #00000038, transparent)'}} className='icon icon-play-circle-o'></span>
                </div>
                <div className='col-xs-10'>
                    <p style={{color:'#565555',fontWeight:'bold',margin:'0'}}>{topic.title}</p>
                    <p style={{margin:'0',color:'#565555',float:'right'}}>{`${Math.round((topic.duration/60)*10)/10} mins`}</p>
                </div>
            </Link>
        </div>
    );
}
 
export default Topics;
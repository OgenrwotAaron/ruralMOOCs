import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Cards/cards';

const CatDefault = (props) => {
    let { courses } = props.courses;
    if(!courses) return <h1 style={{textAlign:'center'}}>Loading...</h1>;
    let cat={},cats=[]

    courses.forEach(item => {
        cat[item.metadata.category]=[]; 
    });

    courses.forEach(item => {
        cat[item.metadata.category].push(item); 
    });

    

    const renderCategories=()=>{
        for (const key in cat) {
            cats.push(key)
        }
        return cats.map((item,i)=>(
            <div key={i}>
                <h1 style={{paddingLeft:'10px',marginBottom:'0'}}>{item}</h1>
                <hr style={{margin:'0',borderTop:'2px solid #dddff5'}}/>
                <div className="row" style={{width:'100%', marginLeft:'0',color:'#1e486d'}}>
                    {cat[item].map((it,i)=>(
                        <div key={i} className="col-sm-4">
                            <Link to={`/course/${it._id}`}>
                                <Card item={it} type="category"/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            
        ))
        
    }
    
    return ( 
        <div style={{color:'black'}}>
            {renderCategories()}
        </div>
     );
}
 
export default CatDefault;
import React,{ Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Card from '../widgets/Cards/cards';

class Courses extends Component {

    state={
        courses:[]
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentDidMount() {
        axios.get('/api/courses')
        .then(response=>{
            this.setState({
                courses:response.data
            })
        })
    }

    renderCourses=(data)=>{
       return data.slice(0,3).map((item,i)=>
            (
            <div key={i}>
                <div className='col-sm-4'>
                    <Link to={`/course/${item._id}`}>
                        <Card item={item}/>
                    </Link>
                </div>
            </div>
            
        ))
    }

    render(){
        return (
            <div style={{textAlign:'center'}}>
                <div  style={{margin:'0'}}>
                <h1 style={{color:'#163550',marginBottom:'0'}} data-aos="fade-in" data-aos-duration="500">Available MOOCs</h1>
                <hr style={{borderTop:'2px solid #1e486d',width:'8%',marginTop:'0'}}/>
                </div>
                <div className='row' style={{width:'100%', marginLeft:'0',color:'#1e486d'}}>
                    {this.renderCourses(this.state.courses)}
                    {/* <div className='col-sm-4'>
                        <Link to='/'>
                            <Card/>
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/'>
                            <Card/>
                        </Link>
                    </div>
                    <div className='col-sm-4'>
                        <Link to='/'>
                            <Card/>
                        </Link>
                    </div> */}
                </div>
            </div>
        );
    }
};

export default Courses;
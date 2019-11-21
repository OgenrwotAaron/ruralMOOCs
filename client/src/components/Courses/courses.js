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
                <div  style={{backgroundColor:'#337ab7',margin:'0',padding:'5%',borderRadius:'0 0 100% 100%'}}>
                <h1 data-aos="fade-in" data-aos-duration="500">Availabble MOOCs</h1>
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
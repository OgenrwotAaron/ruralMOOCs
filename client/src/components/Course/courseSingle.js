import React,{ Component} from 'react';
import Jumbotron from '../Jumbotron/jumbotron';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InstructorCard from '../widgets/InstructorCard/instructorCard';

class CourseSingle extends Component {

    state={
        item:''
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        axios.get(`/course/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                item:res.data
            })
        })
    }

    render(){
        if(this.state.item === ''){
            return null;
        }
        return ( 
            <div>
                <Jumbotron type='category' title={`${this.state.item.metadata.course}`} image={`/image/${this.state.item.filename}`}/>
                <Link id='playvid' style={{fontSize:'45px',position:'absolute',zIndex:'1',bottom:'52%',left:'5%',color:'#ffffffab'}} to={`/video/${this.state.item._id}`}>
                    <span className="icon icon-play_circle_outline"></span>
                </Link>
                <Link id='addvid' style={{fontSize:'18px',position:'absolute',zIndex:'1',bottom:'52%',right:'5%',color:'#ffffffab'}} to={`/addTopic/${this.state.item._id}`}>  
                    <span className="icon icon-playlist_add"></span>
                    Add topic
                </Link>
                <div className='row' style={{width:'100%',margin:'0'}}>
                    <div className='col-sm-3'>
                        <div className='card' style={{textAlign:'center',padding:'10px',margin:'10px',border:'1px solid #e4dcdc',borderRadius:'5px'}}>
                            <b style={{color:'#555',fontSize:'18px'}}>{this.state.item.metadata.course}</b>
                            <p style={{color:'#5f5e5e',fontSize:'16px',margin:'0',}}>{this.state.item.metadata.description}</p>
                            <p style={{color:'#555',fontSize:'18px'}}>{this.state.item.metadata.duration}</p>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='row' style={{padding:'10px',borderBottom:'solid 1px lightgray'}}>
                            <div className='col-sm-2' style={{background:'url("/images/about.jpg")',backgroundSize:'cover'}}>
                                <span style={{fontSize:'50px',textAlign:'center',background:'linear-gradient(90deg, transparent, #00000038, transparent)'}} className='icon icon-play-circle-o'></span>
                            </div>
                            <div className='col-sm-10'>
                                <p style={{color:'#565555',fontWeight:'bold',marginTop:'0'}}>title</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3'>
                        <InstructorCard id={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default CourseSingle;
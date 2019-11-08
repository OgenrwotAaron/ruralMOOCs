import React,{ Component} from 'react';
import Jumbotron from '../Jumbotron/jumbotron';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InstructorCard from '../widgets/InstructorCard/instructorCard';
import Topics from '../widgets/Topics/topics';

class CourseSingle extends Component {

    state={
        item:'',
        topics:[]
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentDidMount() {
        axios.get(`/api/course/${this.props.match.params.id}`)
        .then(res=>{
            axios.get(`/api/topics/${res.data._id}`)
            .then(resp=>{
                this.setState({
                    item:res.data,
                    topics:resp.data
                })
            })
            .catch(err=>console.log(err))
        })
        .catch(error=>console.log(error))
    }

    renderTopics=(topics)=>{
        if(topics.error){
            return null;
        }else{
            return topics.map((topic,i)=>(
                <Topics topic={topic} key={i}/>
            ))
        }
    }

    render(){
        if(this.state.item === ''){
            return null;
        }
        return ( 
            <div>
                <Jumbotron type='category' title={`${this.state.item.metadata.course}`} image={`/api/image/${this.state.item.filename}`}/>
                {this.state.topics.error ==="No files exist" ? null:<Link data-aos='fade' data-aos-duration='700' id='playvid' style={{fontSize:'45px',position:'absolute',zIndex:'1',bottom:'52%',left:'5%',color:'#ffffffab'}} to={`/video/${this.state.topics[0]._id}`}>
                    <span className="icon icon-play_circle_outline"></span>
                </Link>}
                <Link data-aos='fade' data-aos-duration='700' id='addvid' style={{fontSize:'18px',position:'absolute',zIndex:'1',bottom:'52%',right:'5%',color:'#ffffffab'}} to={`/addTopic/${this.state.item._id}`}>  
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
                        {this.renderTopics(this.state.topics)}
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
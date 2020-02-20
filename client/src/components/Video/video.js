import React, { Component } from 'react';
import axios from 'axios';

import VideoPlayer from '../widgets/VideoPlayer/videoPlayer';
import InstructorCard from '../widgets/InstructorCard/instructorCard';
import Topics from '../widgets/Topics/topics';

class Video extends Component {

    state={
        topics:''
    }

    componentDidMount() {
        axios.get(`/api/topic/${this.props.match.params.id}`)
        .then(res=>{
            axios.get(`/api/topics/${res.data.course}`)
            .then(resp=>{
                this.setState({
                    topics:resp.data
                })
            })
        })
    }

    renderTopics=(topics)=>{
        return topics.map((topic,i)=>(
            <Topics topic={topic} key={i}/>
            )
        )
    }

    render(){
        if(this.state.topics === ''){
            return null;
        }
        return ( 
            <div className='row' style={{width:'100%',margin:'10% 0 0 0'}}>
                <div id='video-player' className='col-sm-8'>
                    <VideoPlayer {...this.props} source={this.props.match.params.id}/>
                </div>
                <div className='col-sm-4'>
                    <InstructorCard/>
                    {this.renderTopics(this.state.topics)}
                </div>
            </div>
        );
    }
}
 
export default Video;
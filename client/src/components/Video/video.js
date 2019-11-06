import React from 'react';
import VideoPlayer from '../widgets/VideoPlayer/videoPlayer';

const Video = (props) => {
    return ( 
        <div className='row'>
            <div className='col-md-8'>
                <VideoPlayer source={props.match.params.id}/>
                tabs
            </div>
            <div className='col-md-4'>
                instructor
                videos/topics
            </div>
        </div>
    );
}
 
export default Video;
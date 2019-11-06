import React, { Component } from 'react';
import shaka from 'shaka-player';
import axios from 'axios';

class VideoPlayer extends Component {
    state={
        video:''
    }
    componentDidMount() {
        axios.get(`/api/topic/${this.props.source}`)
        .then(res=>{
            this.setState({
                video:res.data
            })

            shaka.polyfill.installAll();
            if(shaka.Player.isBrowserSupported()){
                this.initPlayer();
            }else{
                console.error('Browser not supported')
            }
        })

        
    }

    initPlayer=()=>{
        const manifest=this.state.video.video;
        console.log(manifest.substring(manifest.lastIndexOf('/')))
        const video= document.getElementById('video')
        const player=new shaka.Player(video);
        player.addEventListener('error',this.onErrorEvent);

        player.load(manifest)
        .then(()=>{
            console.log('Video has been loaded')
        })
        .catch(this.onError)
    }

    onErrorEvent=(event)=>{
        this.onError(event.detail)
    }

    onError=(error)=>{
        console.error('Error code: ',error.code,'object',error)
    }

    render() { 
        return ( 
            <div>
                <video
                    id='video'
                    width='640'
                    controls
                ></video>
            </div> 
        );
    }
}
 
export default VideoPlayer;
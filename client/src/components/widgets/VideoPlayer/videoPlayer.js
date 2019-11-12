import React, { Component } from 'react';
//import shaka from 'shaka-player';
import axios from 'axios';
import 'shaka-player/dist/controls.css';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

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
        let folder=manifest.substring(manifest.lastIndexOf('pictures/')+9,manifest.lastIndexOf('/')-6);
        const vid=`https://moocsvids.s3-eu-west-2.amazonaws.com/pictures/${folder}/${folder}.mpd`
        
        const video= document.getElementById('video')
        const videoContainer=document.getElementById('videoContainer')

        const uiConfig={}
        uiConfig['controlPanelElements']=['mute', 'volume', 'time_and_duration', 'fullscreen', 'overflow_menu']


        const player=new shaka.Player(video);
        const ui=new shaka.ui.Overlay(player,videoContainer,video);

        ui.configure(uiConfig);
        ui.getControls();
        player.addEventListener('error',this.onErrorEvent);

        player.load(vid)
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
            <div id='videoContainer'>
                <video
                    style={{position:'relative'}}
                    width='100%'
                    id='video'
                    poster={this.state.video.poster}
                ></video>
            </div> 
        );
    }
}
 
export default VideoPlayer;
import React, { Component } from "react";
//import shaka from 'shaka-player';
import axios from "axios";
import "shaka-player/dist/controls.css";
import Discussions from "../Discussions/discussions";
import Comment from "../Comment/comment";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

class VideoPlayer extends Component {
  state = {
    video: "",
  };
  componentDidMount() {
    axios.get(`/api/topic/${this.props.source}`).then((res) => {
      this.setState({
        video: res.data,
      });
      shaka.polyfill.installAll();
      if (shaka.Player.isBrowserSupported()) {
        this.initPlayer();
      } else {
        console.error("Browser not supported");
      }
    });
  }

  initPlayer = () => {
    const manifest = this.state.video.video;
    let folder = manifest.substring(
      manifest.lastIndexOf("pictures/") + 9,
      manifest.lastIndexOf("/") - 6
    );
    const vid = `https://dashmoocsvids.s3-eu-west-2.amazonaws.com/pictures/${folder}/${folder}.mpd`;

    const video = document.getElementById("video");
    const videoContainer = document.getElementById("videoContainer");

    const uiConfig = {};
    uiConfig["controlPanelElements"] = [
      "mute",
      "volume",
      "time_and_duration",
      "fullscreen",
      "overflow_menu",
    ];

    const player = new shaka.Player(video);
    const ui = new shaka.ui.Overlay(player, videoContainer, video);

    ui.configure(uiConfig);
    ui.getControls();
    player.addEventListener("error", this.onErrorEvent);

    player
      .load(vid)
      .then(() => {})
      .catch(this.onError);
  };

  onErrorEvent = (event) => {
    this.onError(event.detail);
  };

  onError = (error) => {
    console.error("Error code: ", error.code, "object", error);
  };

  componentWillUnmount() {}

  render() {
    return (
      <>
        <div id="videoContainer">
          <video
            style={{ position: "relative" }}
            width="100%"
            id="video"
            poster={this.state.video.poster}
          ></video>
        </div>
        <div>
          <h3 style={{ margin: "10px 0", textDecoration: "underline" }}>
            Description:
          </h3>
          <p style={{ color: "#333" }}>{this.state.video.description}</p>
        </div>
        <ul className="nav nav-tabs">
          <li className="active">
            <a data-toggle="tab" href="#topics">
              Streaming Comments
            </a>
          </li>
          {/* <li><a data-toggle="tab" href="#discussions">Content Comments</a></li> */}
          <li>
            <a data-toggle="tab" href="#files">
              Files
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#tests">
              Tests
            </a>
          </li>
        </ul>
        <div style={{ color: "black" }} className="tab-content">
          <div id="topics" className="tab-pane fade in active">
            <br />
            <h3>Streaming comments go here</h3>
            <Comment type="topic-stream" {...this.props} />
            <Discussions type="topic-stream" {...this.props} />
          </div>
          <div id="discussions" className="tab-pane fade">
            <br />
            <h3>Content comments go here</h3>
            {/* <Comment type="topic-content" {...this.props}/>
                        <Discussions type="topic-content" {...this.props}/> */}
          </div>
          <div
            style={{ textAlign: "center", color: "#333" }}
            id="files"
            className="tab-pane fade well well-lg"
          >
            <h3>No topic files available</h3>
          </div>
          <div
            style={{ textAlign: "center", color: "#333" }}
            id="tests"
            className="tab-pane fade well well-lg"
          >
            <h3>No tests Available</h3>
          </div>
        </div>
      </>
    );
  }
}

export default VideoPlayer;

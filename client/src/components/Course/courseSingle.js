import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { socket } from "../Header/header";

import Jumbotron from "../Jumbotron/jumbotron";
import InstructorCard from "../widgets/InstructorCard/instructorCard";
import Topics from "../widgets/Topics/topics";
import Discussions from "../widgets/Discussions/discussions";
import Comment from "../widgets/Comment/comment";

class CourseSingle extends Component {
  state = {
    item: "",
    topics: [],
    enrolled: false,
  };

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    axios
      .get(`/api/course/${this.props.match.params.id}`)
      .then((res) => {
        axios
          .get(`/api/topics/${res.data._id}`)
          .then((resp) => {
            console.log(res.data);
            this.setState({
              item: res.data,
              topics: resp.data,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  }

  renderTopics = (topics) => {
    if (topics.error) {
      return null;
    } else {
      return topics.map((topic, i) => <Topics topic={topic} key={i} />);
    }
  };

  enroll = (courseId) => {
    socket.emit("enroll_to_course", {
      course: courseId,
      user: this.props.user.user._id,
    });
    socket.on("enrolled_to_course", (status) => {
      this.setState({ enrolled: status.success });
    });
  };

  render() {
    if (this.state.item === "") {
      return null;
    }

    return (
      <div>
        <Jumbotron
          type="category"
          title={`${this.state.item.metadata.course}`}
          image={`/api/image/${this.state.item.filename}`}
        />
        {this.state.topics.error === "No files exist" ? null : (
          <Link
            data-aos="fade"
            data-aos-duration="700"
            id="playvid"
            style={{
              fontSize: "45px",
              position: "absolute",
              zIndex: "1",
              bottom: "52%",
              left: "5%",
              color: "#ffffffab",
            }}
            to={`/video/${this.state.topics[0]._id}`}
          >
            <span className="icon icon-play_circle_outline"></span>
          </Link>
        )}
        {this.props.user.isAuth &&
        (this.props.user.user.role === 1 || this.props.user.user.role === 2) ? (
          <Link
            data-aos="fade"
            data-aos-duration="700"
            id="addvid"
            style={{
              fontSize: "18px",
              position: "absolute",
              zIndex: "1",
              bottom: "52%",
              right: "5%",
              color: "#ffffffab",
            }}
            to={`/addTopic/${this.state.item._id}`}
          >
            <span className="icon icon-playlist_add"></span>
            Add topic
          </Link>
        ) : this.state.enrolled ? null : this.props.user.user.courses.filter(
            (a) => a === this.props.match.params.id
          ) === true ? null : (
          <button
            onClick={() => this.enroll(this.props.match.params.id)}
            data-aos="fade"
            data-aos-duration="700"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              position: "absolute",
              zIndex: "1",
              bottom: "52%",
              right: "5%",
              background: "#03a9f0",
              border: "none",
              color: "white",
            }}
          >
            Enroll
          </button>
        )}

        <div className="row" style={{ width: "100%", margin: "0" }}>
          <div className="col-sm-3">
            <div
              id="course-card"
              className="card"
              style={{
                textAlign: "center",
                padding: "10px",
                margin: "10px",
                border: "1px solid #e4dcdc",
                borderRadius: "5px",
              }}
            >
              <b style={{ color: "#555", fontSize: "18px" }}>
                {this.state.item.metadata.course}
              </b>
              <p
                style={{
                  color: "#5f5e5e",
                  overflowWrap: "break-word",
                  fontSize: "16px",
                  margin: "0",
                }}
              >
                {this.state.item.metadata.description}
              </p>
              <p style={{ color: "#555", fontSize: "18px" }}>
                {this.state.item.metadata.duration}
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <ul className="nav nav-tabs">
              <li className="active">
                <a data-toggle="tab" href="#topics">
                  Topics
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#discussions">
                  Discussions
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="topics" className="tab-pane fade in active">
                <br />
                {this.renderTopics(this.state.topics)}
              </div>
              <div id="discussions" className="tab-pane fade">
                <br />
                <h3>Comments on content go here</h3>
                <Comment type="course" {...this.props} />
                <Discussions type="course" {...this.props} />
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <InstructorCard id={this.state.item.metadata.instructor} />
          </div>
        </div>
      </div>
    );
  }
}

export default CourseSingle;

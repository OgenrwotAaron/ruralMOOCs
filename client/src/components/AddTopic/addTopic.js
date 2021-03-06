import React, { Component } from "react";
import axios from "axios";
const Uppy = require("@uppy/core");
const Transloadit = require("@uppy/transloadit");
const { Dashboard, ProgressBar } = require("@uppy/react");

class AddTopic extends Component {
  state = {
    formdata: "",
    error: false,
  };

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    axios.get(`/api/course/${this.props.match.params.id}`).then((res) => {
      this.setState({
        formdata: res.data,
      });
    });
  }

  uppy = new Uppy({
    id: "uppy",
    autoProceed: false,
    debug: true,
    restrictions: {
      allowedFileTypes: ["video/mp4"],
      maxNumberOfFiles: 1,
      minNumberOfFiles: 1,
    },
    meta: {
      course: this.props.match.params.id,
    },
  })
    .use(Transloadit, {
      params: {
        template_id: "63faa7b75c624882a12a862c043a4e53",
        auth: { key: "c330851cae3e4bbc83328eb89b2926fe" },
      },
      limit: 1,
      waitForEncoding: true,
      fields: ["course", "title", "description"],
    })
    .on("complete", (results) => {
      const metaData = results.transloadit[0];
      const videoMeta = metaData.results;
      console.log(results);
      axios
        .post("/api/addtopic", {
          title: metaData.fields.title,
          description: metaData.fields.description,
          duration: videoMeta.video_dash[0].meta.duration,
          course: metaData.fields.course,
          video: videoMeta.video_dash[1].url,
          poster: videoMeta.thumbnail[0].url,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success === false) {
            this.setState({
              error: true,
            });
          } else {
            this.props.history.push(`/course/${response.data.doc.course}`);
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: true });
        });
    });

  render() {
    if (this.state.formdata === "") {
      return null;
    }
    return (
      <div
        className="slide-1"
        style={{
          backgroundImage: `url('/api/image/${this.state.formdata.filename}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 50%",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="container jumb"
          style={{ backgroundColor: "rgba(7,6,28,0.88)", width: "100%" }}
        >
          <div className="row jumbo">
            <div className="col-sm-3"></div>
            <div
              className="col-sm-6"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <h1 style={{ textAlign: "center" }}>
                Add Topic to {`${this.state.formdata.metadata.course}`}
              </h1>
              {this.state.error === true ? (
                <div style={{ color: "red" }}>
                  Error ocurred, please try again later
                </div>
              ) : null}
              {
                <Dashboard
                  uppy={this.uppy}
                  height={400}
                  metaFields={[
                    {
                      id: "title",
                      name: "Title",
                      placeholder: "Enter topic title",
                    },
                    {
                      id: "description",
                      name: "Description",
                      placeholder: "Brief Description of the topic",
                    },
                  ]}
                  note={`Click on the edit button to add Topic title`}
                />
              }
              {<ProgressBar uppy={this.uppy} hideAfterFinish={false} />}
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTopic;

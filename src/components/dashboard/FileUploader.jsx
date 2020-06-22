import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import config from "../../scripts/config";
import { attachImage } from "./../../redux/posts/posts.actions";

class FileUploader extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      fileUploaded: false,
    };
  }

  handleFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  /** handle file uploads and generate links */
  handleUpload = (event) => {
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios
      .post(
        `${config.host}/post/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        {
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.loaded / progressEvent.total);
          },
        }
      )
      .then((resp) => {
        if (!resp.data.error) {
          this.setState({ fileUploaded: true });
          console.log(resp.data);
          this.props.attachImage(resp.data.payload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Handling file operations");
  };

  render() {
    return (
      <div className="card card-body border-light">
        <form className="form-inline">
          {this.state.fileUploaded ? (
            "Image uploaded and attached"
          ) : (
            <div>
              <div className=" mb-2 mr-sm-2">
                <div className="form-inline">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="imageUpload"
                      name="image"
                      accept="image/*"
                      onChange={this.handleFileChange}
                    />
                    <label className="custom-file-label" for="imageUpload">
                      Choose Image
                    </label>
                  </div>
                  <button
                    onClick={this.handleUpload}
                    type="button"
                    className="btn btn-outline-primary mb-2"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  attachImage: (imageName) => dispatch(attachImage(imageName)),
});

export default connect(null, mapDispatchToProps)(FileUploader);

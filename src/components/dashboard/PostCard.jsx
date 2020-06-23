import React from "react";
import { connect } from "react-redux";
import { DeletePost, EditPost } from "./../../scripts/posts";
import InputElement from "./../InputElement";
import FileUploader from "./FileUploader";

class PostCard extends React.Component {
  constructor() {
    super();
    this.state = {
      deleted: false,
      editMode: false,
      uploadMode: false,
      name: "",
      productType: "",
      content: "",
      featured: "off",
      images: [],
    };
    this.editPost = this.editPost.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.saveUploadedImage = this.saveUploadedImage.bind(this);
    this.deletePostTrigger = this.deletePostTrigger.bind(this);
    this.terminateEditMode = this.terminateEditMode.bind(this);
    this.handleEditFieldChange = this.handleEditFieldChange.bind(this);
  }

  componentDidMount = () => {
    const { name, productType, content, featured, images } = this.props;
    this.setState({
      name,
      productType,
      content,
      featured,
      images,
    });
  };

  editPost() {
    this.setState({
      editMode: true,
    });
  }

  uploadImage() {
    this.setState({
      uploadMode: true,
    });
  }

  saveUploadedImage = async () => {
    /** make update request with image url */
    const { _id, attachedImage } = this.props;
    try {
      const response = await EditPost({
        post: {
          _id: _id,
          images: [attachedImage],
        },
      });
      if (response.payload.ok) {
        this.setState({
          images: [attachedImage],
          uploadMode: false,
        });
        alert("Image Attached");
      }
    } catch (err) {
      alert("Error updating Post");
      console.log(err);
    }

    this.terminateEditMode();
  };

  deletePostTrigger() {
    DeletePost(this.props.id)
      .then((resp) => {
        if (resp.error) {
          alert("Error deleting post");
        } else {
          alert("Post Deleted ");
          this.setState({ deleted: true });
        }
      })
      .catch((err) => {
        console.log("Unexpected Error in Deleting Post");
      });
    console.log(`Deleting Post :  ${this.props.id}`);
  }

  /** to end the edit session */
  terminateEditMode = () => {
    this.setState({
      editMode: false,
    });
  };

  terminateUploadMode = () => {
    this.setState({ uploadMode: false });
  };

  saveEdits = async () => {
    const { name, productType, content, featured } = this.state;
    const { _id } = this.props;
    console.log({ name, productType, content, featured, _id });
    try {
      const response = await EditPost({
        post: {
          name,
          productType,
          content,
          featured: featured === "on" ? true : false,
          _id: _id,
        },
      });
      if (response.payload.ok) {
        alert("Post Updated");
      }
    } catch (err) {
      alert("Error updating Post");
      console.log(err);
    }

    this.terminateEditMode();
  };

  handleEditFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, content, images, featured, productType } = this.state;
    return (
      <div>
        {this.state.deleted ? null : (
          <div>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  {featured ? (
                    <span className="badge badge-pill badge-success float-right">
                      Featured
                    </span>
                  ) : (
                    <span className="badge badge-pill badge-light float-right">
                      <span className="text-muted">Not Featured</span>
                    </span>
                  )}
                  <h5>{name}</h5>
                </div>
                {productType ? (
                  <span className="badge badge-primary float-right">
                    Category: {productType}{" "}
                  </span>
                ) : null}
                <p className="card-text">{content}</p>
                <button
                  className="btn btn-outline-danger"
                  onClick={this.deletePostTrigger}
                >
                  Delete
                </button>

                {images.length ? (
                  <button className="btn btn-outline-info float-right ">
                    Show Image
                  </button>
                ) : (
                  <button
                    className="btn float-right  btn-outline-secondary"
                    onClick={this.uploadImage}
                  >
                    No Image Attached. Upload Image
                  </button>
                )}
                {this.state.editMode ? null : (
                  <button
                    className="btn btn-outline-info float-right mr-2"
                    onClick={this.editPost}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            {this.state.editMode ? (
              <div className="card text-white bg-dark mb-5 mt-2">
                <div className="card-body">
                  <h5 className="card-title">Edit Post</h5>
                  <div className="card-text">
                    <InputElement
                      label="Title"
                      placeholder="Enter new title of post"
                      type="text"
                      name="name"
                      onChange={this.handleEditFieldChange}
                      value={this.state.name}
                      required
                    />

                    <InputElement
                      label="Category"
                      placeholder="Enter the category to which this post belongs"
                      type="text"
                      name="productType"
                      onChange={this.handleEditFieldChange}
                      value={this.state.productType}
                      required
                    />

                    <div className="form-group">
                      <label for="details">Details</label>
                      <textarea
                        placeholder="Enter details about post here"
                        className="form-control"
                        id="details"
                        name="content"
                        rows="6"
                        onChange={this.handleEditFieldChange}
                        value={this.state.content}
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="featured"
                          name="featured"
                          onChange={this.handleEditFieldChange}
                        />
                        <label className="custom-control-label" for="featured">
                          Highlight this post
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-success float-right mt-2 btn-sm"
                    onClick={this.saveEdits}
                  >
                    Save Changes
                  </button>
                  <button
                    className="btn btn-danger float-left mt-2 btn-sm "
                    onClick={this.terminateEditMode}
                  >
                    Discard Changes
                  </button>
                </div>
              </div>
            ) : null}
            {this.state.uploadMode ? (
              <div>
                <div className="card mb-5 mt-2">
                  <div className="card-body">
                    <h5 className="card-title">Upload Image</h5>
                    <div className="card-text text-body">
                      <FileUploader />
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-success float-right mt-2 btn-sm"
                      onClick={this.saveUploadedImage}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn btn-danger float-left mt-2 btn-sm "
                      onClick={this.terminateUploadMode}
                    >
                      Discard Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { attachedImage: state.attachedImage };
};

export default connect(mapStateToProps)(PostCard);

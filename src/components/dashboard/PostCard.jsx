import React from "react";
import { connect } from "react-redux";
import { DeletePost, EditPost } from "./../../scripts/posts";
import { getDetailsOfIndividualUser } from "./../../scripts/users";
import InputElement from "./../InputElement";
import FileUploader from "./FileUploader";

class PostCard extends React.Component {
  constructor() {
    super();
    this.state = {
      deleted: false,
      editMode: false,
      uploadMode: false,
      likerView: false,
      name: "",
      productType: "",
      content: "",
      featured: "off",
      images: [],
      interested: [],
      interestedDetails: [],
      priority: 0,
      city: "",
      state: "",
      contact: "",
    };
    this.editPost = this.editPost.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.showLikers = this.showLikers.bind(this);
    this.saveUploadedImage = this.saveUploadedImage.bind(this);
    this.deletePostTrigger = this.deletePostTrigger.bind(this);
    this.terminateEditMode = this.terminateEditMode.bind(this);
    this.handleEditFieldChange = this.handleEditFieldChange.bind(this);
  }

  componentDidMount = () => {
    const {
      name,
      productType,
      content,
      featured,
      images,
      interested,
      priority,
      city,
      state,
      category,
      contact,
    } = this.props;
    this.setState({
      name,
      productType,
      content,
      featured,
      images,
      interested,
      priority,
      city,
      state,
      advt_type: category,
      contact,
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

  showLikers = async () => {
    const interestedDetails = [];
    for (let i = 0; i < this.state.interested.length; i += 1) {
      const response = await getDetailsOfIndividualUser(
        this.state.interested[i]
      );
      interestedDetails.push(response.payload);
    }
    this.setState({ interestedDetails, likerView: !this.state.likerView });
  };

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
    const {
      name,
      productType,
      content,
      featured,
      city,
      state,
      priority,
      contact,
    } = this.state;
    const { _id } = this.props;
    console.log({
      name,
      productType,
      content,
      featured,
      _id,
      city,
      state,
      priority,
      contact,
    });
    try {
      const response = await EditPost({
        post: {
          name,
          productType,
          content,
          featured: featured === "on" ? true : false,
          _id: _id,
          city,
          state,
          priority,
          contact,
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
    const {
      name,
      content,
      images,
      featured,
      productType,
      city,
      state,
      priority,
      advt_type,
      contact,
    } = this.state;
    const { interested } = this.props;
    return (
      <div>
        {this.state.deleted ? null : (
          <div>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  {interested.length !== 0 ? (
                    <span
                      onClick={this.showLikers}
                      className="badge badge-pull badge-danger float-right ml-2 mr-2"
                    >
                      {interested.length} &#10084;
                    </span>
                  ) : null}
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
                <p className="card-text">
                  {content} <br /> <br /> <hr />
                  <b>City</b>: {city} <br />
                  <b>State</b>: {state} <br />
                  <b>Priority</b>: {priority} <br />
                  <b>Advertisement Type</b>: {advt_type} <br />
                  <b>Contact Number</b> : {contact || "not specified"}
                </p>
                <button
                  className="btn btn-outline-danger"
                  onClick={this.deletePostTrigger}
                >
                  Delete
                </button>

                {images.length ? (
                  <a
                    className="btn btn-outline-info float-right"
                    href={`${this.state.images[0]}`}
                  >
                    Show Image
                  </a>
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

                    <InputElement
                      label="City"
                      placeholder="Enter the city of operation"
                      type="text"
                      name="city"
                      onChange={this.handleEditFieldChange}
                      value={this.state.city}
                      required
                    />

                    <InputElement
                      label="State"
                      placeholder="Enter the state of operation"
                      type="text"
                      name="state"
                      onChange={this.handleEditFieldChange}
                      value={this.state.state}
                      required
                    />

                    <InputElement
                      label="Priority"
                      placeholder="Set priority rating for post, higher implies more important"
                      type="number"
                      name="priority"
                      onChange={this.handleEditFieldChange}
                      value={this.state.priority}
                      required
                    />

                    <InputElement
                      label="Displayed Contact Number"
                      placeholder="Contact Number to be shown on advt"
                      type="number"
                      name="contact"
                      onChange={this.handleEditFieldChange}
                      value={this.state.contact}
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
                          defaultChecked={this.state.featured}
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
            {this.state.likerView ? (
              <div>
                <div>
                  <div className="card mb-5 mt-2">
                    <div className="card-body">
                      <h5 className="card-title">People who liked this</h5>
                      <div className="card-text text-body">
                        <ul className="list-group">
                          {this.state.interestedDetails.map((user) => (
                            <li className="list-group-item">
                              {user.name} : (
                              <span className="text-muted">
                                {user.mobileNumber}
                              </span>
                              )
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

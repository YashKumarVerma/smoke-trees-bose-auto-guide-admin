import React from "react";
import { connect } from "react-redux";

import InputElement from "./../../components/InputElement";
import FileUploader from "./../dashboard/FileUploader";
import { addNewPost } from "./../../redux/posts/posts.actions";
import { CreateNewPost } from "./../../scripts/posts";

class NewPostCard extends React.Component {
  /** initialize state of component */
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      details: "",
      isFeatured: "",
    };
  }

  /** handle form changes */
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /** submit the form */
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ state: this.state, props: this.props });
    try {
      const PostDetails = {
        name: this.state.name,
        content: this.state.details,
        category: this.state.category,
        featured: this.state.isFeatured === "on",
        images: [this.props.attachedImage],
      };

      const response = await CreateNewPost({ post: PostDetails });
      this.props.addNewPost(response);

      console.log("Successfully created new Post :  ", response);

      this.setState({ name: "", category: "", details: "", isFeatured: "" });
    } catch (err) {
      alert("Error while Creating post");
      console.log("Error while Creating post");
    }
  };

  /** main render function */
  render() {
    return (
      <div>
        <div className="card border-dark">
          <div className="card-header">
            <h5 className="card-title">Create New Post</h5>
          </div>
          <div className="card-body">
            <InputElement
              label="Title"
              placeholder="Enter title of post"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              required
            />

            <InputElement
              label="Category"
              placeholder="Enter the category to which this post belongs"
              type="text"
              name="category"
              onChange={this.handleChange}
              value={this.state.category}
              required
            />

            <div className="form-group">
              <label for="details">Details</label>
              <textarea
                placeholder="Enter details about post here"
                className="form-control"
                id="details"
                name="details"
                rows="6"
                onChange={this.handleChange}
                value={this.state.details}
              ></textarea>
            </div>

            <FileUploader />

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="isFeatured"
                  name="isFeatured"
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" for="isFeatured">
                  Highlight this post
                </label>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button
              type="button"
              className="btn btn-outline-dark float-right"
              onClick={this.handleSubmit}
            >
              Create New Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default NewPostCard;

const mapDispatchToProps = (dispatch) => ({
  addNewPost: (post) => dispatch(addNewPost(post)),
});

const mapStateToProps = (state) => {
  return { attachedImage: state.attachedImage };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostCard);
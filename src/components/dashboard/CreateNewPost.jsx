import React from "react";

import InputElement from "./../../components/InputElement";

class NewPostCard extends React.Component {
  handleChange() {
    console.log(this.state);
  }
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
              required
            />

            <InputElement
              label="Category"
              placeholder="Enter the category to which this post belongs"
              type="text"
              name="category"
              onChange={this.handleChange}
              required
            />

            <div class="form-group">
              <label for="details">Details</label>
              <textarea
                placeholder="Enter details about post here"
                class="form-control"
                id="details"
                name="details"
                rows="6"
              ></textarea>
            </div>

            <div class="form-group">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="imageUpload"
                  name="image"
                  accept="image/*"
                />
                <label class="custom-file-label" for="imageUpload">
                  Choose Image
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="isFeatured"
                  name="isFeatured"
                />
                <label class="custom-control-label" for="isFeatured">
                  Highlight this post
                </label>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button type="button" className="btn btn-outline-dark">
              Create New Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPostCard;

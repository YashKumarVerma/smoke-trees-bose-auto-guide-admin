import React from "react";
import { DeletePost as DeletePostRequest } from "./../../scripts/posts";

class PostCard extends React.Component {
  constructor() {
    super();
    this.state = {
      deleted: false,
    };
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost() {
    DeletePostRequest(this.props.id)
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

  render() {
    const { name, content, images, featured, productType } = this.props;
    return (
      <div>
        {this.state.deleted ? null : (
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
                onClick={this.deletePost}
              >
                Delete
              </button>
              {images.length ? (
                <button className="btn btn-outline-info float-right ">
                  Show Image
                </button>
              ) : (
                <button className="btn float-right " disabled>
                  No Image Attached
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default PostCard;

import React from "react";
import { DeleteTestimonial } from "./../../scripts/testimonial";

class TestimonialCard extends React.Component {
  constructor() {
    super();
    this.state = {
      deleted: false,
    };
  }

  deletePostTrigger(id) {
    DeleteTestimonial(id)
      .then((resp) => {
        if (resp.error) {
          alert("Error deleting testimonial");
        } else {
          alert("testimonial deleted ");
          this.setState({ deleted: true });
        }
      })
      .catch((err) => {
        console.log("Unexpected Error in Deleting Post");
      });
    console.log(`Deleting Post :  ${this.props.id}`);
  }

  render() {
    return (
      <div>
        {this.state.deleted ? null : (
          <div>
            {console.log(this.props)}
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <b>{this.props.name}</b>
                </div>
                <p className="card-text">{this.props.testimonial}</p>
                <img
                  src={this.props.picture}
                  alt="testimonial"
                  width="100%"
                ></img>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => this.deletePostTrigger(this.props._id)}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TestimonialCard;

import React from "react";
import { connect } from "react-redux";

import InputElement from "./../../components/InputElement";
import FileUploader from "./../dashboard/FileUploader";
import { CreateNewTestimonial } from "./../../scripts/testimonial";

class NewTestimonialCard extends React.Component {
  /** initialize state of component */
  constructor() {
    super();
    this.state = {
      name: "",
      picture: "",
      testimonial: "",
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
      const TestimonialDetails = {
        name: this.state.name,
        testimonial: this.state.testimonial,
        picture: [this.props.attachedImage],
      };
      if (
        TestimonialDetails.picture === null ||
        TestimonialDetails.picture[0] === null ||
        TestimonialDetails.picture[0] === undefined
      ) {
        TestimonialDetails.picture = [];
      } else {
        TestimonialDetails.picture = TestimonialDetails.picture[0];
      }
      const response = await CreateNewTestimonial({
        testimonial: TestimonialDetails,
      });

      console.log("Successfully created new testimonial :  ", response);
      alert(`New testimonial : "${TestimonialDetails.name}" was created`);

      this.setState({ name: "", testimonial: "", picture: "" });
    } catch (err) {
      alert("Error while Creating testimonial");
      console.log("Error while Creating testimonial");
    }
  };

  /** main render function */
  render() {
    return (
      <div>
        <div className="card border-dark">
          <div className="card-header">
            <h5 className="card-title">Create New testimonial</h5>
          </div>
          <div className="card-body">
            <InputElement
              label="Title"
              placeholder="Enter title of testimonial"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              required
            />

            <div className="form-group">
              <label for="details">Testimonial</label>
              <textarea
                placeholder="Enter details about Testimonial here"
                className="form-control"
                id="testimonial"
                name="testimonial"
                rows="6"
                onChange={this.handleChange}
                value={this.state.testimonial}
              ></textarea>
            </div>

            <FileUploader />
          </div>

          <div className="card-footer">
            <button
              type="button"
              className="btn btn-outline-dark float-right"
              onClick={this.handleSubmit}
            >
              Create New Testimonial
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { attachedImage: state.attachedImage };
};

export default connect(mapStateToProps)(NewTestimonialCard);

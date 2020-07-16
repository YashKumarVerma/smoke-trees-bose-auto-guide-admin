import React from "react";
import { GetAllTestimonials } from "./../../scripts/testimonial";

import TestimonialCard from "./TestimonialCard.jsx";

class SearchPost extends React.Component {
  constructor() {
    super();
    this.state = {
      testimonials: [],
    };
  }

  componentDidMount = async () => {
    this.LoadTestimonials();
  };

  LoadTestimonials = async () => {
    try {
      const response = await GetAllTestimonials();
      this.setState({
        testimonials: response.payload,
      });
    } catch (e) {
      console.log(`Error while Loading testimonials`);
    }
  };

  render() {
    return (
      <div>
        <div className="card border-dark">
          <div className="card-body">
            {this.state.testimonials.map((testimonial) => (
              <div>
                <TestimonialCard {...testimonial} key={testimonial._id} />
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPost;

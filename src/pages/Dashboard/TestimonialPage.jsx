import React from "react";

import Navbar from "../../components/Navbar";
import CreateTestimonial from "../../components/dashboard/CreateTestimonial";
import TestimonialCards from "../../components/dashboard/TestimonialCards";

class TestimonialPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <CreateTestimonial />
              <br />
              <br />
              <TestimonialCards />
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default TestimonialPage;

import React from "react";
import { connect } from "react-redux";

import InputElement from "./../../components/InputElement";
import { CreateNewPost } from "./../../scripts/posts.js";
class NewPostCard extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const eventDetails = {
        eventName: this.state.eventName,
        slug: this.state.eventSlug,
        description: this.state.eventDescription,
        participants: [],
        sessions: [],
      };

      const response = await CreateNewPost(eventDetails);
      this.props.addEvent(response);
      console.log("Successfully created new event :  ", response);
      window.$("#createEventModal").modal("hide");

      this.setState({
        eventName: "",
        eventSlug: "",
        eventDescription: "",
      });
    } catch (err) {
      console.log("Error while creating new event", err);
    }
  };

  handleChange() {
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <div className="card border-dark">
          <div className="card-header">
            <h5 className="card-title">
              <form class="form-inline float-right">
                <input
                  class="form-control"
                  type="search"
                  placeholder="Search for posts"
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-success float-right"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </h5>
          </div>
          <div className="card-body">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <span class="badge badge-pill badge-success float-right">
                    Featured
                  </span>
                  <h5>Card Title</h5>
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button className="btn btn-outline-danger ">Delete</button>
                <button className="btn btn-outline-info float-right ">
                  Show Image
                </button>
                <button className="btn btn-outline-primary mr-md-3 float-right">
                  Edit
                </button>
              </div>
            </div>
            <br />{" "}
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <span class="badge badge-pill badge-success float-right">
                    Featured
                  </span>
                  <h5>Card Title</h5>
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button className="btn btn-outline-danger text-danger ">
                  Delete
                </button>
                <button className="btn btn-outline-primary text-primary float-right">
                  Edit
                </button>
              </div>
            </div>
            <br />
          </div>
          <div className="card-footer">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">
                    Previous
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPostCard;

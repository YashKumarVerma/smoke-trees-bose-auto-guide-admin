import React from "react";
import { GetAllPosts } from "./../../scripts/posts";
import Pagination from "react-js-pagination";

import PostCard from "./PostCard.jsx";

class SearchPost extends React.Component {
  constructor() {
    super();
    this.state = {
      page: {
        totalDocs: 0,
        limit: 0,
        docs: [],
      },
      activePage: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /** to trigger initial load */
  componentDidMount = async () => {
    this.LoadPosts();
  };

  /** to get data from nth page */
  LoadPosts = async (number = 1) => {
    try {
      /** loading page number using api call */
      const response = await GetAllPosts(number);
      this.setState({
        page: response.payload,
      });
    } catch (e) {
      /** handle error when unable to load pages */
      console.log(`Error while Loading Posts for page : ${number}`);
    }
  };

  /** handle page change operations from pagination */
  handlePageChange = (pageNumber) => {
    console.log(`Hopping to page ${pageNumber}`);
    this.LoadPosts(pageNumber);
    this.setState({ activePage: pageNumber });
  };

  /** handle change for search operation */
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /** handle search button submit */
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    try {
      console.log(this.state);
      //   const eventDetails = {
      //     eventName: this.state.eventName,
      //     slug: this.state.eventSlug,
      //     description: this.state.eventDescription,
      //     participants: [],
      //     sessions: [],
      //   };
      //   const response = await CreateNewPost(eventDetails);
      //   this.props.addEvent(response);
      //   console.log("Successfully created new event :  ", response);
      //   window.$("#createEventModal").modal("hide");
      //   this.setState({
      //     eventName: "",
      //     eventSlug: "",
      //     eventDescription: "",
      //   });
    } catch (err) {
      console.log("Error while creating new event", err);
    }
  };

  render() {
    return (
      <div>
        <div className="card border-dark">
          <div className="card-header">
            <h5 className="card-title">
              <form className="form-inline float-right">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search for posts"
                  aria-label="Search"
                  onChange={this.handleChange}
                />
                <button
                  className="btn btn-outline-success float-right"
                  type="button"
                  onClick={this.handleSubmit}
                >
                  Search
                </button>
              </form>
            </h5>
          </div>
          <div className="card-body">
            {this.state.page.docs.map((doc) => (
              <div>
                <PostCard {...doc} key={doc._id} />
                <br />
              </div>
            ))}
          </div>
          <div className="card-footer ">
            <div className="d-flex justify-content-center">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.page.limit}
                totalItemsCount={this.state.page.totalDocs}
                pageRangeDisplayed={8}
                onChange={this.handlePageChange}
                nextPageText="Next"
                prevPageText="Previous"
                lastPageText="Last"
                firstPageText="First"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPost;

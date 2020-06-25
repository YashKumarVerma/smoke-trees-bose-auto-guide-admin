import React from "react";
import Pagination from "react-js-pagination";
import {
  GetAllUsersFromDatabase,
  SearchUserFromDatabase,
} from "../../scripts/users";

import UserCard from "./UserCard.jsx";

class SearchUser extends React.Component {
  constructor() {
    super();
    this.state = {
      page: {
        totalDocs: 0,
        limit: 0,
        docs: [],
      },
      activePage: 1,
      searchString: "",
      searchingMode: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /** to trigger initial load */
  componentDidMount = async () => {
    this.LoadUsers();
  };

  /** to get data from nth page */
  LoadUsers = async (number = 1) => {
    try {
      /** loading page number using api call */
      const response = await GetAllUsersFromDatabase(number);
      this.setState({
        page: response.payload,
      });
    } catch (e) {
      /** handle error when unable to load pages */
      console.log(e);
      console.log(`Error while Loading Users for page : ${number}`);
    }
  };

  /** to search posts */
  SearchUser = async (page = 1) => {
    const searchSlug = this.state.searchString.trim();
    try {
      const response = await SearchUserFromDatabase(searchSlug, page);
      this.setState({
        page: response.payload,
        activePage: page,
      });
    } catch (err) {
      console.log("Error while creating new event", err);
    }
  };

  /** handle page change operations from pagination */
  handlePageChange = (pageNumber) => {
    console.log(`Hopping to page ${pageNumber}`);
    if (this.state.searchingMode) {
      console.log(`Searching in page ${pageNumber} `);
      this.SearchUser(pageNumber);
      console.log(this.state.page);
    } else {
      console.log(`Listing page ${pageNumber} `);
      this.LoadUsers(pageNumber);
    }
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
    this.setState({ searchingMode: true });
    this.SearchUser();
  };

  render() {
    return (
      <div>
        <div className="card border-dark">
          <div className="card-header">
            <h5 className="card-title">
              <form>
                <div className="input-group flex-fill">
                  <input
                    className="form-control mr-2"
                    type="text"
                    placeholder="Search for users by name, business or number"
                    aria-label="Search"
                    name="searchString"
                    onChange={this.handleChange}
                  />
                  <span>
                    <button
                      className="btn btn-outline-success float-right"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Search
                    </button>
                  </span>
                </div>
              </form>
            </h5>
          </div>
          <div className="card-body">
            {this.state.page.docs.map((doc) => (
              <div>
                <UserCard {...doc} key={doc._id} />
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

export default SearchUser;

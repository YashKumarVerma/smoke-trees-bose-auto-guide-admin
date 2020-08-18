import React from "react";
import { GetAllPosts, SearchPosts } from "./../../scripts/posts";
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
      searchString: "",
      searchingMode: false,
      category: "distributor",
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
      const response = await GetAllPosts(number, this.state.category);
      this.setState({
        page: response.payload,
      });
    } catch (e) {
      /** handle error when unable to load pages */
      console.log(`Error while Loading Posts for page : ${number}`);
    }
  };

  /** to search posts */
  SearchPosts = async (page = 1) => {
    const searchSlug = this.state.searchString.trim();
    try {
      const response = await SearchPosts(searchSlug, page, this.state.category);
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
      this.SearchPosts(pageNumber);
      console.log(this.state.page);
    } else {
      console.log(`Listing page ${pageNumber} `);
      this.LoadPosts(pageNumber);
    }
    this.setState({ activePage: pageNumber });
  };

  /** handle change for search operation */
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  };

  /** handle search button submit */
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ searchingMode: true });
    this.SearchPosts();
  };

  render() {
    return (
      <div>
        <div className="card border-dark">
          <div className="card-header">
            <h5 className="card-title">
              <form>
                <div className="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="categorySelect">
                        Category
                      </label>
                    </div>
                    <select
                      name="category"
                      class="custom-select"
                      id="categorySelect"
                      onChange={this.handleChange}
                      onBlur={this.handleSubmit}
                    >
                      <option selected value="distributor">
                        Distributor
                      </option>
                      <option value="manufacture">Manufacture</option>
                      <option value="retail">Retail</option>
                    </select>
                  </div>
                </div>
                <div className="form-group input-group flex-fill">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search for posts"
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

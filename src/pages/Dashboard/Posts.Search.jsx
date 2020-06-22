import React from "react";

import Navbar from "../../components/Navbar";
import SearchPost from "../../components/dashboard/SearchPost";

class PostsPage extends React.Component {
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
              <SearchPost />
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default PostsPage;

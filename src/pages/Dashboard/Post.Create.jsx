import React from "react";

import Navbar from "../../components/Navbar";
import CreatePost from "../../components/dashboard/CreateNewPost";

class CreatePostsPage extends React.Component {
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
              <CreatePost />
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default CreatePostsPage;

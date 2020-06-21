import React from "react";

import Navbar from "../../components/Navbar";
import CreateNewPost from "../../components/dashboard/CreateNewPost.jsx";
import ListPost from "../../components/dashboard/ListPost.jsx";

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
            <div className="col-md-5">
              <ListPost />
            </div>
            <div className="col-md-7">
              <CreateNewPost />
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default PostsPage;

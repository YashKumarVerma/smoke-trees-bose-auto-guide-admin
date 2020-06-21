import React from "react";

import Navbar from "../../components/Navbar";

class PostsPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={true} />
      </div>
    );
  }
}

export default PostsPage;

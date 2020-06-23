import React from "react";

import Navbar from "../../components/Navbar";
import SearchUser from "../../components/dashboard/SearchUser";

const UsersPage = () => (
  <div>
    <Navbar isLoggedIn={true} />
    <br />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <SearchUser />
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
    <br />
  </div>
);

export default UsersPage;

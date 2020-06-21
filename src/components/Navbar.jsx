import React from "react";
import { Link, Redirect } from "react-router-dom";

class navBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.childRoute = window.location.pathname.split("/")[2];
  }

  //   function to execure logout mechanism
  handleLogout = () => {
    //   shout out to the world
    console.log("Logging you out");

    // empty localstorage
    localStorage.removeItem("token");

    // now redirect to dashboard
    this.setState({ redirect: true });
  };

  //   function to handle redirect to login screen
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  //   render function to display components
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        {this.renderRedirect()}
        {console.log()}
        <Link to="/dashboard">
          <div className="navbar-brand">Admin Panel</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarExpansion"
          aria-controls="navbarExpansion"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarExpansion">
          <ul className="navbar-nav mr-auto">
            {this.props.isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <li
                    className={"nav-item " + (this.childRoute ? " " : "active")}
                  >
                    <a className="nav-link">
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </Link>
                <Link to="/dashboard/users">
                  <li
                    className={
                      "nav-item " +
                      (this.childRoute === "users" ? "active" : "")
                    }
                  >
                    <a className="nav-link">
                      Users <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </Link>

                <Link to="/dashboard/posts">
                  <li
                    className={
                      "nav-item " +
                      (this.childRoute === "posts" ? "active" : "")
                    }
                  >
                    <a className="nav-link">
                      Posts <span className="sr-only">(current)</span>
                    </a>
                  </li>
                </Link>
              </>
            ) : null}
          </ul>
          <form className="form-inline my-2 my-md-0">
            {this.props.isLoggedIn ? (
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={this.handleLogout}
              >
                Logout
              </button>
            ) : null}
          </form>
        </div>
      </nav>
    );
  }
}

export default navBar;

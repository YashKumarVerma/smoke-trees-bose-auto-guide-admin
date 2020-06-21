import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

// importing pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Dashboard/Users";
import PostsPage from "./pages/Dashboard/Posts";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/users" component={UsersPage} />
        <Route exact path="/dashboard/posts" component={PostsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

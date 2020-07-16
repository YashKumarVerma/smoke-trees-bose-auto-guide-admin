import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

// importing pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Dashboard/Users";
import TestimonialPage from "./pages/Dashboard/TestimonialPage";
import CreatePostPage from "./pages/Dashboard/Post.Create";
import SearchPostPage from "./pages/Dashboard/Posts.Search";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/users" component={UsersPage} />
        <Route
          exact
          path="/dashboard/testimonials"
          component={TestimonialPage}
        />
        <Route exact path="/dashboard/createPost" component={CreatePostPage} />
        <Route exact path="/dashboard/searchPost" component={SearchPostPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

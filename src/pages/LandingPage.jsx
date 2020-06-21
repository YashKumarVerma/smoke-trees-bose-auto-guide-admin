import React from "react";

import NavBar from "../components/Navbar";
import MainMast from "../components/landingPage/MainMast";
import LoginForm from "../components/landingPage/LoginForm";

const LandingPage = () => (
  <div>
    <NavBar isLoggedIn={false} />
    <MainMast />
    <LoginForm />
  </div>
);

export default LandingPage;

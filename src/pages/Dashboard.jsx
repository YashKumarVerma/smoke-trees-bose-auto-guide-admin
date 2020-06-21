import React from "react";

import NavBar from "../components/Navbar";
import StatsWidget from "../components/dashboard/Widgets";

const Dashboard = () => (
  <div>
    <NavBar isLoggedIn={true} />
    <StatsWidget />
  </div>
);

export default Dashboard;

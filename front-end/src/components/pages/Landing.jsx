import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      Landing Page
      <Link to="/login">Login</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Landing;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Landing = () => {
  return (
    <LandingContainer>
      <h2>Landing Page</h2>
      <Link to="/login">Login</Link>
      <Link to="/about">About</Link>
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Landing;

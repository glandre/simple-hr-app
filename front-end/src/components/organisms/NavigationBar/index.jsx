import React from "react";
import styled from "styled-components/macro";
import { useAuth } from "../../../contexts/auth";
import NavigationItem from "../../molecules/NavigationItem";

const NavigationBar = ({ children }) => {
  const auth = useAuth();
  const { isLoggedIn, signout } = auth;
  return (
    <NavContainer>
      {isLoggedIn ? (
        <>
          {children}
          <NavigationItem title="Sign out" action={signout} />
        </>
      ) : (
        <NavigationItem title="Login" path="/login" />
      )}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  margin: 10px;

  div {
    padding: 0 10px;
  }
`;

export default NavigationBar;

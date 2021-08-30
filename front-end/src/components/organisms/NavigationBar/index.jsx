import { AppBar, Tabs } from "@material-ui/core";
import React from "react";
import styled from "styled-components/macro";
import { useAuth } from "../../../contexts/auth";
import NavigationItem from "../../molecules/NavigationItem";

const NavigationBar = ({ children }) => {
  const auth = useAuth();
  const { isLoggedIn, signout } = auth;

  return (
    <AppBar position="static">
      <NavTabs value={false}>
        {onlyShowPrivateRoutesIfLoggedIn(children, isLoggedIn)}

        {isLoggedIn ? (
          <NavigationItem title="Sign out" action={signout} />
        ) : (
          <NavigationItem title="Sign in" path="/login" />
        )}
      </NavTabs>
    </AppBar>
  );
};

function onlyShowPrivateRoutesIfLoggedIn(children, isLoggedIn) {
  return children.map((child) =>
    child.props.private ? (isLoggedIn ? child : null) : child
  );
}

const NavTabs = styled(Tabs)`
  display: flex;
  margin: 10px;

  div {
    padding: 0 10px;
  }
`;

export default NavigationBar;

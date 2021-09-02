import { AppBar, Tabs, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components/macro";
import { useAuth } from "../../../contexts/auth";
import NavigationItem from "../../molecules/NavigationItem";

const NavigationBar = ({ drawerWidth, title }) => {
  const auth = useAuth();
  const { isLoggedIn, signout } = auth;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <StyledAppBar drawerWidth={drawerWidth}>
      <NavTabs value={false}>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        {isLoggedIn ? (
          <NavigationItem title="Sign out" action={signout} />
        ) : (
          <NavigationItem title="Sign in" path="/login" />
        )}
      </NavTabs>
    </StyledAppBar>
  );
};

const NavTabs = styled(Tabs)`
  display: flex;
  margin: 10px;

  div {
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledAppBar = styled(AppBar)`
  width: calc(100% - ${(props) => props.drawerWidth}px);
`;

export default NavigationBar;

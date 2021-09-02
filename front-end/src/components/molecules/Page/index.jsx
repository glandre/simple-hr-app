import React from "react";
import PropTypes from "prop-types";
import Container from "../../atoms/Container";
import SizedBox from "../../atoms/SizedBox";
import { useAuth } from "../../../contexts/auth";
import SideBar from "../../organisms/SideBar";

const Page = ({ children, drawerWidth }) => {
  const auth = useAuth();
  return (
    <Container>
      <SideBar width={drawerWidth} hidden={!auth.isLoggedIn} />
      <SizedBox drawerWidth={drawerWidth}>{children}</SizedBox>
    </Container>
  );
};

Page.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
};

export default Page;

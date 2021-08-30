import React from "react";
import PropTypes from "prop-types";
import Container from "../../atoms/Container";
import SizedBox from "../../atoms/SizedBox";
import Footer from "../Footer";

const Page = ({ children, footerText }) => {
  return (
    <Container>
      <SizedBox>{children}</SizedBox>
      <Footer text={footerText} />
    </Container>
  );
};

Page.propTypes = {
  footerText: PropTypes.string.isRequired,
};

export default Page;

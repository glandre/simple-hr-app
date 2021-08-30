import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import Label from "../../atoms/Label";

const Footer = ({ text }) => {
  return (
    <StyledFooter>
      <Label text={text} />
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  text-align: right;
`;

Footer.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Footer;

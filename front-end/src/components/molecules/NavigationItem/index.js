import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavigationItem = ({ action, className, title, path }) => {
  const location = useLocation();
  const selected = location.pathname === path;

  return (
    <NavItemContainer className={className} selected={selected}>
      {action ? (
        <button onClick={action}>{title}</button>
      ) : (
        <Link to={path}>{title}</Link>
      )}
    </NavItemContainer>
  );
};

const NavItemContainer = styled.div`
  ${(props) => (props.selected ? "text-decoration: underline;" : "")}

  button {
    background: none !important;
    border: none;
    padding: 0 !important;
    text-decoration: underline;
    cursor: pointer;
  }
`;

NavigationItem.propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default NavigationItem;

import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { Tab } from "@material-ui/core";

const NavigationItem = ({ action, title, path }) => {
  const location = useLocation();
  const history = useHistory();
  const selected = location.pathname === path;

  const handleClick = () => {
    if (action) {
      return action();
    }

    history.push(path);
  };

  return <Tab label={title} selected={selected} onClick={handleClick} />;
};

NavigationItem.propTypes = {
  action: PropTypes.func,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
};

export default NavigationItem;

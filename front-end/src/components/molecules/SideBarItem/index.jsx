import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import React from "react";

const SideBarItem = ({ text, icon }) => {
  return (
    <ListItem button key={text}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

SideBarItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SideBarItem;

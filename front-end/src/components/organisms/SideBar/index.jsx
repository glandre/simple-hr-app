import { makeStyles } from "@material-ui/core/styles";
import MuiDrawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BusinessIcon from "@material-ui/icons/Business";
import Divider from "../../atoms/Divider";
import SideBarItem from "../../molecules/SideBarItem";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const SideBar = ({ width, hidden }) => {
  const classes = useStyles();
  const history = useHistory();

  if (hidden) {
    return null;
  }

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <SideBarItem
          text="Departments"
          icon={<BusinessIcon />}
          onClick={() => history.push("/departments")}
        />
        <SideBarItem
          text="Employees"
          icon={<PermContactCalendarIcon />}
          onClick={() => history.push("/employees")}
        />
      </List>
      <Divider />
      <List>
        <SideBarItem
          text="Reports"
          icon={<AssessmentIcon />}
          onClick={() => history.push("/reports")}
        />
      </List>
    </MuiDrawer>
  );
};

export default SideBar;

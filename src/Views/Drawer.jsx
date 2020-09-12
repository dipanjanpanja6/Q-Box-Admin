import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";

import { Link, useHistory } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBook from '@material-ui/icons/MenuBookRounded';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TimelineIcon from '@material-ui/icons/Timeline';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    width: 56,
    alignSelf: "center",
  },
  menuButtonOpen: {
    width: 56,
    alignSelf: "flex-end",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      // width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentContainer: {
    marginRight: 20,
    marginTop: 64,
  },
}));

const Console = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history=useHistory()
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routingLink = ["/qbook", "/qbank", "/weeklytest", "/monthlytest"];

  return (
    <Box className={classes.contentContainer}>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Q-Book", "Q-Bank", "Weekly Quiz Test", "Monthly Test"].map(
              (text, index) => (
                <Link key={index}
                  style={{ textDecoration: "none",color:'inherit' }}
                  to={routingLink[index]}
                  onClick={() => setOpen(false)}
                >
                  <ListItem button key={text}>
                    <ListItemIcon>{RenderMenuIcon(index)}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              )
            )}
          </List>
          <Divider />
          <List>
          <ListItem button onClick={()=>{history.push('/statistic')}}>
                    <ListItemIcon><TimelineIcon/></ListItemIcon>
                    <ListItemText primary={'Statistic'} />
                  </ListItem>
          </List>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={!open ? classes.menuButton : classes.menuButtonOpen}
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Drawer>
      </div>
    </Box>
  );
};

const RenderMenuIcon = (index) => {
  if (index === 0) {
    return ( <MenuBook/>);
  } else if (index === 1) {
    return <FormatListBulletedIcon />;
  } else if (index === 2) {
    return <AssignmentIcon />;
  } else {
    return < AssessmentIcon/>;
  }
};

export default Console;

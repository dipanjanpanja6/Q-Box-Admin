import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 100,
    marginRight: 20,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 75,
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingBottom: 30,
    cursor: "pointer",
    "&:hover": {
      background: "#ADD8E6",
      color: "#000",
      transition: "0.7s ease-in",
    },
  },
}));

export default function MainView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box mb={3}>
        <Typography variant="h6">Welcome,</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Link to="/qbook" style={{ textDecoration: "none" }}>
            {QBookBox()}
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Link to="/qbank" style={{ textDecoration: "none" }}>
            {QBankBox()}
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Link to="/weeklytest" style={{ textDecoration: "none" }}>
            {QWeeklyTextBox()}
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Link to="/monthlytest" style={{ textDecoration: "none" }}>
            {QMonthlyTextBox()}
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

const QBookBox = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", marginBottom: "25px" }}
      >
        Q-Book
      </Typography>
      <Typography variant="p" style={{ color: "blue", fontWeight: "bold" }}>
        Pending Question : {"25"}
      </Typography>
      <br></br>
      <Typography variant="p" style={{ color: "red", fontWeight: "bold" }}>
        Rejected Question : {"17"}
      </Typography>
      <br></br>
    </Paper>
  );
};

const QBankBox = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", marginBottom: "25px" }}
      >
        Q-Bank
      </Typography>
      <Typography variant="p" style={{ color: "blue", fontWeight: "bold" }}>
        Pending Question : {"25"}
      </Typography>
      <br></br>
      <Typography variant="p" style={{ color: "red", fontWeight: "bold" }}>
        Rejected Question : {"17"}
      </Typography>
    </Paper>
  );
};

const QWeeklyTextBox = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", marginBottom: "25px" }}
      >
        Weekly Test
      </Typography>
      <Typography variant="p" style={{ color: "blue", fontWeight: "bold" }}>
        Pending Question : {"25"}
      </Typography>
      <br></br>
      <Typography variant="p" style={{ color: "red", fontWeight: "bold" }}>
        Rejected Question : {"17"}
      </Typography>
    </Paper>
  );
};

const QMonthlyTextBox = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography
        variant="h5"
        style={{ fontWeight: "bold", marginBottom: "25px" }}
      >
        Monthly Test
      </Typography>
      <Typography variant="p" style={{ color: "blue", fontWeight: "bold" }}>
        Pending Question : {"25"}
      </Typography>
      <br></br>
      <Typography variant="p" style={{ color: "red", fontWeight: "bold" }}>
        Rejected Question : {"17"}
      </Typography>
    </Paper>
  );
};

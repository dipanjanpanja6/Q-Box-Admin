import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Typography, Box, AppBar, Modal, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  GetQBookQuestion,
  GetQuestionViaId,
  RejectedGetQBookQuestion,
} from "../../redux/actions/getcourse";

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
      background: "#f4f4f4",
      color: "green",
    },
  },
  questionContainer: {
    background: "#fff",
    border: "0.7px solid #aaa",
    padding: 20,
    marginTop: 15,
    borderRadius: 15,
  },
  buttonContainer: {
    display: "flex",
    marginTop: 15,
    justifyContent: "flex-end",
  },
}));

const QBookView = (props) => {
  React.useEffect(() => {
    props.GetQBookQuestion();
    props.RejectedGetQBookQuestion();
  }, [GetQBookQuestion]);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleQuestionView = (data) => {
    props.GetQuestionViaId({
      collect: "QBook",
      qid: data.ID,
    });
  };

  const RenderPendingQuestion = (data, index) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
      <Box className={classes.questionContainer}>
        <Link
          to="/qbookquestionview"
          onClick={() => handleQuestionView(data)}
          style={{
            textDecoration: "none",
            textDecorationColor: "none",
            color: "#000",
          }}
        >
          <Box>
            <Typography variant="h6">
              Question : {JSON.parse(data.body).blocks[0].text}
            </Typography>
            <Typography variant="p" color="primary">
              {"Chapter : "}
              <strong> {data.chapter}</strong>
              <br></br>
            </Typography>
            <Typography variant="p" color="primary">
              {"Stream : "}
              <strong> {data.stream}</strong>
            </Typography>
            <Box mt={1} style={{ color: "#000" }}>
              <strong>Course - </strong>
              {data.course !== undefined
                ? data.course.map((courses, index) => {
                    return (
                      <Typography
                        variant="p"
                        style={{
                          color: "#000",
                          backgroundColor: "#eee",
                          padding: 3,
                          paddingLeft: 6,
                          paddingRight: 6,
                          marginLeft: 5,
                          borderRadius: 10,
                          fontSize: 13,
                        }}
                      >
                        {courses}
                      </Typography>
                    );
                  })
                : null}
            </Box>
          </Box>
        </Link>
        <Box className={classes.buttonContainer}>
          <Button
            variant="outlined"
            size="small"
            style={{
              color: "green",
              borderColor: "green",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => setOpen(!open)}
          >
            Reject
          </Button>
        </Box>
      </Box>
    );
  };

  const RenderRejectedQuestion = (data, index) => {
    const classes = useStyles();

    return (
      <Box className={classes.questionContainer}>
        <Typography variant="h6">
          Question : {JSON.parse(data.body).blocks[0].text}
        </Typography>
        <Box className={classes.buttonContainer}>
          <Button disabled style={{ color: "#F7BAD4 " }}>
            Rejected
          </Button>
        </Box>
      </Box>
    );
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    const QData = props.QData;
    const RejectQData = props.RejectQData;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box>
          {index === 0
            ? QData !== undefined
              ? QData.map((data, index) => {
                  return RenderPendingQuestion(data, index);
                })
              : null
            : RejectQData !== undefined
            ? RejectQData.map((data, index) => {
                return RenderRejectedQuestion(data, index);
              })
            : null}
        </Box>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Box mb={3}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Q-Book Question List
        </Typography>

        <div style={{ marginTop: 30 }}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Pending Question" />
              <Tab label="Rejected Question" />
            </Tabs>
          </AppBar>

          <TabPanel
            value={value}
            index={0}
            QData={props.qbook.qbookquestion}
          ></TabPanel>
          <TabPanel
            value={value}
            index={1}
            RejectQData={props.qbook.rejectedqbookquestion}
          ></TabPanel>
        </div>
      </Box>
    </div>
  );
};

const MapStateToProps = (state) => {
  return { qbook: state.getcourse };
};

export default connect(MapStateToProps, {
  GetQBookQuestion,
  GetQuestionViaId,
  RejectedGetQBookQuestion,
})(QBookView);

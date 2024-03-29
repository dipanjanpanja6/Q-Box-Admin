import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Typography, Box, AppBar, Modal, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditorJS from "../../Components/Editor";

import {
  GetMonthlyQuestion,
  GetQuestionViaId,
  RejectedGetMonthlyQuestion,
  EmptyCurrentQuestion,
} from "../../redux/actions/getcourse";

import axios from "axios";
import { url } from "../../config/config";
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

const MonthlyTestView = (props) => {
  React.useEffect(() => {
    props.EmptyCurrentQuestion();
    props.GetMonthlyQuestion();
    props.RejectedGetMonthlyQuestion();
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [open, setOpen] = React.useState("");

  const handleApprovance = async (id) => {
    const response = await axios.get(
      `${url}/api/course/admin/approvequestion/MonthlyTest/${id}`
    );
    if (response.data.success) {
      props.GetMonthlyQuestion();
    }
  };

  const handleRejection = async (comment, id) => {
    const response = await axios.post(
      `${url}/api/course/admin/rejectquestion/MonthlyTest/${id}`,
      { rejectingcomment: comment }
    );
    // console.log(response);
    if (response.data.success) {
      props.GetMonthlyQuestion();
      props.RejectedGetMonthlyQuestion();
    }
  };

  // const getTeacherName = async (id) => {
  //   const response = await axios.get(
  //     `${url}/api/course/admin/getteacherinfo/${id}`
  //   );
  //   if (response.data.success) {
  //     return response.data.name;
  //   }
  // };

  const RenderPendingQuestion = (data, index) => {
    const classes = useStyles();
    const [comment, setComment] = React.useState("");
    const [teacher, setTeacher] = React.useState("Loading...");
    // const tName = getTeacherName(data.uid);
    // tName.then((result) => setTeacher(result));

    return (
      <Box className={classes.questionContainer}>
        <Link
          to={{ pathname: "/monthlyquestionview/" + data.ID }}
          // onClick={() => handleQuestionView(data)}
          style={{
            textDecoration: "none",
            textDecorationColor: "none",
            color: "#000",
          }}
        >
          <Box>
            <Typography variant="h6">
              <EditorJS data={JSON.parse(data.question)} />
              {/* Question : {JSON.parse(data.question).blocks[0].text} */}
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
            <br></br>
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
            onClick={() => handleApprovance(data.ID)}
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
            onClick={() => setOpen(data.ID)}
          >
            Reject
          </Button>
        </Box>
        {data.ID === open && (
          <div style={{ background: "#eee", padding: 20 }}>
            <TextField
              id="outlined-basic"
              label="Rejecting Comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
            />
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                style={{ color: "#000", marginRight: 20 }}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => handleRejection(comment, data.ID)}
                style={{ color: "green", marginRight: 20 }}
              >
                Confirm
              </Button>
            </Box>
          </div>
        )}
      </Box>
    );
  };

  const RenderRejectedQuestion = (data, index) => {
    const classes = useStyles();

    return (
      <Box className={classes.questionContainer}>
        <Typography variant="h6">
          Question : {JSON.parse(data.question).blocks[0].text}
        </Typography>
        {data.rejectingcomment !== undefined && (
          <Typography variant="h6">
            Rejecting Comment : {data.rejectingcomment}
          </Typography>
        )}
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
          Monthly Test Question List
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
            QData={props.monthlyData.monthlyquestion}
          ></TabPanel>
          <TabPanel
            value={value}
            index={1}
            RejectQData={props.monthlyData.rejectedmonthlyquestion}
          ></TabPanel>
        </div>
      </Box>
    </div>
  );
};

const MapStateToProps = (state) => {
  return { monthlyData: state.getcourse };
};

export default connect(MapStateToProps, {
  GetMonthlyQuestion,
  GetQuestionViaId,
  RejectedGetMonthlyQuestion,
  EmptyCurrentQuestion,
})(MonthlyTestView);

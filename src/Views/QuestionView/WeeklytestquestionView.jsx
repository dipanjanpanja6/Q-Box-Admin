import React, { useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { pxToVh, pxToVw, Theme } from "../../theme";
import CardComponent from "../../Components/cardDepth";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import EditorJS from "../../Components/Editor";
import { GetQuestionViaId } from "../../redux/actions/getcourse";

import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Toolbar,
  Fab,
  makeStyles,
  Box,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  Modal,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import { connect } from "react-redux";

import { url } from "../../config/config";
import Loading from "../../Components/loading";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

const style = makeStyles((t) => ({
  content: {
    width: "95%", 
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 50,
    marginRight: 20,
    [t.breakpoints.down("sm")]: {
      marginLeft: 50,
    },
    [t.breakpoints.down("xs")]: {
      padding: 12,
    },
  },
 
  button: {
    background: Theme.textColor.color1,
    marginBottom: 12,
    width: 150,
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    [t.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  buttonLabel: {
    color: Theme.textColor.heading,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  
  question: {
    minHeight: "40%",
    width: "100%",
    alignItems: "center",
    padding: "5% 5% 12px",
    [t.breakpoints.down("xs")]: {
      paddingBottom: 12,
      paddingLeft: "8%",
    },
  },

  radioButtonStyle: {
    // color: Theme.textColor.color1,
    // backgroundColor: "#fff",
    // border: 'solid 01px #aaa',
    // overflow: 'auto',
    marginRight: 15,
    padding: 0,
  },
  radioGroupStyle: {
    padding: 0,
    width: "100%",
  },
  optionContainer: {
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [t.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  baseline: {
    width: 'calc(100vw - 300px)',
    [t.breakpoints.down('xs')]: {
      width: 'calc(100vw - 200px)',
    },
    [t.breakpoints.down('md')]: {
      width: 'calc(100vw - 250px)',
    }
  }
}));

const WeeklyQuestion = (props) => {
  const classes = style();
  const id = useParams().id;

  useEffect(() => {
    document.title = 'Weekly Test Quality Check | QrioctyBox'
    props.GetQuestionViaId({
      collect: "WeeklyTest",
      qid: id,
    });
  }, []);

  const { questionData } = props;

  // const getTeacherName = async (id) => {
  //   const response = await axios.get(
  //     `${url}/api/course/admin/getteacherinfo/${id}`
  //   );
  //   if (response.data.success) {
  //     setTeacher(response.data.name);
  //   }
  // };

  // useEffect(() => {
  //   getTeacherName(questionData.uid);
  // }, [questionData.uid])

  const [loading, setLoading] = React.useState(false);
  const [redirect, setredirect] = React.useState(false);




  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [teacher, setTeacher] = React.useState("Loading...");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if (questionData.is !== undefined) {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        {/* <h1> Loading... </h1> */}
        <Loading />
        {/* <Link to="/console">
          <button>Back to Console</button>
        </Link> */}
      </Box>
    );
  }

  const handleApprovance = async () => {
    const response = await axios.get(
      `${url}/api/course/admin/approvequestion/WeeklyTest/${questionData.ID}`
    );
    // console.log(response);
    if (response.data.success) {
      setredirect(true);
    }
  };

  const handleRejection = async () => {
    const response = await axios.post(
      `${url}/api/course/admin/rejectquestion/WeeklyTest/${questionData.ID}`,
      { rejectingcomment: comment }
    );
    // console.log(response);
    if (response.data.success) {
      setredirect(true);
    }
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/weeklytest" />;
    }
  };

  const RejectConfirmationModal = () => {
    return (
      <Modal
        style={{
          width: "100%",
          alignSelf: "center",
        }}
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{ background: "#eee", padding: 20 }}>
          <TextField
            id="outlined-basic"
            label="Rejecting Comment"
            variant="outlined"
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
              onClick={() => handleRejection()}
              style={{ color: "green", marginRight: 20 }}
            >
              Confirm
            </Button>
          </Box>
        </div>
      </Modal>
    );
  };




  return (
    <>
      {renderRedirect()}
      {RejectConfirmationModal()}
      <Grid container className={classes.content}>
        <CardComponent>
          <Box container className={classes.question}>

            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="p" >
                <strong>Stream : </strong>
                {questionData.stream !== undefined
                  ? questionData.stream
                  : "Loading..."}
              </Typography>
              <Typography variant="p" >
                <strong>Subject : </strong>
                {questionData.subject !== undefined
                  ? questionData.subject
                  : "Loading..."}
              </Typography>
              <Typography variant="p" >
                <strong>Chapter : </strong>
                {questionData.chapter !== undefined
                  ? questionData.chapter
                  : "Loading..."}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box  mt={1} mb={2}>
                <strong>Course : </strong>
                {questionData.course !== undefined
                  ? questionData.course.map((data, index) => {
                    return (
                      <Typography
                        variant="p"
                        style={{
                          color: "#000",
                          backgroundColor: "#eee",
                          padding: 2.5,
                          paddingRight: 5,
                          paddingLeft: 5,
                          borderRadius: 10,
                          marginLeft: 10,
                        }}
                      >
                        {data}
                      </Typography>
                    );
                  })
                  : "No Course"}
              </Box>
              <Typography variant="p" >
                <strong>Created At : </strong>
                {questionData.createdAt !== undefined
                  ? questionData.createdAt
                  : "Loading..."}
              </Typography>
            </Box>
            <Typography variant="p" >
              <strong>Teacher Name : </strong>
              {teacher}
            </Typography>
            <Typography
              variant="h6" component='div'
              style={{ marginBottom: 10 }}
            >
              <Divider/>
              {/* <strong>Question : </strong> */}
              {questionData.question !== undefined ? (
               
                  <Box
                    display="flex"
                    style={{  borderRadius: 12, margin: '12px 0', padding: '0 12px ' }}
                    alignItems="center"
                  >
                    <ScopedCssBaseline className={classes.baseline}>
                      <EditorJS data={JSON.parse(questionData.question)} />
                    </ScopedCssBaseline>
                  </Box>
                
              ) : ("Loading...")}
            </Typography>
            <Divider/>
          </Box>

          <Box container className={classes.optionContainer}>
            <Box style={{ width: '100%' }}>
              <RadioGroup className={classes.radioGroupStyle}              >
              <FormControlLabel
                    control={<Radio checked={questionData.correctAns.includes('ans') ? true : false} className={classes.radioButtonStyle} />}
                    label={
                      <Box
                        display="flex"
                        style={{ borderRadius: 12, margin: '12px 0', padding: '0 12px ' }}
                        alignItems="center"
                      >
                        <ScopedCssBaseline className={classes.baseline}>
                          <EditorJS data={questionData.ans?JSON.parse(questionData.ans):""} />
                        </ScopedCssBaseline>
                      </Box>
                    }
                  />
                <FormControlLabel
                    control={<Radio checked={questionData.correctAns.includes('ans1') ? true : false} className={classes.radioButtonStyle} />}
                    label={
                      <Box
                        display="flex"
                        style={{  borderRadius: 12, margin: '12px 0', padding: '0 12px ' }}
                        alignItems="center"
                      >
                        <ScopedCssBaseline className={classes.baseline}>
                          <EditorJS data={questionData.ans1?JSON.parse(questionData.ans1):""} />
                        </ScopedCssBaseline>
                      </Box>
                    }
                  />
               <FormControlLabel
                    control={<Radio checked={questionData.correctAns.includes('ans2') ? true : false} className={classes.radioButtonStyle} />}
                    label={
                      <Box
                        display="flex"
                        style={{  borderRadius: 12, margin: '12px 0', padding: '0 12px ' }}
                        alignItems="center"
                      >
                        <ScopedCssBaseline className={classes.baseline}>
                          <EditorJS data={questionData.ans2?JSON.parse(questionData.ans2):""} />
                        </ScopedCssBaseline>
                      </Box>
                    }
                  />
                <FormControlLabel
                    control={<Radio checked={questionData.correctAns.includes('ans3') ? true : false} className={classes.radioButtonStyle} />}
                    label={
                      <Box
                        display="flex"
                        style={{  borderRadius: 12, margin: '12px 0', padding: '0 12px ' }}
                        alignItems="center"
                      >
                        <ScopedCssBaseline className={classes.baseline}>
                          <EditorJS data={questionData.ans3?JSON.parse(questionData.ans3):""} />
                        </ScopedCssBaseline>
                      </Box>
                    }
                  />
                 <FormControlLabel
                    control={<Radio checked={questionData.correctAns.includes('ans4') ? true : false} className={classes.radioButtonStyle} />}
                    label={
                      <Box
                        display="flex"
                        style={{  borderRadius: 12, margin: '12px 0', padding: '0 12px ' }}
                        alignItems="center"
                      >
                        <ScopedCssBaseline className={classes.baseline}>
                          <EditorJS data={questionData.ans4?JSON.parse(questionData.ans4):""} />
                        </ScopedCssBaseline>
                      </Box>
                    }
                  />
              </RadioGroup>
            </Box>
          </Box>

        

          <Grid
            item
            container
            justify="space-evenly"
            style={{ paddingTop: "1%", paddingBottom: "1%" }}
          >
            <Fab
              variant="extended"
              type="submit"
              onClick={() => handleApprovance()}
              classes={{ label: classes.buttonLabel }}
              className={classes.button}
            >
              Accept{loading && <CircularProgress />}
            </Fab>
            <Fab
              variant="extended"
              type="submit"
              onClick={() => setOpen(true)}
              classes={{ label: classes.buttonLabel }}
              className={classes.button}
            >
              Reject{loading && <CircularProgress />}
            </Fab>
          </Grid>
        </CardComponent>
      </Grid>
    </>
  );
};

const MapStateToProps = (state) => {
  return {
    questionData: state.getcourse.currentViewQuestion,
  };
};

export default connect(MapStateToProps, { GetQuestionViaId })(WeeklyQuestion);

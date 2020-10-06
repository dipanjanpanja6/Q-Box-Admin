import React, { useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Theme } from "../../theme";
import CardComponent from "../../Components/cardDepth";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import EditorJS from "../../Components/Editor";
import { GetQuestionViaId } from "../../redux/actions/getcourse";

import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Fab, makeStyles, Box, IconButton, RadioGroup, Radio, FormControlLabel, Modal, TextField,
  Button, CssBaseline, Divider,
} from "@material-ui/core";

import Videojs from "../../Components/videoPlayer";
import { connect } from "react-redux";
import { url } from "../../config/config";
import Loading from "../../Components/loading";

const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.3, 0.5, 1, 1.25, 1.5, 2, 2.5],
  // width: 720,
  // height: 300,
  controls: true,
  fluid: true,

  cacheEncryptionKeys: true,
  //   aspectRatio: '1:1',
  sources: [{}],
  html5: {
    vhs: {
      withCredentials: true,
    },
  },
  // poster: require('../static/400.svg')
};

const style = makeStyles((t) => ({
  content: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginLeft: 48,
    marginRight: 20,
    [t.breakpoints.down("sm")]: {
      marginLeft: 44,
    },
    [t.breakpoints.down("xs")]: {
      padding: 12,
    },
  },
  checkbox: {
    // color: "white",
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
  options: {
    [t.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
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
  directionIcon: {
    // color: Theme.textColor.color1,
    fontSize: 40,
    cursor: "pointer",
    padding: 0,
    margin: 0,
  },
  questionNumberStyle: {
    display: "flex",
    alignItems: "center",
  },
  practiceNumberStyle: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  numOfQueStyle: {
    // color: Theme.textColor.color1,
    [t.breakpoints.down("sm")]: {
      fontSize: 15,
      margin: 0,
      padding: 0,
    },
  },
  radioButtonStyle: {
    // color: Theme.textColor.color1,
    // backgroundColor: "#fff",
    marginRight: 15,
    padding: 0,
  },
  radioGroupStyle: {
    padding: 0,
    width: "100%",
    // overflow:'auto'
  },
  optionContainer: {
    width: "100%",
    marginLeft: "5%",
    marginRight: "1%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [t.breakpoints.down("sm")]: {
      // flexDirection: "column",
    },
  },
  radioLabelStyle: {
    overflow: 'auto',
    width: "100%",

    // color: Theme.textColor.color1,
    border: 'solid 01px #aaa',
    marginTop: 15,
    marginLeft: 15,
  },
  videoContainer: {
    // width: "35%",
    // backgroundColor: Theme.textColor.color1,
    borderRadius: 60,
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    // borderRadius: pxToVh(80),
    border: "solid 7px blueviolet",
    overflow: "hidden",
    // [t.breakpoints.down("xs")]: {
    //   borderRadius: pxToVh(60),
    // },
    // [t.breakpoints.down("md")]: {
    //   marginTop: "25px",
    //   width: "60%",
    // },
    // [t.breakpoints.down("sm")]: {
    //   width: "95%",
    // },
  },
}));

const QBankQuestion = (props) => {
  const id = useParams().id;
  const classes = style();

  useEffect(() => {
    document.title = 'Q Bank Quality Check | QrioctyBox'
  }, []);

  const { questionData } = props;

  if (!questionData.noVideo) {
    videoJsOptions.sources[0].src = questionData.video_uri;
    videoJsOptions.sources[0].type = questionData.videoType;
  }

  const [loading, setLoading] = React.useState(false);
  const [redirect, setredirect] = React.useState(false);



  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [teacher, setTeacher] = React.useState("Loading...");



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
      `${url}/api/course/admin/approvequestion/Qbank/${questionData.ID}`
    );
    // console.log(response);
    if (response.data.success) {
      setredirect(true);
    }
  };

  const handleRejection = async () => {
    const response = await axios.post(
      `${url}/api/course/admin/rejectquestion/Qbank/${questionData.ID}`,
      { rejectingcomment: comment }
    );
    // console.log(response);
    if (response.data.success) {
      setredirect(true);
    }
  };

  const renderRedirect = () => {
    if (redirect) {
      props.close()
      return <Redirect to="/qbank" />;
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
              <Box mt={1} mb={2}>
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
                  ? new Date(questionData.createdAt._seconds*1000).toLocaleString()
                  : "Loading..."}
              </Typography>
            </Box>
      
            <Typography
              variant="h6"
              style={{ marginBottom: 10 }}
            >
              <Divider />
              {/* <strong>Question : </strong> */}
              {questionData.question !== undefined ? (<>
                <CssBaseline />
                <EditorJS data={JSON.parse(questionData.question)} /></>
              ) : ("Loading...")}
            </Typography>
            <Divider />

          </Box>

          <Grid container className={classes.optionContainer}>
            <Grid item md={questionData.noVideo ? 12 : 7} style={{ width: '100%' }}>
              <RadioGroup className={classes.radioGroupStyle}              >
                {/* {option.map((data, index) => {
                  return ( */}
                <FormControlLabel
                  className={classes.radioLabelStyle}
                  control={<Radio checked={questionData.correctAns.includes('ans') ? true : false} className={classes.radioButtonStyle} />}
                  label={<>
                    <CssBaseline />
                    <EditorJS data={questionData.ans ? JSON.parse(questionData.ans) : ""} /></>}
                />
                <FormControlLabel
                  className={classes.radioLabelStyle}
                  control={<Radio checked={questionData.correctAns.includes('ans1') ? true : false} className={classes.radioButtonStyle} />}
                  label={<>
                    <CssBaseline />
                    <EditorJS data={questionData.ans1 ? JSON.parse(questionData.ans1) : ""} /></>}
                />
                <FormControlLabel
                  className={classes.radioLabelStyle}
                  control={<Radio checked={questionData.correctAns.includes('ans2') ? true : false} className={classes.radioButtonStyle} />}
                  label={<>
                    <CssBaseline />
                    <EditorJS data={questionData.ans2 ? JSON.parse(questionData.ans2) : ""} /></>}
                />
                <FormControlLabel
                  className={classes.radioLabelStyle}
                  control={<Radio checked={questionData.correctAns.includes('ans3') ? true : false} className={classes.radioButtonStyle} />}
                  label={<>
                    <CssBaseline />
                    <EditorJS data={questionData.ans3 ? JSON.parse(questionData.ans3) : ""} /></>}
                />
                <FormControlLabel
                  className={classes.radioLabelStyle}
                  control={<Radio checked={questionData.correctAns.includes('ans4') ? true : false} className={classes.radioButtonStyle} />}
                  label={<>
                    <CssBaseline />
                    <EditorJS data={questionData.ans4 ? JSON.parse(questionData.ans4) : ""} /></>}
                />
                {/* );
                })} */}
              </RadioGroup>
            </Grid>

            {!questionData.noVideo && (
              <Grid item md={5} sm={11} xs={12} style={{ padding: 18, paddingRight: 0 }}>
                <Grid className={classes.videoContainer}>
                  <Videojs {...videoJsOptions} />
                  {/* </Box> */}
                </Grid>
              </Grid>
            )}
          </Grid>



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
    // questionData: state.getcourse.currentViewQuestion,
  };
};

export default connect(MapStateToProps, { GetQuestionViaId })(QBankQuestion);

import React, { useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { pxToVh, pxToVw, Theme } from "../../theme";
import CardComponent from "../../Components/cardDepth";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Fab,
  makeStyles,
  Box,
  TextField,
  Modal,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { url } from "../../config/config";

import Videojs from "../../Components/videoPlayer";
import { connect } from "react-redux";
import EditorJS from "../../Components/Editor";
import { GetQuestionViaId } from "../../redux/actions/getcourse";
import Loading from "../../Components/loading";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  width: 720,
  height: 300,
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
    // minHeight:'100vh',
    // backgroundColor: 'white',
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
    display: "flex",
    flexDirection: "column",
    minHeight: "40%",
    width: "100%",
    padding: "5% 5% 12px",
    fontSize: 17,
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
  },
  optionContainer: {
    padding: "50px 5% 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [t.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  radioLabelStyle: {
    // color: Theme.textColor.color1,
    marginTop: 15,
  },
  videoContainer: {
    // width: "100%",
    marginBottom: 20,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor: Theme.textColor.color1,
    borderRadius: 60,
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    // borderRadius: pxToVh(80),
    border: "solid 7px blueviolet",
    overflow: "hidden",
    [t.breakpoints.down("xs")]: {
      // borderRadius: pxToVh(60),
    },
    [t.breakpoints.down("md")]: {
      marginTop: "25px",
      // width: "60%",
    },
    [t.breakpoints.down("sm")]: {
      // width: "95%",
    },
  },
  bodyvideoContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [t.breakpoints.down("sm")]: {
      // flexDirection: "column",
    },
  },
  // bodypartstyle: {
  //   // color: "#eee",
  //   width: "60%",
  //   [t.breakpoints.down("sm")]: {
  //     width: "90%",
  //   },
  // },
}));

const QBookQuestion = (props) => {
  const id = useParams().id;

  useEffect(() => {
    document.title = 'Q Book Quality Check | QrioctyBox'
    props.GetQuestionViaId({
      collect: "QBook",
      qid: id,
    });
  }, []);

  const { questionData } = props;

  if (questionData.noVideo !== undefined) {
    videoJsOptions.sources[0].src = questionData.video_uri;
    videoJsOptions.sources[0].type = questionData.videoType

  }

  const [loading, setLoading] = React.useState(false);

  const classes = style();

  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [teacher, setTeacher] = React.useState("Loading...");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [redirect, setredirect] = React.useState(false);

  const handleApprovance = async () => {
    const response = await axios.get(
      `${url}/api/course/admin/approvequestion/QBook/${questionData.ID}`
    );
    if (response.data.success) {
      setredirect(true);
    }
  };

  const handleRejection = async () => {
    const response = await axios.post(
      `${url}/api/course/admin/rejectquestion/QBook/${questionData.ID}`,
      { rejectingcomment: value }
    );
    if (response.data.success) {
      setredirect(true);
    }
  };

  const getTeacherName = async (id) => {
    const response = await axios.get(
      `${url}/api/course/admin/getteacherinfo/${id}`
    );
    if (response.data.success) {
      setTeacher(response.data.name);
    }
  };

  useEffect(() => {
    getTeacherName(questionData.uid);
  }, [questionData.uid])

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/qbook" />;
    }
  };

  if (questionData.is !== undefined) {
    return (
      <Box display="flex" alignItems="center" flexDirection="column">
        <Loading />
      </Box>
    );
  }

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
            onChange={(e) => handleChange(e)}
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
              <Typography variant="p">
                <strong>Stream : </strong>
                {questionData.stream !== undefined
                  ? questionData.stream
                  : "Loading..."}
              </Typography>
              <Typography variant="p">
                <strong>Subject : </strong>
                {questionData.subject !== undefined
                  ? questionData.subject
                  : "Loading..."}
              </Typography>
              <Typography variant="p">
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
              <Typography
                variant="p"
                style={{ marginBottom: 10 }}
              >
                <strong>{"Teacher Name : "}</strong>
                {teacher}
              </Typography>
              <Typography variant="p" >
                <strong>Created At : </strong>
                {questionData.createdAt !== undefined
                  ? questionData.createdAt
                  : "Loading..."}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                style={{ marginBottom: 10, overflow: 'auto', }}
              >
                <strong>Title : </strong>
                {questionData.title !== undefined
                  ? questionData.title
                  : "Loading..."}
              </Typography>

            </Box>
          </Box>
  

          <Grid container className={classes.bodyvideoContainer}>
            <Grid item md={7} sm={11} sx={12}>
              {/* <strong>Body : </strong> */}
              {questionData.body !== undefined ? (<>
                {/* <CssBaseline /> */}
                {/* <ScopedCssBaseline > */}

                <EditorJS data={JSON.parse(questionData.body)} />
                {/* </ScopedCssBaseline > */}
                </>
              ) : ("Loading...")}
            </Grid>

            {!questionData.noVideo && (
              <Grid md={5} sm={12} sx={12}>
              <Box className={classes.videoContainer}>
                <Videojs {...videoJsOptions} />
              </Box>
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
    questionData: state.getcourse.currentViewQuestion,
  };
};

export default connect(MapStateToProps, { GetQuestionViaId })(QBookQuestion);

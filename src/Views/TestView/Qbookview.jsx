import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import {
  Typography,
  Box,
  AppBar,
  Grid,
  TextField,
  FormControl, InputLabel, Select, MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditorJS from "../../Components/Editor";
import axios from "axios";
import { url } from "../../config/config";
import Loading from "../../Components/loading";
import {
  // GetQBookQuestion,
  GetQuestionViaId,
  RejectedGetQBookQuestion,
  EmptyCurrentQuestion,
} from "../../redux/actions/getcourse";
import FullScreenDialog from "../../Components/dialogComponent/dialog";
import QBookViewPage from '../QuestionView/QbookViewQuestion';
import Pagination from "@material-ui/lab/Pagination";
import { toast } from "react-toastify";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
}));

const QBookView = (props) => {
  React.useEffect(() => {
    props.EmptyCurrentQuestion();
  }, []);

  const classes = useStyles();
  const [teacherList, setTeacherList] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [teacher, setTeacher] = React.useState();
  const [page, setPage] = React.useState({ total: 0, page: 1 });
  const [popup, setPopup] = React.useState({ open: false, id: '' });
  const [qbook, setQbook] = React.useState([]);
  const [open, setOpen] = React.useState("");

  useEffect(() => {
    setTeacherList(props.stateTeacherList)
  }, [props.stateTeacherList])

  const handlePopup = () => {
    setPopup(!popup.open)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTeacher = async (e) => {
    setTeacher(e.target.value)
    setPage({ total: 0, page: 1 })
    // props.GetQBankQuestion(e.target.value, 0);
    props.RejectedGetQBookQuestion(e.target.value);
    setLoading(true)
    const response = await axios.get(`${url}/api/course/admin/QBook/${e.target.value}/0`);
    if (response.data.page) {
      setPage({ ...page, total: response.data.page })
    }
    if (response.data.success) {
      setQbook(response.data.data)
    }
    if (response.data.error) {
      setQbook([])
      toast.error(response.data.message)

    }
    setLoading(false)
  }
  const handleSPageChange = async (event, value) => {
    setPage({ ...page, page: value })
    setLoading(true)
    const response = await axios.get(`${url}/api/course/admin/QBook/${teacher}/${(value - 1) * 10}`);
    if (response.data.success) {
      setQbook(response.data.data)
    }
    if (response.data.error) {
      setQbook([])
      toast.error(response.data.message)

    }
    setLoading(false)
  };

  // const [comment, setComment] = React.useState("");

  const handleApprovance = async (id) => {
    const response = await axios.get(
      `${url}/api/course/admin/approvequestion/QBook/${id}`
    );
    if (response.data.success) {
      // props.GetQBookQuestion();
      setLoading(true)

      const response = await axios.get(`${url}/api/course/admin/QBook/${teacher}/${(page.page - 1) * 10}`);
      if (response.data.success) {
        setQbook(response.data.data)
      }
      if (response.data.error) {
        setQbook([])
      toast.error(response.data.message)

      }
      setLoading(false)
    }
  };

  const handleRejection = async (comment, id) => {
    const response = await axios.post(
      `${url}/api/course/admin/rejectquestion/QBook/${id}`,
      { rejectingcomment: comment }
    );
    // console.log(response);
    if (response.data.success) {
      // props.GetQBookQuestion();
      // props.RejectedGetQBookQuestion();
      setLoading(true)
      const response = await axios.get(`${url}/api/course/admin/QBook/${teacher}/${(page.page - 1) * 10}`);
      if (response.data.success) {
        setQbook(response.data.data)
      }
      if (response.data.error) {
        setQbook([])
        toast.error(response.data.message)

      }
      props.RejectedGetQBookQuestion(teacher);
      setLoading(false)
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
    console.log(data);
    const [comment, setComment] = React.useState("");
    // const tName = getTeacherName(data.uid);
    // tName.then((result) => setTeacher(result));

    return (
      <Box className={classes.questionContainer}>

        <Box style={{
          cursor: 'pointer'
        }} onClick={() => { setPopup({ open: true, id: data }) }}>
          <Typography variant="h6">
            Title :{/* <EditorJS data={JSON.parse(data.body)} /> */}
            {data.title}
            {/* {JSON.parse(data.body).blocks[0].text} */}
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
            onClick={() => handleApprovance(data.ID)}
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
          Question : {JSON.parse(data.body).blocks[0].text}
        </Typography>
        {data.rejectingcomment !== undefined && (
          <Typography variant="body1">
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
              ? <>
                {loading ? <Loading /> : QData.map((data, index) => { return RenderPendingQuestion(data, index); })}
                <Pagination style={{ paddingTop: 12 }} onChange={handleSPageChange} page={page.page} count={page.total} color="primary" />

              </>
              : null
            : RejectQData !== undefined
              ? <>{RejectQData.map((data, index) => {
                return RenderRejectedQuestion(data, index);
              })}
              </>
              : null}
        </Box>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Box mb={3}>
        <Grid container justify='space-between'>
          <Typography variant="h4" style={{ fontWeight: "bold", paddingTop: 12 }}>
            Q-Book Question List
        </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-teacher-label">Select teacher</InputLabel>
            <Select
              labelId="select-teacher"
              onChange={handleTeacher}
              value={teacher}
            >
              {teacherList.map(p =>
                <MenuItem key={p.uid} value={p.uid}>{p.userName}</MenuItem>
              )}

            </Select>
          </FormControl>
        </Grid>

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
            QData={qbook ? qbook : ""}
          ></TabPanel>
          <TabPanel
            value={value}
            index={1}
            RejectQData={props.qbook.rejectedqbookquestion}
          ></TabPanel>
        </div>
      </Box>
      <FullScreenDialog open={popup.open} handleClose={handlePopup}>
        {popup.open && <QBookViewPage questionData={popup.id}
          close={async () => {
            setPopup({ open: false, id: "" })
            setLoading(true)
            console.log(value);
            const response = await axios.get(`${url}/api/course/admin/QBook/${teacher}/${(page.page - 1) * 10}`);
            if (response.data.success) {
              setQbook(response.data.data)
            }
            if (response.data.error) {
              setQbook([])
      toast.error(response.data.message)

            }
            props.RejectedGetQBookQuestion(teacher);
            setLoading(false)
          }} />}
      </FullScreenDialog>

    </div>
  );
};

const MapStateToProps = (state) => ({
  qbook: state.getcourse,
  stateTeacherList: state.admin.teacherList,
});

export default connect(MapStateToProps, {
  // GetQBookQuestion,
  // GetQuestionViaId,
  RejectedGetQBookQuestion,
  EmptyCurrentQuestion,
})(QBookView);

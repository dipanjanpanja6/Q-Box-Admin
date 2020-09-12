import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Typography, Box, AppBar, Modal, TextField, Select, Grid, FormControl, InputLabel, MenuItem, Divider } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pagination from '@material-ui/lab/Pagination';
import axios from "axios";
import { url } from "../../config/config";
import FullScreenDialog from '../../Components/dialogComponent/dialog'
import QbankViewPage from '../QuestionView/QbankkViewQuestion';
import {
  // GetQBankQuestion,
  RejectedGetQBankQuestion,
  EmptyQuestion,
} from "../../redux/actions/getcourse";
import Loading from "../../Components/loading";

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

const QBankView = (props) => {
  const history = useHistory()
  const [teacherList, setTeacherList] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [teacher, setTeacher] = React.useState();
  const [page, setPage] = React.useState({ total: 0, page: 1 });
  const [popup, setPopup] = React.useState({ open: false, id: '' });
  const [qbank, setQbank] = React.useState([]);
  const [open, setOpen] = React.useState("");

  useEffect(() => {
    props.EmptyQuestion();
  }, []);

  useEffect(() => {
    setTeacherList(props.stateTeacherList)
  }, [props.stateTeacherList])
  // useEffect(() => {
  //   if (props.qbank.qbankquestion.page) {
  //     setPage({ ...page, total: props.qbank.qbankquestion.page })
  //   }
  // }, [props.qbank.qbankquestion])

  const handlePopup = () => {
    setPopup(!popup.open)
  }

  const handleSPageChange = async (event, value) => {
    setPage({ ...page, page: value })
    setLoading(true)
    const response = await axios.get(`${url}/api/course/admin/getqbankquestion/${teacher}/${(value-1) * 10}`);
    if (response.data.success) {
      setQbank(response.data.data)
    }
    if (response.data.error) {
      setQbank([])
    }
    setLoading(false)
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  const handleApprovance = async (id) => {
    const response = await axios.get(
      `${url}/api/course/admin/approvequestion/Qbank/${id}`
    );
    if (response.data.success) {
      setLoading(true)

      const response = await axios.get(`${url}/api/course/admin/getqbankquestion/${teacher}/${(page.page-1) * 10}`);
      if (response.data.success) {
        setQbank(response.data.data)
      }
      if (response.data.error) {
        setQbank([])
      }
      setLoading(false)
    }
  };

  const handleRejection = async (comment, id) => {
    const response = await axios.post(
      `${url}/api/course/admin/rejectquestion/Qbank/${id}`,
      { rejectingcomment: comment }
    );
    // console.log(response);
    if (response.data.success) {
      setLoading(true)
      // var vv=value
      const response = await axios.get(`${url}/api/course/admin/getqbankquestion/${teacher}/${(page.page-1) * 10}`);
      if (response.data.success) {
        setQbank(response.data.data)
      }
      if (response.data.error) {
        setQbank([])
      }
      props.RejectedGetQBankQuestion(teacher);
      setLoading(false)
    }
  };
  const handleTeacher = async (e) => {
    setTeacher(e.target.value)
    setPage({ total:0, page: 1 })
    // props.GetQBankQuestion(e.target.value, 0);
    props.RejectedGetQBankQuestion(e.target.value);
    setLoading(true)
    const response = await axios.get(`${url}/api/course/admin/getqbankquestion/${e.target.value}/0`);
    if (response.data.page) {
      setPage({ ...page, total: response.data.page })
    }
    if (response.data.success) {
      setQbank(response.data.data)
    }
    if (response.data.error) {
      setQbank([])
    }
    setLoading(false)
  }

  const RenderPendingQuestion = (data, index) => {
    const classes = useStyles();
    const [comment, setComment] = React.useState("");

    return (
      <Box key={index} className={classes.questionContainer}>
        <Box style={{
          cursor: 'pointer'
        }} onClick={() => { setPopup({ open: true, id: data }) }}>
          <Typography variant="h6">
            Question : {JSON.parse(data.question).blocks[0].text}
          </Typography>
          <Typography variant="p" color="primary">
            {"Chapter : "}
            <strong> {data.chapter}</strong>
            <br></br>
          </Typography>
          <Typography variant="p" color="primary">
            {"Stream : "}
            <strong> {data.stream}</strong>
            <br></br>
          </Typography>
          <Typography variant="p" color="primary">
            {"Upload on : "}
            <strong> {new Date(data.createdAt._seconds * 1000).toLocaleString()}</strong>
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
        {/* </Link> */}
        <Box className={classes.buttonContainer}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleApprovance(data.ID)}
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
      <Box key={index} className={classes.questionContainer}>
        <Typography variant="h6">
          Question : {JSON.parse(data.question).blocks[0].text}
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
              ? <>
                {loading ? <Loading /> : QData.map((data, index) => { return RenderPendingQuestion(data, index) })}
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
            Q-Bank Question List
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
            QData={qbank ? qbank : ""}
          ></TabPanel>
          <TabPanel
            value={value}
            index={1}
            RejectQData={props.rejectedqbankquestion}
          ></TabPanel>
        </div>
      </Box>
      <FullScreenDialog open={popup.open} handleClose={handlePopup}>
        {popup.open && <QbankViewPage questionData={popup.id} close={async() => {
          setPopup({ open: false, id: "" })
          setLoading(true)
          console.log(value);
          const response = await axios.get(`${url}/api/course/admin/getqbankquestion/${teacher}/${(page.page-1) * 10}`);
          if (response.data.success) {
            setQbank(response.data.data)
          }
          if (response.data.error) {
            setQbank([])
          }
          props.RejectedGetQBankQuestion(teacher);
          setLoading(false)
        }} />}
      </FullScreenDialog>
    </div>
  );
};
QBankView.prototypes = {
  stateTeacherList: PropTypes.array.isRequired,
  rejectedqbankquestion: PropTypes.object.isRequired,
  // GetQBankQuestion:PropTypes.func.isRequired,
  RejectedGetQBankQuestion: PropTypes.func.isRequired,
  EmptyQuestion: PropTypes.func.isRequired,
}
const MapStateToProps = (state) => ({
  rejectedqbankquestion: state.getcourse.rejectedqbankquestion,
  stateTeacherList: state.admin.teacherList,
})

export default connect(MapStateToProps, {
  // GetQBankQuestion,
  RejectedGetQBankQuestion,
  EmptyQuestion,
})(QBankView);

import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Input from "@material-ui/core/Input";
import LoginImg from "../static/login.svg";
import Person from "@material-ui/icons/PersonRounded";
import {
  Toolbar,
  makeStyles,
  Fab,
  Link,
  Card,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, Link as RouterLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropType from "prop-types";
import { login, checkTeacher } from "../redux/actions/admin";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loading from "../Components/loading";
import { boxColor } from "../config/config";

const styles = makeStyles((t) => ({
  root: {
    height: `calc(100vh - 65px)`,
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "center",
    [t.breakpoints.down("xs")]: {
      // flexDirection:'row',
    },
  },
  baseStyle: {
    borderRadius: "50%",
  },
  boxStyle: {
    borderRadius: "0%",
  },
  input: {
    paddingLeft: 12,
    margin: 0,
    height: "100%",
    color: "#f00",
    fontWeight: "bold",
    "&::placeholder": {
      color: "#f00",
      // fontFamily: 'Poppins',
      fontSize: 15,
      opacity: ".6",
      // paddingLeft: 12,
      margin: 0,
      height: "100%",
    },
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },

  released: {
    boxShadow: "10px 10px 14px 1px rgba(00,00,00,0.2)",
    background: boxColor,
  },
  login: {
    height: 500,
    // width: pxToVw(600),
    [t.breakpoints.down("xs")]: {
      height: 400,
      width: "auto",
      padding: 12,
    },
  },
  logInput: {
    // width: pxToVw(464),
    minWidth: 200,
    [t.breakpoints.down("xs")]: {
      minWidth: "70vw",
    },
  },
  inputArea: {
    height: `30%`,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    background: boxColor,
    marginBottom: 12,
    width: "100%",
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
  },
  buttonLabel: {
    color: "#fff",
    textTransform: "uppercase",
  },
}));

const LoginPage = (props) => {
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const sty = styles();
  const history = useHistory();

  useEffect(() => {
    document.title = "Teacher Login | Qriocty Box";
  }, []);

  useEffect(() => {
    console.log(props);
    if (props.auth.teacherLogin) {
      setLoading(false);
      if (props.auth.teacherLogin.success) {
        history.push("/console");
      } else if (props.auth.teacherLogin.error) {
        toast.error(props.auth.teacherLogin.message);
        console.log(props.auth.teacherLogin.message);
      }
    }
  }, [props]);

  const submit = (e) => {
    e.preventDefault();
    const reqParams = {
      userEmailId: username,
      userPassword: password,
    };
    props.login(reqParams);
    setLoading(true);
  };

  return (
    <>
      <Toolbar style={{ background: boxColor }} />
      {props.islogin === false && (
        <Grid container className={sty.root}>
          <Card>
            <CardContent style={{ padding: "20px 10%", textAlign: "center" }}>
              <form onSubmit={submit} style={{ maxWidth: 300 }}>
                <TextField
                  label="User ID"
                  id="id"
                  onChange={(e) => setusername(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
                  id="pass"
                  onChange={(e) => setpassword(e.target.value)}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "20px 0" }}
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      )}
      {props.islogin === false && <Redirect to="/console" />}
      {props.islogin === null && <Loading />}
    </>
  );
};
LoginPage.prototype = {
  auth: PropType.object.isRequired,
  login: PropType.func.isRequired,
  // checkTeacher:PropType.func.isRequired
};
const mapToProp = {
  login,
};
const mapToState = (state) => ({
  auth: state.admin,
});
export default connect(mapToState, mapToProp)(LoginPage);

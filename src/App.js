import React, { useState, useEffect } from "react";
import Loading from "./Components/loading";

import TLogin from "./Views/teacherLogin";

// import Dashboard from './Views/Dashboard';

import Appbar from "./Components/AppBar";

import E4 from "./Views/E4";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Console from './Views/Console'

// import Upload from './Views/selectUpload'
// import UploadBank from './Views/UploadQBank'
// import UploadBook from './Views/UploadQbook'
// import Alert from './Views/alert'
// import WeeklyTest from './Views/weekly-test'
// import MonthlyTest from './Views/monthly-test'

import { connect } from "react-redux";
import { checkAdmin, logout } from "./redux/actions/admin";
import PropType from "prop-types";
import { url } from "./config/config";
import Console from "./Views/Drawer";
import MainView from "./Views/MainView";
import QBookView from "./Views/TestView/Qbookview";
import QBankView from "./Views/TestView/QbankView";
import WeeklyTestView from "./Views/TestView/WeeklyTestView";
import MonthlyTestView from "./Views/TestView/MonthlyTestView";
import QBookQuestion from "./Views/QuestionView/QbookViewQuestion";
import QBankQuestion from "./Views/QuestionView/QbankkViewQuestion";
import MonthlyQuestion from "./Views/QuestionView/MonthlytestquestionView";
import WeeklyQuestion from "./Views/QuestionView/WeeklytestquestionView";
import VideoPlayer from "./Components/videoPlayer";

const App = (props) => {
  useEffect(() => {
    props.checkAdmin();
  }, []);

  const out = () => {
    console.log("auth");
    props.logout();
  };
  console.log(props);

  return (
    <div>
      <Router>
        <Appbar auth={props.auth} out={out} />
        {props.auth ? <Console /> : <TLogin islogin={props.auth} />}
        <Switch>
          
          <Route
            exact
            path="/"
            render={
              !props.auth
                ? () => <TLogin islogin={props.auth} />
                : () => <Redirect to="/console" />
            }
          />

          <Route
            exact
            path="/console"
            render={props.auth ? () => <MainView /> : null}
          />
          <Route
            exact
            path="/qbook"
            render={props.auth ? () => <QBookView /> : null}
          />
          <Route
            exact
            path="/qbank"
            render={props.auth ? () => <QBankView /> : null}
          />
          <Route
            exact
            path="/weeklytest"
            render={props.auth ? () => <WeeklyTestView /> : null}
          />
          <Route
            exact
            path="/monthlytest"
            render={props.auth ? () => <MonthlyTestView /> : null}
          />

          <Route
            exact
            path="/qbookquestionview"
            render={props.auth ? () => <QBookQuestion /> : null}
          />
          <Route
            exact
            path="/qbankkquestionview"
            render={props.auth ? () => <QBankQuestion /> : null}
          />
          <Route
            exact
            path="/weeklyquestionview"
            render={props.auth ? () => <WeeklyQuestion /> : null}
          />
          <Route
            exact
            path="/monthlyquestionview"
            render={props.auth ? () => <MonthlyQuestion /> : null}
          />
          
          <Route
            exact
            path="/test"
            component={VideoPlayer }
          />

          {/* <Route
            exact
            path="/console"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <Console islogin={props.auth} />
              ) : (
                <Redirect to={{ pathname: "/", state: { from: location } }} />
              )
            }
          /> */}

          <Route exact component={E4} />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
};
App.prototype = {
  auth: PropType.object.isRequired,
  checkAdmin: PropType.func.isRequired,
  logout: PropType.func.isRequired,
};
const mapToProp = {
  logout,
  checkAdmin,
};
const mapToState = (state) => ({
  auth: state.admin.adminAuth,
});
export default connect(mapToState, mapToProp)(App);

{
  /* 
					<Route exact path="/q-book" component={UploadBook} />
					<Route exact path="/q-bank" component={UploadBank} /> */
}
{
  /* <Route exact path="/upload" component={Upload} /> */
}
{
  /* <Route exact path="/monthly-test" component={WeeklyTest} />
					<Route exact path="/weekly-test" component={WeeklyTest} /> */
}

{
  /* <Route exact path="/q-book" component={
						({ location }) => props.auth === null ? <Loading /> : props.auth === true ? <UploadBook islogin={props.auth} /> : <Redirect to={{ pathname: "/", state: { from: location } }} />
					} />
					<Route exact path="/q-bank" component={
						({ location }) => props.auth === null ? <Loading /> : props.auth === true ? <UploadBank islogin={props.auth} /> : <Redirect to={{ pathname: "/", state: { from: location } }} />
					} />
					<Route exact path="/monthly-test" component={
						({ location }) => props.auth === null ? <Loading /> : props.auth === true ? <MonthlyTest islogin={props.auth} /> : <Redirect to={{ pathname: "/", state: { from: location } }} />
					} />
					<Route exact path="/weekly-test" component={
						({ location }) => props.auth === null ? <Loading /> : props.auth === true ? <WeeklyTest islogin={props.auth} /> : <Redirect to={{ pathname: "/", state: { from: location } }} />
					} />
					<Route exact path="/alert" component={
						({ location }) => props.auth === null ? <Loading /> : props.auth === true ? <Alert islogin={props.auth} /> : <Redirect to={{ pathname: "/", state: { from: location } }} />
					} /> */
}

{
  /* <Route exact path="/console" component={
						({ location }) => props.auth === null ? <Loading />: props.auth === true ? <Console islogin={props.auth} /> : <Redirect to={{ pathname: "/", state: { from: location } }} /> 
					} /> */
}
{
  /* <Route exact path="/console" render={() => <Console islogin={props.auth} />} /> */
}

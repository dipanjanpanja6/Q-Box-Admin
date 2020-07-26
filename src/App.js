import React, { useState, useEffect } from 'react';
import Loading from './Components/loading'


import TLogin from './Views/teacherLogin';

// import Dashboard from './Views/Dashboard';

import Appbar from './Components/AppBar';

import E4 from './Views/E4';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

// import Console from './Views/Console'

// import Upload from './Views/selectUpload'
// import UploadBank from './Views/UploadQBank'
// import UploadBook from './Views/UploadQbook'
// import Alert from './Views/alert' 
// import WeeklyTest from './Views/weekly-test'
// import MonthlyTest from './Views/monthly-test'


import { connect } from 'react-redux';
import { checkAdmin, logout } from './redux/actions/admin'
import PropType from 'prop-types'
import { url } from './config/config';



const App = (props) => {

	useEffect(() => {
		props.checkAdmin()
	}, [])

	const out = () => {
		console.log("auth");
		props.logout();
	}
	console.log(props);

	return (
		<div>
			<Router>
				<Appbar auth={props.auth} out={out} /> 
				<Switch>
{/* 
					<Route exact path="/q-book" component={UploadBook} />
					<Route exact path="/q-bank" component={UploadBank} /> */}
					{/* <Route exact path="/upload" component={Upload} /> */}
					{/* <Route exact path="/monthly-test" component={WeeklyTest} />
					<Route exact path="/weekly-test" component={WeeklyTest} /> */} 

					{/* <Route exact path="/q-book" component={
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
					} /> */}




					<Route exact path="/" render={() => <TLogin islogin={props.auth} />} />

					{/* <Route exact path="/console" component={
						({ location }) => props.auth === null ? <Loading />: props.auth === true ? <Console islogin={props.auth} /> : <Redirect to={{ pathname: "/", state: { from: location } }} /> 
					} /> */}
					{/* <Route exact path="/console" render={() => <Console islogin={props.auth} />} /> */}

					<Route exact component={E4} />


				</Switch>
			</Router> 
			<ToastContainer />
		</div >

	);
}
App.prototype = {
	auth: PropType.object.isRequired,
	checkAdmin: PropType.func.isRequired,
	logout: PropType.func.isRequired,
}
const mapToProp = {
	logout, checkAdmin
}
const mapToState = (state) => ({
	auth: state.admin.adminAuth,
})
export default connect(mapToState, mapToProp)(App);

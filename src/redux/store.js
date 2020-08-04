import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import admin from "./reduser/admin";
import getcourse from "./reduser/getcourse";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  admin: admin,
  getcourse: getcourse,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) 
);

export default store;

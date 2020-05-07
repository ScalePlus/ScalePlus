import { combineReducers } from "redux";
import * as signupReducer from "../components/signup/reducer";
import * as emailVerificationReducer from "../components/emailVerification/reducer";

export default combineReducers(
  Object.assign(signupReducer, emailVerificationReducer)
);

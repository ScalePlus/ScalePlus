import { combineReducers } from "redux";
import * as signupReducer from "../components/signup/reducer";

export default combineReducers(Object.assign(signupReducer));

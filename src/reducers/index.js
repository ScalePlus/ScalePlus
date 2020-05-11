import { combineReducers } from "redux";
import * as signupReducer from "../components/signup/reducer";
import * as emailVerificationReducer from "../components/emailVerification/reducer";
import * as signinReducer from "../components/signin/reducer";
import * as updateDetailsReducer from "../components/details/reducer";
import * as updateBusinessTagsReducer from "../components/businessTags/reducer";
import * as updateEssentialDetailsReducer from "../components/essentialDetails/reducer";
import * as resetPasswordReducer from "../components/resetPassword/reducer";

export default combineReducers(
  Object.assign(
    signupReducer,
    emailVerificationReducer,
    signinReducer,
    updateDetailsReducer,
    updateBusinessTagsReducer,
    updateEssentialDetailsReducer,
    resetPasswordReducer
  )
);

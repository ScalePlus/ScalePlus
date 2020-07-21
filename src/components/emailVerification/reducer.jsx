import createReducer from "../../reducers/createReducer";
import {
  EMAIL_VERIFICATION_LOADING,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  RESEND_EMAIL_VERIFICATION_LOADING,
  RESEND_EMAIL_VERIFICATION_SUCCESS,
  RESEND_EMAIL_VERIFICATION_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  resendSuccess: null,
};

export const emailVerificationReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [EMAIL_VERIFICATION_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
      resendSuccess: null,
    });
  },
  [EMAIL_VERIFICATION_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
      resendSuccess: null,
    });
  },
  [EMAIL_VERIFICATION_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
      resendSuccess: null,
    });
  },
  [RESEND_EMAIL_VERIFICATION_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      resendSuccess: null,
      error: null,
    });
  },
  [RESEND_EMAIL_VERIFICATION_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      resendSuccess: action.payload,
      error: null,
    });
  },
  [RESEND_EMAIL_VERIFICATION_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      resendSuccess: null,
      error: action.payload,
    });
  },
});

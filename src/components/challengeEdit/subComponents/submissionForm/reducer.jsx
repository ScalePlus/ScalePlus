import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_SUBMISSION_FORM_LOADING,
  ATTACH_SUBMISSION_FORM_SUCCESS,
  ATTACH_SUBMISSION_FORM_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../../../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeSubmissionformReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [ATTACH_SUBMISSION_FORM_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_SUBMISSION_FORM_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_SUBMISSION_FORM_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

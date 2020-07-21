import createReducer from "../../../../reducers/createReducer";
import {
  FILL_SUBMISSION_FORM_LOADING,
  FILL_SUBMISSION_FORM_SUCCESS,
  FILL_SUBMISSION_FORM_ERROR,
  SUBMISSION_FORM_LIST_LOADING,
  SUBMISSION_FORM_LIST_SUCCESS,
  SUBMISSION_FORM_LIST_ERROR,
  DISQUALIFY_SUBMISSION_FORM_LOADING,
  DISQUALIFY_SUBMISSION_FORM_SUCCESS,
  DISQUALIFY_SUBMISSION_FORM_ERROR,
  JUDGE_SUBMISSION_FORM_LOADING,
  JUDGE_SUBMISSION_FORM_SUCCESS,
  JUDGE_SUBMISSION_FORM_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../../../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  submissionsListSuccess: null,
  disqualifySuccess: null,
  judgeSuccess: null,
};

export const submissionListReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [FILL_SUBMISSION_FORM_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [FILL_SUBMISSION_FORM_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [FILL_SUBMISSION_FORM_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [SUBMISSION_FORM_LIST_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      disqualifySuccess: null,
      judgeSuccess: null,
      submissionsListSuccess: null,
      error: null,
    });
  },
  [SUBMISSION_FORM_LIST_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      disqualifySuccess: null,
      judgeSuccess: null,
      submissionsListSuccess: action.payload,
      error: null,
    });
  },
  [SUBMISSION_FORM_LIST_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      disqualifySuccess: null,
      judgeSuccess: null,
      submissionsListSuccess: null,
      error: action.payload,
    });
  },
  [DISQUALIFY_SUBMISSION_FORM_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      disqualifySuccess: null,
      error: null,
    });
  },
  [DISQUALIFY_SUBMISSION_FORM_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      disqualifySuccess: action.payload,
      error: null,
    });
  },
  [DISQUALIFY_SUBMISSION_FORM_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      disqualifySuccess: null,
      error: action.payload,
    });
  },
  [JUDGE_SUBMISSION_FORM_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      judgeSuccess: null,
      error: null,
    });
  },
  [JUDGE_SUBMISSION_FORM_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      judgeSuccess: action.payload,
      error: null,
    });
  },
  [JUDGE_SUBMISSION_FORM_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      judgeSuccess: null,
      error: action.payload,
    });
  },
});

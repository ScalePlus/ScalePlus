import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_SUMMARY_LOADING,
  ATTACH_SUMMARY_SUCCESS,
  ATTACH_SUMMARY_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../../../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeSummaryReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [ATTACH_SUMMARY_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_SUMMARY_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_SUMMARY_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

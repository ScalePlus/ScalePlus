import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_JUDGES_NDA_LOADING,
  ATTACH_JUDGES_NDA_SUCCESS,
  ATTACH_JUDGES_NDA_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../../../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeJudgesNDAReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [ATTACH_JUDGES_NDA_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_JUDGES_NDA_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_JUDGES_NDA_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

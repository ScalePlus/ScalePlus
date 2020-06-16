import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_JUDGES_LOADING,
  ATTACH_JUDGES_SUCCESS,
  ATTACH_JUDGES_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeJudgesReducer = createReducer(initialState, {
  [ATTACH_JUDGES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_JUDGES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_JUDGES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});
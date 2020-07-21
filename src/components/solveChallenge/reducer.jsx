import createReducer from "../../reducers/createReducer";
import {
  SOLVE_CHALLENGE_LOADING,
  SOLVE_CHALLENGE_SUCCESS,
  SOLVE_CHALLENGE_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const SolveChallengeReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [SOLVE_CHALLENGE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [SOLVE_CHALLENGE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [SOLVE_CHALLENGE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

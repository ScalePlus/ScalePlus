import createReducer from "../../../../reducers/createReducer";
import {
  UPDATE_DESC_LOADING,
  UPDATE_DESC_SUCCESS,
  UPDATE_DESC_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../../../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeDescriptionReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [UPDATE_DESC_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [UPDATE_DESC_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [UPDATE_DESC_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

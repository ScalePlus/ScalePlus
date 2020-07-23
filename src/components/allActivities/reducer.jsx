import createReducer from "../../reducers/createReducer";
import {
  GET_ACTIVITIES_LOADING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  MARK_READ_LOADING,
  MARK_READ_SUCCESS,
  MARK_READ_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  activities: null,
};

export const activitiesReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [GET_ACTIVITIES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      activities: null,
      error: null,
      success: null,
    });
  },
  [GET_ACTIVITIES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      activities: action.payload,
      success: null,
      error: null,
    });
  },
  [GET_ACTIVITIES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      activities: null,
      success: null,
      error: action.payload,
    });
  },
  [MARK_READ_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [MARK_READ_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [MARK_READ_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

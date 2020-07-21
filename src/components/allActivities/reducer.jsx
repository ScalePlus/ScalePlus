import createReducer from "../../reducers/createReducer";
import {
  GET_ACTIVITIES_LOADING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../signin/types";

let initialState = {
  loading: false,
  error: null,
  activities: null,
};

export const activitiesReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [GET_ACTIVITIES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
    });
  },
  [GET_ACTIVITIES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      activities: action.payload,
      error: null,
    });
  },
  [GET_ACTIVITIES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      activities: null,
      error: action.payload,
    });
  },
});

import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_TIMELINE_LOADING,
  ATTACH_TIMELINE_SUCCESS,
  ATTACH_TIMELINE_ERROR,
  TIMELINE_STATES_LOADING,
  TIMELINE_STATES_SUCCESS,
  TIMELINE_STATES_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../../../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  timelineStatesSuccess: null,
};

export const challengeTimelineReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [ATTACH_TIMELINE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_TIMELINE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_TIMELINE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [TIMELINE_STATES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      timelineStatesSuccess: null,
      error: null,
    });
  },
  [TIMELINE_STATES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      timelineStatesSuccess: action.payload,
      error: null,
    });
  },
  [TIMELINE_STATES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      timelineStatesSuccess: null,
      error: action.payload,
    });
  },
});

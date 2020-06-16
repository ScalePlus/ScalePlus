import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_TIMELINE_LOADING,
  ATTACH_TIMELINE_SUCCESS,
  ATTACH_TIMELINE_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeTimelineReducer = createReducer(initialState, {
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
});

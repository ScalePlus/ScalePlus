import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_UPDATES_LOADING,
  ATTACH_UPDATES_SUCCESS,
  ATTACH_UPDATES_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeUpdatesReducer = createReducer(initialState, {
  [ATTACH_UPDATES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_UPDATES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_UPDATES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

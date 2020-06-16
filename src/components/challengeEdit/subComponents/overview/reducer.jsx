import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_OVERVIEW_LOADING,
  ATTACH_OVERVIEW_SUCCESS,
  ATTACH_OVERVIEW_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeOverviewReducer = createReducer(initialState, {
  [ATTACH_OVERVIEW_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_OVERVIEW_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_OVERVIEW_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_JUDGING_ACTIVITY_LOADING,
  ATTACH_JUDGING_ACTIVITY_SUCCESS,
  ATTACH_JUDGING_ACTIVITY_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeJudgingActivitiesReducer = createReducer(initialState, {
  [ATTACH_JUDGING_ACTIVITY_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_JUDGING_ACTIVITY_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_JUDGING_ACTIVITY_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

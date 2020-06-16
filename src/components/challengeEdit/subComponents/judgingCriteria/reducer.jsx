import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_JUDGING_CRITERIA_LOADING,
  ATTACH_JUDGING_CRITERIA_SUCCESS,
  ATTACH_JUDGING_CRITERIA_ERROR,
  GET_RATING_TYPES_LOADING,
  GET_RATING_TYPES_SUCCESS,
  GET_RATING_TYPES_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  ratingTypes: [],
};

export const challengeJudgingCriteriaReducer = createReducer(initialState, {
  [ATTACH_JUDGING_CRITERIA_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_JUDGING_CRITERIA_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_JUDGING_CRITERIA_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [GET_RATING_TYPES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      ratingTypes: [],
      error: null,
    });
  },
  [GET_RATING_TYPES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      ratingTypes: action.payload,
      error: null,
    });
  },
  [GET_RATING_TYPES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      ratingTypes: [],
      error: action.payload,
    });
  },
});

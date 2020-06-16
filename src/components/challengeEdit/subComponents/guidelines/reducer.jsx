import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_GUIDELINE_LOADING,
  ATTACH_GUIDELINE_SUCCESS,
  ATTACH_GUIDELINE_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeGuidelineReducer = createReducer(initialState, {
  [ATTACH_GUIDELINE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_GUIDELINE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_GUIDELINE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});
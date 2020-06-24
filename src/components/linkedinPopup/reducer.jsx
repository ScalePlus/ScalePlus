import createReducer from "../../reducers/createReducer";
import {
  LINKEDIN_DATA_LOADING,
  LINKEDIN_DATA_SUCCESS,
  LINKEDIN_DATA_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const linkedinDataReducer = createReducer(initialState, {
  [LINKEDIN_DATA_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [LINKEDIN_DATA_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [LINKEDIN_DATA_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

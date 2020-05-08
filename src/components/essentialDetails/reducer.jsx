import createReducer from "../../reducers/createReducer";
import {
  UPDATE_ESSENTIAL_DETAILS_LOADING,
  UPDATE_ESSENTIAL_DETAILS_SUCCESS,
  UPDATE_ESSENTIAL_DETAILS_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const updateEssentialDetailsReducer = createReducer(initialState, {
  [UPDATE_ESSENTIAL_DETAILS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [UPDATE_ESSENTIAL_DETAILS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [UPDATE_ESSENTIAL_DETAILS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

import createReducer from "../../reducers/createReducer";
import {
  UPDATE_DETAILS_LOADING,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_ERROR,
  UPLOAD_LOGO_LOADING,
  UPLOAD_LOGO_SUCCESS,
  UPLOAD_LOGO_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  uploadedLogo: null,
};

export const updateDetailsReducer = createReducer(initialState, {
  [UPDATE_DETAILS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [UPDATE_DETAILS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [UPDATE_DETAILS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [UPLOAD_LOGO_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      uploadedLogo: null,
      error: null,
    });
  },
  [UPLOAD_LOGO_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      uploadedLogo: action.payload,
      error: null,
    });
  },
  [UPLOAD_LOGO_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      uploadedLogo: null,
      error: action.payload,
    });
  },
});

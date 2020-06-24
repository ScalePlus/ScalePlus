import createReducer from "../../reducers/createReducer";
import {
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GOOGLE_SIGNUP_LOADING,
  GOOGLE_SIGNUP_SUCCESS,
  GOOGLE_SIGNUP_ERROR,
  LINKEDIN_SIGNUP_LOADING,
  LINKEDIN_SIGNUP_SUCCESS,
  LINKEDIN_SIGNUP_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const signupReducer = createReducer(initialState, {
  [SIGNUP_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [SIGNUP_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [SIGNUP_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [GOOGLE_SIGNUP_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [GOOGLE_SIGNUP_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [GOOGLE_SIGNUP_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [LINKEDIN_SIGNUP_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [LINKEDIN_SIGNUP_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [LINKEDIN_SIGNUP_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

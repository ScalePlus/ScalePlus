import createReducer from "../../reducers/createReducer";
import {
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  LOGGEDIN_USER_LOADING,
  LOGGEDIN_USER_SUCCESS,
  LOGGEDIN_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  userData: null,
};

export const signinReducer = createReducer(initialState, {
  [SIGNIN_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [SIGNIN_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [SIGNIN_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [LOGGEDIN_USER_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      userData: null,
      error: null,
    });
  },
  [LOGGEDIN_USER_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      userData: action.payload,
      error: null,
    });
  },
  [LOGGEDIN_USER_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      userData: null,
      error: action.payload,
    });
  },
  [GET_USER_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      userData: null,
      error: null,
    });
  },
  [GET_USER_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      userData: action.payload,
      error: null,
    });
  },
  [GET_USER_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      userData: null,
      error: action.payload,
    });
  },
});

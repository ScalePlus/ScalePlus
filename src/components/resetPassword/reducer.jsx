import createReducer from "../../reducers/createReducer";
import {
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  changePasswordSuccess: null,
};

export const resetPasswordReducer = createReducer(initialState, {
  [RESET_PASSWORD_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [RESET_PASSWORD_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [RESET_PASSWORD_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [CHANGE_PASSWORD_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      changePasswordSuccess: null,
      error: null,
    });
  },
  [CHANGE_PASSWORD_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      changePasswordSuccess: action.payload,
      error: null,
    });
  },
  [CHANGE_PASSWORD_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      changePasswordSuccess: null,
      error: action.payload,
    });
  },
});

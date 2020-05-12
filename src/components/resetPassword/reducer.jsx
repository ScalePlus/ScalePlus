import createReducer from "../../reducers/createReducer";
import {
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CLEAR_ALL_SUCCESS,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  restPasswordSuccess: null,
  changePasswordSuccess: null,
};

export const resetPasswordReducer = createReducer(initialState, {
  [CLEAR_ALL_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      restPasswordSuccess: null,
      changePasswordSuccess: null,
    });
  },
  [RESET_PASSWORD_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
    });
  },
  [RESET_PASSWORD_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      restPasswordSuccess: action.payload,
      error: null,
    });
  },
  [RESET_PASSWORD_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      restPasswordSuccess: null,
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

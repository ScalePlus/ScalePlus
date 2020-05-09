import createReducer from "../../reducers/createReducer";
import { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./types";

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
});

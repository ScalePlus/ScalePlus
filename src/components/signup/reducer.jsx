import createReducer from "../../reducers/createReducer";
import { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./types";

let initialState = {
  loading: false,
  error: null,
  data: null,
};

export const signupReducer = createReducer(initialState, {
  [SIGNUP_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      data: null,
      error: null,
    });
  },
  [SIGNUP_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      data: action.payload,
      error: null,
    });
  },
  [SIGNUP_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      error: action.payload,
    });
  },
});

import createReducer from "../../reducers/createReducer";
import {
  UPDATE_STATUS_LOADING,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_ERROR,
} from "./types";
import { GET_ATTACHED_USERS_LOADING } from "../allUsers/types";
import { LOGOUT_SUCCESS } from "../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const updateProfileViewReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [GET_ATTACHED_USERS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: null,
    });
  },
  [UPDATE_STATUS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [UPDATE_STATUS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [UPDATE_STATUS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

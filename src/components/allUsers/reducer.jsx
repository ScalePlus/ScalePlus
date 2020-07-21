import createReducer from "../../reducers/createReducer";
import {
  GET_ATTACHED_USERS_LOADING,
  GET_ATTACHED_USERS_SUCCESS,
  GET_ATTACHED_USERS_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../signin/types";

let initialState = {
  loading: false,
  error: null,
  attachedUsers: null,
};

export const attachedUsersReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [GET_ATTACHED_USERS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
    });
  },
  [GET_ATTACHED_USERS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      attachedUsers: action.payload,
      error: null,
    });
  },
  [GET_ATTACHED_USERS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      attachedUsers: null,
      error: action.payload,
    });
  },
});

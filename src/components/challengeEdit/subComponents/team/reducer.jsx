import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_TEAM_LOADING,
  ATTACH_TEAM_SUCCESS,
  ATTACH_TEAM_ERROR,
} from "./types";
import { GET_ATTACHED_USERS_LOADING } from "../../../allUsers/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeTeamReducer = createReducer(initialState, {
  [GET_ATTACHED_USERS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: null,
    });
  },
  [ATTACH_TEAM_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_TEAM_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_TEAM_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

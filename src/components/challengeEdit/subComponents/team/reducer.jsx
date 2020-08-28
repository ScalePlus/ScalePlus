import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_TEAM_LOADING,
  ATTACH_TEAM_SUCCESS,
  ATTACH_TEAM_ERROR,
  ACCEPT_TEAM_INVITATION_LOADING,
  ACCEPT_TEAM_INVITATION_SUCCESS,
  ACCEPT_TEAM_INVITATION_ERROR,
} from "./types";
import { GET_ATTACHED_USERS_LOADING } from "../../../allUsers/types";
import { LOGOUT_SUCCESS } from "../../../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  acceptTeamInvitationSuccess: null,
};

export const challengeTeamReducer = createReducer(initialState, {
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
  [ACCEPT_TEAM_INVITATION_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      acceptTeamInvitationSuccess: null,
      error: null,
    });
  },
  [ACCEPT_TEAM_INVITATION_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      acceptTeamInvitationSuccess: action.payload,
      error: null,
    });
  },
  [ACCEPT_TEAM_INVITATION_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      acceptTeamInvitationSuccess: null,
      error: action.payload,
    });
  },
});

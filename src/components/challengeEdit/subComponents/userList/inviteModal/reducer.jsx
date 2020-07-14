import createReducer from "../../../../../reducers/createReducer";
import {
  INVITE_PARTICIPANTS_LOADING,
  INVITE_PARTICIPANTS_SUCCESS,
  INVITE_PARTICIPANTS_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeInviteParticipantsReducer = createReducer(initialState, {
  [INVITE_PARTICIPANTS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [INVITE_PARTICIPANTS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [INVITE_PARTICIPANTS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});
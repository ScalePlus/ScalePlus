import createReducer from "../../reducers/createReducer";
import {
  GET_MY_CHALLENGES_LOADING,
  GET_MY_CHALLENGES_SUCCESS,
  GET_MY_CHALLENGES_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  myChallenges: null,
};

export const myChallengesReducer = createReducer(initialState, {
  [GET_MY_CHALLENGES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      myChallenges: null,
      error: null,
    });
  },
  [GET_MY_CHALLENGES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      myChallenges: action.payload,
      error: null,
    });
  },
  [GET_MY_CHALLENGES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      myChallenges: null,
      error: action.payload,
    });
  },
});

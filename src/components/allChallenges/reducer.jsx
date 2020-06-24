import createReducer from "../../reducers/createReducer";
import {
  GET_ALL_CHALLENGES_LOADING,
  GET_ALL_CHALLENGES_SUCCESS,
  GET_ALL_CHALLENGES_ERROR,
  DO_SUBSCRIPTION_LOADING,
  DO_SUBSCRIPTION_SUCCESS,
  DO_SUBSCRIPTION_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  allChallenges: null,
  loadedPage: null,
  subscriptionSuccess: null,
};

export const allChallengesReducer = createReducer(initialState, {
  [GET_ALL_CHALLENGES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      error: null,
    });
  },
  [GET_ALL_CHALLENGES_SUCCESS](state, action) {
    let { allChallenges } = state;
    let { payload, loadedPage } = action;

    if (
      allChallenges &&
      allChallenges.result &&
      allChallenges.result.data &&
      allChallenges.result.data.length &&
      payload &&
      payload.result &&
      payload.result.data &&
      payload.result.data.length
    ) {
      if (!loadedPage) {
        allChallenges.result.data = payload.result.data;
      } else if (loadedPage && action.page > loadedPage) {
        allChallenges.result.data = allChallenges.result.data.concat(
          payload.result.data
        );
      }

      allChallenges.result.havemore = payload.result.havemore;

      return Object.assign({}, state, {
        loading: false,
        allChallenges: allChallenges,
        loadedPage: action.page,
        error: null,
      });
    } else {
      return Object.assign({}, state, {
        loading: false,
        allChallenges: action.payload,
        loadedPage: action.page,
        error: null,
      });
    }
  },
  [GET_ALL_CHALLENGES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      allChallenges: null,
      error: action.payload,
    });
  },
  [DO_SUBSCRIPTION_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      subscriptionSuccess: null,
      error: null,
    });
  },
  [DO_SUBSCRIPTION_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      subscriptionSuccess: action.payload,
      error: null,
    });
  },
  [DO_SUBSCRIPTION_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      subscriptionSuccess: null,
      error: action.payload,
    });
  },
});

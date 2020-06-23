import createReducer from "../../../../reducers/createReducer";
import {
  SEARCH_ALL_LOADING,
  SEARCH_ALL_SUCCESS,
  SEARCH_ALL_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  searchData: null,
};

export const searchAllReducer = createReducer(initialState, {
  [SEARCH_ALL_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      searchData: null,
      error: null,
    });
  },
  [SEARCH_ALL_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      searchData: action.payload,
      error: null,
    });
  },
  [SEARCH_ALL_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      searchData: null,
      error: action.payload,
    });
  },
});

import createReducer from "../../reducers/createReducer";
import {
  SHARE_LINK_LOADING,
  SHARE_LINK_SUCCESS,
  SHARE_LINK_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const sharelinkReducer = createReducer(initialState, {
  [SHARE_LINK_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [SHARE_LINK_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [SHARE_LINK_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

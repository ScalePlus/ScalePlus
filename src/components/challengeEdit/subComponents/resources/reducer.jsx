import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_RESOURCES_LOADING,
  ATTACH_RESOURCES_SUCCESS,
  ATTACH_RESOURCES_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeResourceReducer = createReducer(initialState, {
  [ATTACH_RESOURCES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_RESOURCES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_RESOURCES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

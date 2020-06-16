import createReducer from "../../../../reducers/createReducer";
import {
  ATTACH_LEGAL_AGREEMENT_LOADING,
  ATTACH_LEGAL_AGREEMENT_SUCCESS,
  ATTACH_LEGAL_AGREEMENT_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
};

export const challengeLegalAggreementReducer = createReducer(initialState, {
  [ATTACH_LEGAL_AGREEMENT_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [ATTACH_LEGAL_AGREEMENT_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [ATTACH_LEGAL_AGREEMENT_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
});

import createReducer from "../../reducers/createReducer";
import {
  UPDATE_ESSENTIAL_DETAILS_LOADING,
  UPDATE_ESSENTIAL_DETAILS_SUCCESS,
  UPDATE_ESSENTIAL_DETAILS_ERROR,
  CORE_BUSINESS_OPTIONS_LOADING,
  CORE_BUSINESS_OPTIONS_SUCCESS,
  CORE_BUSINESS_OPTIONS_ERROR,
  MARKET_STAGE_OPTIONS_LOADING,
  MARKET_STAGE_OPTIONS_SUCCESS,
  MARKET_STAGE_OPTIONS_ERROR,
  EXPERTISE_OPTIONS_LOADING,
  EXPERTISE_OPTIONS_SUCCESS,
  EXPERTISE_OPTIONS_ERROR,
  FUNDING_OPTIONS_LOADING,
  FUNDING_OPTIONS_SUCCESS,
  FUNDING_OPTIONS_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../signin/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  coreBusinessOptions: [],
  marketStagesOptions: [],
  expertisesOptions: [],
  fundingsOptions: [],
};

export const updateEssentialDetailsReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [UPDATE_ESSENTIAL_DETAILS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [UPDATE_ESSENTIAL_DETAILS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [UPDATE_ESSENTIAL_DETAILS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [CORE_BUSINESS_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      coreBusinessOptions: [],
      error: null,
    });
  },
  [CORE_BUSINESS_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      coreBusinessOptions: action.payload,
      error: null,
    });
  },
  [CORE_BUSINESS_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      coreBusinessOptions: [],
      error: action.payload,
    });
  },
  [MARKET_STAGE_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      marketStagesOptions: [],
      error: null,
    });
  },
  [MARKET_STAGE_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      marketStagesOptions: action.payload,
      error: null,
    });
  },
  [MARKET_STAGE_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      marketStagesOptions: [],
      error: action.payload,
    });
  },
  [EXPERTISE_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      expertisesOptions: [],
      error: null,
    });
  },
  [EXPERTISE_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      expertisesOptions: action.payload,
      error: null,
    });
  },
  [EXPERTISE_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      expertisesOptions: [],
      error: action.payload,
    });
  },
  [FUNDING_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      fundingsOptions: [],
      error: null,
    });
  },
  [FUNDING_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      fundingsOptions: action.payload,
      error: null,
    });
  },
  [FUNDING_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      fundingsOptions: [],
      error: action.payload,
    });
  },
});

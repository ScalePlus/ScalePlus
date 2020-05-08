import createReducer from "../../reducers/createReducer";
import {
  UPDATE_BUSINESS_TAGS_LOADING,
  UPDATE_BUSINESS_TAGS_SUCCESS,
  UPDATE_BUSINESS_TAGS_ERROR,
  INDUSTRIES_OPTIONS_LOADING,
  INDUSTRIES_OPTIONS_SUCCESS,
  INDUSTRIES_OPTIONS_ERROR,
  SERVICES_OPTIONS_LOADING,
  SERVICES_OPTIONS_SUCCESS,
  SERVICES_OPTIONS_ERROR,
  TECHNOLOGIES_OPTIONS_LOADING,
  TECHNOLOGIES_OPTIONS_SUCCESS,
  TECHNOLOGIES_OPTIONS_ERROR,
  BUSINESS_MODELS_OPTIONS_LOADING,
  BUSINESS_MODELS_OPTIONS_SUCCESS,
  BUSINESS_MODELS_OPTIONS_ERROR,
  TARGET_MARKET_OPTIONS_LOADING,
  TARGET_MARKET_OPTIONS_SUCCESS,
  TARGET_MARKET_OPTIONS_ERROR,
  GEOGRAPHICAL_MARKET_OPTIONS_LOADING,
  GEOGRAPHICAL_MARKET_OPTIONS_SUCCESS,
  GEOGRAPHICAL_MARKET_OPTIONS_ERROR,
} from "./types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  industriesOptions: [],
  servicesOptions: [],
  technologiesOptions: [],
  businessModelsOptions: [],
  targetMarketsOptions: [],
  geographicalMarketsOptions: [],
};

export const updateBusinessTagsReducer = createReducer(initialState, {
  [UPDATE_BUSINESS_TAGS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [UPDATE_BUSINESS_TAGS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [UPDATE_BUSINESS_TAGS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [INDUSTRIES_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      industriesOptions: [],
      error: null,
    });
  },
  [INDUSTRIES_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      industriesOptions: action.payload,
      error: null,
    });
  },
  [INDUSTRIES_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      industriesOptions: [],
      error: action.payload,
    });
  },
  [SERVICES_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      servicesOptions: [],
      error: null,
    });
  },
  [SERVICES_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      servicesOptions: action.payload,
      error: null,
    });
  },
  [SERVICES_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      servicesOptions: [],
      error: action.payload,
    });
  },
  [TECHNOLOGIES_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      technologiesOptions: [],
      error: null,
    });
  },
  [TECHNOLOGIES_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      technologiesOptions: action.payload,
      error: null,
    });
  },
  [TECHNOLOGIES_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      technologiesOptions: [],
      error: action.payload,
    });
  },
  [BUSINESS_MODELS_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      businessModelsOptions: [],
      error: null,
    });
  },
  [BUSINESS_MODELS_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      businessModelsOptions: action.payload,
      error: null,
    });
  },
  [BUSINESS_MODELS_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      businessModelsOptions: [],
      error: action.payload,
    });
  },
  [TARGET_MARKET_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      targetMarketsOptions: [],
      error: null,
    });
  },
  [TARGET_MARKET_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      targetMarketsOptions: action.payload,
      error: null,
    });
  },
  [TARGET_MARKET_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      targetMarketsOptions: [],
      error: action.payload,
    });
  },
  [GEOGRAPHICAL_MARKET_OPTIONS_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      geographicalMarketsOptions: [],
      error: null,
    });
  },
  [GEOGRAPHICAL_MARKET_OPTIONS_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      geographicalMarketsOptions: action.payload,
      error: null,
    });
  },
  [GEOGRAPHICAL_MARKET_OPTIONS_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      geographicalMarketsOptions: [],
      error: action.payload,
    });
  },
});

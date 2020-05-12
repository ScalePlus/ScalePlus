import {
  UPDATE_BUSINESS_TAGS_ACTION,
  INDUSTRIES_OPTIONS_ACTION,
  SERVICES_OPTIONS_ACTION,
  TECHNOLOGIES_OPTIONS_ACTION,
  BUSINESS_MODELS_OPTIONS_ACTION,
  TARGET_MARKET_OPTIONS_ACTION,
  GEOGRAPHICAL_MARKET_OPTIONS_ACTION,
  PRESERVE_BUSSINESS_TAG_ACTION,
} from "./types";

export const updateBusinessTagsAction = (data) => ({
  type: UPDATE_BUSINESS_TAGS_ACTION,
  payload: data,
});

export const industriesOptionsAction = () => ({
  type: INDUSTRIES_OPTIONS_ACTION,
});

export const servicesOptionsAction = () => ({
  type: SERVICES_OPTIONS_ACTION,
});

export const technologiesOptionsAction = () => ({
  type: TECHNOLOGIES_OPTIONS_ACTION,
});

export const businessModelsOptionsAction = () => ({
  type: BUSINESS_MODELS_OPTIONS_ACTION,
});

export const targetMarketsOptionsAction = () => ({
  type: TARGET_MARKET_OPTIONS_ACTION,
});

export const geographicalMarketsOptionsAction = () => ({
  type: GEOGRAPHICAL_MARKET_OPTIONS_ACTION,
});

export const preserveDataAction = (data) => ({
  type: PRESERVE_BUSSINESS_TAG_ACTION,
  payload: data,
});

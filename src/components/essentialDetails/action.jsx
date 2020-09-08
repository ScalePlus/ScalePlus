import {
  UPDATE_ESSENTIAL_DETAILS_ACTION,
  PRESERVE_ESSENTIAL_DATA_ACTION,
  CORE_BUSINESS_OPTIONS_ACTION,
  MARKET_STAGE_OPTIONS_ACTION,
  EXPERTISE_OPTIONS_ACTION,
  FUNDING_OPTIONS_ACTION,
} from "./types";

export const updateEssentialDetailsAction = (data) => ({
  type: UPDATE_ESSENTIAL_DETAILS_ACTION,
  payload: data,
});

export const preserveDataAction = (data) => ({
  type: PRESERVE_ESSENTIAL_DATA_ACTION,
  payload: data,
});

export const coreBusinessOptionsAction = () => ({
  type: CORE_BUSINESS_OPTIONS_ACTION,
});

export const marketStagesOptionsAction = () => ({
  type: MARKET_STAGE_OPTIONS_ACTION,
});

export const expertisesOptionsAction = () => ({
  type: EXPERTISE_OPTIONS_ACTION,
});

export const fundingsOptionsAction = () => ({
  type: FUNDING_OPTIONS_ACTION,
});

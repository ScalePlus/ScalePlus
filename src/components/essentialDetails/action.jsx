import {
  UPDATE_ESSENTIAL_DETAILS_ACTION,
  PRESERVE_ESSENTIAL_DATA_ACTION,
} from "./types";

export const updateEssentialDetailsAction = (data) => ({
  type: UPDATE_ESSENTIAL_DETAILS_ACTION,
  payload: data,
});

export const preserveDataAction = (data) => ({
  type: PRESERVE_ESSENTIAL_DATA_ACTION,
  payload: data,
});

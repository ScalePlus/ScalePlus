import { UPDATE_ESSENTIAL_DETAILS_ACTION } from "./types";

export const updateEssentialDetailsAction = (data) => ({
  type: UPDATE_ESSENTIAL_DETAILS_ACTION,
  payload: data,
});

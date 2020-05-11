import { UPDATE_DETAILS_ACTION } from "./types";

export const updateDetailsAction = (data) => ({
  type: UPDATE_DETAILS_ACTION,
  payload: data,
});

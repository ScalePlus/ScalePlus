import { UPDATE_STATUS_ACTION } from "./types";

export const updateStatusAction = (data) => ({
  type: UPDATE_STATUS_ACTION,
  payload: data,
});

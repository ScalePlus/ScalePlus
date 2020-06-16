import { UPDATE_DESC_ACTION } from "./types";

export const updateDescriptionAction = (data, id) => ({
  type: UPDATE_DESC_ACTION,
  payload: data,
  id,
});

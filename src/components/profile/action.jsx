import { UPDATE_PROFILE_ACTION } from "./types";

export const updateProfileAction = (data) => ({
  type: UPDATE_PROFILE_ACTION,
  payload: data,
});

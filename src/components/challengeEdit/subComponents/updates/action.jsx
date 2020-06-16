import { ATTACH_UPDATES_ACTION } from "./types";

export const attachUpdatesAction = (data, id) => ({
  type: ATTACH_UPDATES_ACTION,
  payload: data,
  id,
});

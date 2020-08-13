import { ATTACH_UPDATES_ACTION, UPDATE_VIEW_ACTION } from "./types";

export const attachUpdatesAction = (data, id) => ({
  type: ATTACH_UPDATES_ACTION,
  payload: data,
  id,
});

export const updateViewAction = (id) => ({
  type: UPDATE_VIEW_ACTION,
  id,
});

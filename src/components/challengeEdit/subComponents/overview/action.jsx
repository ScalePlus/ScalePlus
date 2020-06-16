import { ATTACH_OVERVIEW_ACTION } from "./types";

export const attachOverviewAction = (data, id) => ({
  type: ATTACH_OVERVIEW_ACTION,
  payload: data,
  id,
});

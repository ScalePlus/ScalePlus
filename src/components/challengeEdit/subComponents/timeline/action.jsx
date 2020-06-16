import { ATTACH_TIMELINE_ACTION } from "./types";

export const attachTimelineAction = (data, id) => ({
  type: ATTACH_TIMELINE_ACTION,
  payload: data,
  id,
});

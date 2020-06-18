import { ATTACH_TIMELINE_ACTION, TIMELINE_STATES_ACTION } from "./types";

export const attachTimelineAction = (data, id) => ({
  type: ATTACH_TIMELINE_ACTION,
  payload: data,
  id,
});

export const getTimelineStateAction = () => ({
  type: TIMELINE_STATES_ACTION,
});

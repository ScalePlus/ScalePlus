import { ATTACH_GUIDELINE_ACTION } from "./types";

export const attachGuidelineAction = (data, id) => ({
  type: ATTACH_GUIDELINE_ACTION,
  payload: data,
  id,
});

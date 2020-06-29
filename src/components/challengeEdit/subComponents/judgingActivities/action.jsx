import { ATTACH_JUDGING_ACTIVITY_ACTION } from "./types";

export const attachJudgingActivitiesAction = (data, id) => ({
  type: ATTACH_JUDGING_ACTIVITY_ACTION,
  payload: data,
  id,
});

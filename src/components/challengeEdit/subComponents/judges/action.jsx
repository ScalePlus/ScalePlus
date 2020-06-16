import { ATTACH_JUDGES_ACTION } from "./types";

export const attachJudgesAction = (data, id) => ({
  type: ATTACH_JUDGES_ACTION,
  payload: data,
  id,
});

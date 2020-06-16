import { ATTACH_JUDGES_NDA_ACTION } from "./types";

export const attachJudgesNDAAction = (data, id) => ({
  type: ATTACH_JUDGES_NDA_ACTION,
  payload: data,
  id,
});

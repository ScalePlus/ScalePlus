import { ATTACH_SUMMARY_ACTION } from "./types";

export const attachSummaryAction = (data, id) => ({
  type: ATTACH_SUMMARY_ACTION,
  payload: data,
  id,
});

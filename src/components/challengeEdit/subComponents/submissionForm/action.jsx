import { ATTACH_SUBMISSION_FORM_ACTION } from "./types";

export const attachSubmissionformAction = (data, id) => ({
  type: ATTACH_SUBMISSION_FORM_ACTION,
  payload: data,
  id,
});

import {
  FILL_SUBMISSION_FORM_ACTION,
  SUBMISSION_FORM_LIST_ACTION,
  DISQUALIFY_SUBMISSION_FORM_ACTION,
  JUDGE_SUBMISSION_FORM_ACTION,
} from "./types";

export const fillSubmissionformAction = (data, id) => ({
  type: FILL_SUBMISSION_FORM_ACTION,
  payload: data,
  id,
});

export const getSubmissionsListAction = (id) => ({
  type: SUBMISSION_FORM_LIST_ACTION,
  id,
});

export const disqualifySubmissionAction = (id, submissionId) => ({
  type: DISQUALIFY_SUBMISSION_FORM_ACTION,
  id,
  submissionId,
});

export const judgeSubmissionformAction = (id, submissionId, data) => ({
  type: JUDGE_SUBMISSION_FORM_ACTION,
  id,
  submissionId,
  payload: data,
});

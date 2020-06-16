import {
  ATTACH_JUDGING_CRITERIA_ACTION,
  GET_RATING_TYPES_ACTION,
} from "./types";

export const attachJudgingCriteriaAction = (data, id) => ({
  type: ATTACH_JUDGING_CRITERIA_ACTION,
  payload: data,
  id,
});

export const getRatingTypesAction = () => ({
  type: GET_RATING_TYPES_ACTION,
});

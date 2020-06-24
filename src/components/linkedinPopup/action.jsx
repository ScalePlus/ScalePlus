import { LINKEDIN_DATA_ACTION } from "./types";

export const getLinkedinDataAction = (data) => ({
  type: LINKEDIN_DATA_ACTION,
  payload: data,
});

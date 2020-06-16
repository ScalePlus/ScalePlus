import { GET_ALL_CHALLENGES_ACTION } from "./types";

export const getAllChallengeAction = (page) => ({
  type: GET_ALL_CHALLENGES_ACTION,
  page,
});

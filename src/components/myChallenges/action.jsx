import { GET_MY_CHALLENGES_ACTION } from "./types";

export const getMyChallengeAction = (filters) => ({
  type: GET_MY_CHALLENGES_ACTION,
  filters,
});

import { SOLVE_CHALLENGE_ACTION } from "./types";

export const solveChallengeAction = (id, data) => ({
  type: SOLVE_CHALLENGE_ACTION,
  id,
  payload: data,
});

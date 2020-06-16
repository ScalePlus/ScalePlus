import { ATTACH_TEAM_ACTION } from "./types";

export const attachTeamAction = (data, id) => ({
  type: ATTACH_TEAM_ACTION,
  payload: data,
  id,
});

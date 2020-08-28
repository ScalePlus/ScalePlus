import { ATTACH_TEAM_ACTION, ACCEPT_TEAM_INVITATION_ACTION } from "./types";

export const attachTeamAction = (data, id) => ({
  type: ATTACH_TEAM_ACTION,
  payload: data,
  id,
});

export const acceptTeamInvitationAction = (data) => ({
  type: ACCEPT_TEAM_INVITATION_ACTION,
  payload: data,
});

import {
  SOLVE_CHALLENGE_ACTION,
  ACCEPT_PARTICIPANT_INVITATION_ACTION,
} from "./types";

export const solveChallengeAction = (id, data) => ({
  type: SOLVE_CHALLENGE_ACTION,
  id,
  payload: data,
});

export const acceptParticipantInvitationAction = (data) => ({
  type: ACCEPT_PARTICIPANT_INVITATION_ACTION,
  payload: data,
});

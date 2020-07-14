import { INVITE_PARTICIPANTS_ACTION } from "./types";

export const inviteParticipantsAction = (data, id) => ({
  type: INVITE_PARTICIPANTS_ACTION,
  payload: data,
  id,
});

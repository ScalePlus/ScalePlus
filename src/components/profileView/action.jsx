import { UPDATE_STATUS_ACTION, CANCEL_INVITATION_ACTION } from "./types";

export const updateStatusAction = (data) => ({
  type: UPDATE_STATUS_ACTION,
  payload: data,
});

export const cancelInvitationAction = (data) => ({
  type: CANCEL_INVITATION_ACTION,
  payload: data,
});

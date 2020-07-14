import { GET_ATTACHED_USERS_ACTION } from "./types";

export const getAttachedUsersAction = (filters) => ({
  type: GET_ATTACHED_USERS_ACTION,
  filters,
});

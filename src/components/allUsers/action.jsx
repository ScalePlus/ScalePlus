import { GET_ATTACHED_USERS_ACTION } from "./types";

export const getAttachedUsersAction = (filters, searchText) => ({
  type: GET_ATTACHED_USERS_ACTION,
  filters,
  searchText,
});

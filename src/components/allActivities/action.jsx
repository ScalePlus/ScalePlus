import { GET_ACTIVITIES_ACTION, MARK_READ_ACTION } from "./types";

export const getActivitiesAction = (filters, searchText) => ({
  type: GET_ACTIVITIES_ACTION,
  filters,
  searchText,
});

export const markReadAction = () => ({
  type: MARK_READ_ACTION,
});

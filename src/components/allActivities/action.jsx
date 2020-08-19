import { GET_ACTIVITIES_ACTION, MARK_READ_ACTION } from "./types";

export const getActivitiesAction = (filters, searchText, challengeId) => ({
  type: GET_ACTIVITIES_ACTION,
  filters,
  searchText,
  challengeId,
});

export const markReadAction = () => ({
  type: MARK_READ_ACTION,
});

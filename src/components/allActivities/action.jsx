import { GET_ACTIVITIES_ACTION } from "./types";

export const getActivitiesAction = (filters, searchText) => ({
  type: GET_ACTIVITIES_ACTION,
  filters,
  searchText,
});

import { SEARCH_ALL_ACTION } from "./types";

export const searchAllAction = (searchText) => ({
  type: SEARCH_ALL_ACTION,
  searchText,
});

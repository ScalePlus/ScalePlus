import { UPDATE_DESC_ACTION, GET_TAGS_ACTION } from "./types";

export const updateDescriptionAction = (data, id) => ({
  type: UPDATE_DESC_ACTION,
  payload: data,
  id,
});

export const getTagsAction = () => ({
  type: GET_TAGS_ACTION,
});

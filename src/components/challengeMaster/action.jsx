import {
  CREATE_CHALLENGE_ACTION,
  GET_CHALLENGE_ACTION,
  UPLOAD_FILE_ACTION,
  CHALLENGE_CATEGORIES_ACTION,
  CHALLENGE_TAGS_ACTION,
  UPDATE_CHALLENGE_ACTION,
  UPDATE_CHALLENGE_VIEWS_ACTION,
  CURRENCY_LIST_ACTION,
} from "./types";

export const getCurrencyListAction = (data) => ({
  type: CURRENCY_LIST_ACTION,
  payload: data,
});

export const createChallengeAction = (data) => ({
  type: CREATE_CHALLENGE_ACTION,
  payload: data,
});

export const getChallengeAction = (id) => ({
  type: GET_CHALLENGE_ACTION,
  id,
});

export const updateChallengeAction = (data) => ({
  type: UPDATE_CHALLENGE_ACTION,
  payload: data,
});

export const updateChallengeViewsAction = (data) => ({
  type: UPDATE_CHALLENGE_VIEWS_ACTION,
  payload: data,
});

export const uploadFileAction = (data) => ({
  type: UPLOAD_FILE_ACTION,
  payload: data,
});

export const challengeCategoriesListAction = () => ({
  type: CHALLENGE_CATEGORIES_ACTION,
});

export const challengeTagsListAction = () => ({
  type: CHALLENGE_TAGS_ACTION,
});

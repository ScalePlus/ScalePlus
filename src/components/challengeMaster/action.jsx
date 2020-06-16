import {
  CREATE_CHALLENGE_ACTION,
  GET_CHALLENGE_ACTION,
  UPLOAD_FILE_ACTION,
  CHALLENGE_CATEGORIES_ACTION,
  UPDATE_CHALLENGE_ACTION,
} from "./types";

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

export const uploadFileAction = (data) => ({
  type: UPLOAD_FILE_ACTION,
  payload: data,
});

export const challengeCategoriesListAction = () => ({
  type: CHALLENGE_CATEGORIES_ACTION,
});

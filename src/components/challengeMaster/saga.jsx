import { put, takeLatest, call } from "redux-saga/effects";
import {
  CREATE_CHALLENGE_ACTION,
  CREATE_CHALLENGE_LOADING,
  CREATE_CHALLENGE_SUCCESS,
  CREATE_CHALLENGE_ERROR,
  GET_CHALLENGE_ACTION,
  GET_CHALLENGE_LOADING,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_ERROR,
  UPLOAD_FILE_ACTION,
  UPLOAD_FILE_LOADING,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CHALLENGE_CATEGORIES_ACTION,
  CHALLENGE_CATEGORIES_LOADING,
  CHALLENGE_CATEGORIES_SUCCESS,
  CHALLENGE_CATEGORIES_ERROR,
  UPDATE_CHALLENGE_ACTION,
  UPDATE_CHALLENGE_LOADING,
  UPDATE_CHALLENGE_SUCCESS,
  UPDATE_CHALLENGE_ERROR,
  UPDATE_CHALLENGE_VIEWS_ACTION,
  UPDATE_CHALLENGE_VIEWS_LOADING,
  UPDATE_CHALLENGE_VIEWS_SUCCESS,
  UPDATE_CHALLENGE_VIEWS_ERROR,
  CHALLENGE_TAGS_ACTION,
  CHALLENGE_TAGS_LOADING,
  CHALLENGE_TAGS_SUCCESS,
  CHALLENGE_TAGS_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";

function* createChallengeSaga(data) {
  yield put({ type: CREATE_CHALLENGE_LOADING });
  try {
    let res = yield call(Api.createChallenge, data.payload);
    if (res.status) {
      yield put({ type: CREATE_CHALLENGE_ERROR, payload: res.message });
    } else {
      yield put({ type: CREATE_CHALLENGE_SUCCESS, payload: res.result });
      history.push(`/challenge/confirmation/${res.result.challengeResult._id}`);
    }
  } catch (error) {
    yield put({ type: CREATE_CHALLENGE_ERROR, payload: error.message });
  }
}

function* getChallengeSaga(data) {
  yield put({ type: GET_CHALLENGE_LOADING });
  try {
    let res = yield call(Api.getChallenge, data.id);
    if (res.status) {
      yield put({ type: GET_CHALLENGE_ERROR, payload: res.message });
    } else {
      yield put({ type: GET_CHALLENGE_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: GET_CHALLENGE_ERROR, payload: error.message });
  }
}

function* updateChallengeSaga(data) {
  yield put({ type: UPDATE_CHALLENGE_LOADING });
  try {
    let res = yield call(Api.updateChallenge, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_CHALLENGE_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_CHALLENGE_SUCCESS, payload: res.result });
      history.push(`/dashboard`);
    }
  } catch (error) {
    yield put({ type: UPDATE_CHALLENGE_ERROR, payload: error.message });
  }
}

function* updateChallengeViewsSaga(data) {
  yield put({ type: UPDATE_CHALLENGE_VIEWS_LOADING });
  try {
    let res = yield call(Api.updateViews, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_CHALLENGE_VIEWS_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_CHALLENGE_VIEWS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: UPDATE_CHALLENGE_VIEWS_ERROR, payload: error.message });
  }
}

function* uploadFileSaga(data) {
  yield put({ type: UPLOAD_FILE_LOADING });
  try {
    let res = yield call(Api.uploadFile, data.payload);
    if (res.status) {
      yield put({ type: UPLOAD_FILE_ERROR, payload: res.message });
    } else {
      yield put({ type: UPLOAD_FILE_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: UPLOAD_FILE_ERROR, payload: error.message });
  }
}

function* challengeCategoriesListSaga() {
  yield put({ type: CHALLENGE_CATEGORIES_LOADING });
  try {
    let res = yield call(Api.challengeCategoriesList);
    if (res.status) {
      yield put({ type: CHALLENGE_CATEGORIES_ERROR, payload: res.message });
    } else {
      yield put({ type: CHALLENGE_CATEGORIES_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: CHALLENGE_CATEGORIES_ERROR, payload: error.message });
  }
}

function* challengeTagsListSaga() {
  yield put({ type: CHALLENGE_TAGS_LOADING });
  try {
    let res = yield call(Api.challengeTagsList);
    if (res.status) {
      yield put({ type: CHALLENGE_TAGS_ERROR, payload: res.message });
    } else {
      yield put({ type: CHALLENGE_TAGS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: CHALLENGE_TAGS_ERROR, payload: error.message });
  }
}

function* watchChallengeAsync() {
  yield takeLatest(CREATE_CHALLENGE_ACTION, createChallengeSaga);
  yield takeLatest(GET_CHALLENGE_ACTION, getChallengeSaga);
  yield takeLatest(UPDATE_CHALLENGE_ACTION, updateChallengeSaga);
  yield takeLatest(UPDATE_CHALLENGE_VIEWS_ACTION, updateChallengeViewsSaga);
  yield takeLatest(UPLOAD_FILE_ACTION, uploadFileSaga);
  yield takeLatest(CHALLENGE_CATEGORIES_ACTION, challengeCategoriesListSaga);
  yield takeLatest(CHALLENGE_TAGS_ACTION, challengeTagsListSaga);
}

export default watchChallengeAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_DESC_ACTION,
  UPDATE_DESC_LOADING,
  UPDATE_DESC_SUCCESS,
  UPDATE_DESC_ERROR,
  GET_TAGS_ACTION,
  GET_TAGS_LOADING,
  GET_TAGS_SUCCESS,
  GET_TAGS_ERROR,
} from "./types";
import Api from "./api";

function* updateDescriptionSaga(data) {
  yield put({ type: UPDATE_DESC_LOADING });
  try {
    let res = yield call(Api.updateDescription, data.payload, data.id);
    if (res.status) {
      yield put({ type: UPDATE_DESC_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_DESC_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: UPDATE_DESC_ERROR, payload: error.message });
  }
}

function* getTagsSaga() {
  yield put({ type: GET_TAGS_LOADING });
  try {
    let res = yield call(Api.getTags);
    if (res.status) {
      yield put({ type: GET_TAGS_ERROR, payload: res.message });
    } else {
      yield put({ type: GET_TAGS_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: GET_TAGS_ERROR, payload: error.message });
  }
}

function* watchUpdateDescriptionAsync() {
  yield takeLatest(UPDATE_DESC_ACTION, updateDescriptionSaga);
  yield takeLatest(GET_TAGS_ACTION, getTagsSaga);
}

export default watchUpdateDescriptionAsync;

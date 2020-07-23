import { put, takeLatest, call } from "redux-saga/effects";
import {
  GET_ACTIVITIES_ACTION,
  GET_ACTIVITIES_LOADING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  MARK_READ_ACTION,
  MARK_READ_LOADING,
  MARK_READ_SUCCESS,
  MARK_READ_ERROR,
} from "./types";
import Api from "./api";

function* getActivitiesSaga(data) {
  yield put({ type: GET_ACTIVITIES_LOADING });
  try {
    let res = yield call(Api.getActivities, data.filters, data.searchText);
    if (res.status) {
      yield put({ type: GET_ACTIVITIES_ERROR, payload: res.message });
    } else {
      yield put({
        type: GET_ACTIVITIES_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: GET_ACTIVITIES_ERROR, payload: error.message });
  }
}

function* markReadSaga() {
  yield put({ type: MARK_READ_LOADING });
  try {
    let res = yield call(Api.markRead);
    if (res.status) {
      yield put({ type: MARK_READ_ERROR, payload: res.message });
    } else {
      yield put({
        type: MARK_READ_SUCCESS,
        payload: res.message,
      });
    }
  } catch (error) {
    yield put({ type: MARK_READ_ERROR, payload: error.message });
  }
}

function* watchActivitiesAsync() {
  yield takeLatest(GET_ACTIVITIES_ACTION, getActivitiesSaga);
  yield takeLatest(MARK_READ_ACTION, markReadSaga);
}

export default watchActivitiesAsync;

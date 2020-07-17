import { put, takeLatest, call } from "redux-saga/effects";
import {
  GET_ACTIVITIES_ACTION,
  GET_ACTIVITIES_LOADING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
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

function* watchActivitiesAsync() {
  yield takeLatest(GET_ACTIVITIES_ACTION, getActivitiesSaga);
}

export default watchActivitiesAsync;

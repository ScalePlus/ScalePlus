import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_UPDATES_ACTION,
  ATTACH_UPDATES_LOADING,
  ATTACH_UPDATES_SUCCESS,
  ATTACH_UPDATES_ERROR,
} from "./types";
import Api from "./api";

function* attachUpdatesSaga(data) {
  yield put({ type: ATTACH_UPDATES_LOADING });
  try {
    let res = yield call(Api.attachUpdates, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_UPDATES_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_UPDATES_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_UPDATES_ERROR, payload: error.message });
  }
}

function* watchAttachUpdatesAsync() {
  yield takeLatest(ATTACH_UPDATES_ACTION, attachUpdatesSaga);
}

export default watchAttachUpdatesAsync;

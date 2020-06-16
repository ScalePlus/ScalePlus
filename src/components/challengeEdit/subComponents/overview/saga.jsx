import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_OVERVIEW_ACTION,
  ATTACH_OVERVIEW_LOADING,
  ATTACH_OVERVIEW_SUCCESS,
  ATTACH_OVERVIEW_ERROR,
} from "./types";
import Api from "./api";

function* attachOverviewSaga(data) {
  yield put({ type: ATTACH_OVERVIEW_LOADING });
  try {
    let res = yield call(Api.attachOverview, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_OVERVIEW_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_OVERVIEW_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_OVERVIEW_ERROR, payload: error.message });
  }
}

function* watchAttachOverviewAsync() {
  yield takeLatest(ATTACH_OVERVIEW_ACTION, attachOverviewSaga);
}

export default watchAttachOverviewAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_SUMMARY_ACTION,
  ATTACH_SUMMARY_LOADING,
  ATTACH_SUMMARY_SUCCESS,
  ATTACH_SUMMARY_ERROR,
} from "./types";
import Api from "./api";

function* attachSummarySaga(data) {
  yield put({ type: ATTACH_SUMMARY_LOADING });
  try {
    let res = yield call(Api.attachSummary, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_SUMMARY_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_SUMMARY_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_SUMMARY_ERROR, payload: error.message });
  }
}

function* watchAttachSummaryAsync() {
  yield takeLatest(ATTACH_SUMMARY_ACTION, attachSummarySaga);
}

export default watchAttachSummaryAsync;

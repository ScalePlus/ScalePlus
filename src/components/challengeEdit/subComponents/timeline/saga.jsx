import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_TIMELINE_ACTION,
  ATTACH_TIMELINE_LOADING,
  ATTACH_TIMELINE_SUCCESS,
  ATTACH_TIMELINE_ERROR,
} from "./types";
import Api from "./api";

function* attachTimelineSaga(data) {
  yield put({ type: ATTACH_TIMELINE_LOADING });
  try {
    let res = yield call(Api.attachTimeline, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_TIMELINE_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_TIMELINE_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_TIMELINE_ERROR, payload: error.message });
  }
}

function* watchAttachTimelineAsync() {
  yield takeLatest(ATTACH_TIMELINE_ACTION, attachTimelineSaga);
}

export default watchAttachTimelineAsync;

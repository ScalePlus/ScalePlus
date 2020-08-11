import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_TIMELINE_ACTION,
  ATTACH_TIMELINE_LOADING,
  ATTACH_TIMELINE_SUCCESS,
  ATTACH_TIMELINE_ERROR,
  TIMELINE_STATES_ACTION,
  TIMELINE_STATES_LOADING,
  TIMELINE_STATES_SUCCESS,
  TIMELINE_STATES_ERROR,
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
      try {
        let res = yield call(Api.getTimelineState);
        if (res.status) {
          yield put({ type: TIMELINE_STATES_ERROR, payload: res.message });
        } else {
          yield put({ type: TIMELINE_STATES_SUCCESS, payload: res });
        }
      } catch (error) {
        yield put({ type: TIMELINE_STATES_ERROR, payload: error.message });
      }
    }
  } catch (error) {
    yield put({ type: ATTACH_TIMELINE_ERROR, payload: error.message });
  }
}

function* getTimelineStateSaga() {
  yield put({ type: TIMELINE_STATES_LOADING });
  try {
    let res = yield call(Api.getTimelineState);
    if (res.status) {
      yield put({ type: TIMELINE_STATES_ERROR, payload: res.message });
    } else {
      yield put({ type: TIMELINE_STATES_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: TIMELINE_STATES_ERROR, payload: error.message });
  }
}

function* watchAttachTimelineAsync() {
  yield takeLatest(ATTACH_TIMELINE_ACTION, attachTimelineSaga);
  yield takeLatest(TIMELINE_STATES_ACTION, getTimelineStateSaga);
}

export default watchAttachTimelineAsync;

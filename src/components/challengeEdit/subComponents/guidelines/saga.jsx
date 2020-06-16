import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_GUIDELINE_ACTION,
  ATTACH_GUIDELINE_LOADING,
  ATTACH_GUIDELINE_SUCCESS,
  ATTACH_GUIDELINE_ERROR,
} from "./types";
import Api from "./api";

function* attachGuidelineSaga(data) {
  yield put({ type: ATTACH_GUIDELINE_LOADING });
  try {
    let res = yield call(Api.attachGuideline, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_GUIDELINE_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_GUIDELINE_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_GUIDELINE_ERROR, payload: error.message });
  }
}

function* watchAttachGuidelineAsync() {
  yield takeLatest(ATTACH_GUIDELINE_ACTION, attachGuidelineSaga);
}

export default watchAttachGuidelineAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_FAQ_ACTION,
  ATTACH_FAQ_LOADING,
  ATTACH_FAQ_SUCCESS,
  ATTACH_FAQ_ERROR,
} from "./types";
import Api from "./api";

function* attachFAQSaga(data) {
  yield put({ type: ATTACH_FAQ_LOADING });
  try {
    let res = yield call(Api.attachFAQs, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_FAQ_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_FAQ_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_FAQ_ERROR, payload: error.message });
  }
}

function* watchAttachFAQAsync() {
  yield takeLatest(ATTACH_FAQ_ACTION, attachFAQSaga);
}

export default watchAttachFAQAsync;

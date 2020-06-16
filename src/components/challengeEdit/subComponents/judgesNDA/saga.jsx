import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_JUDGES_NDA_ACTION,
  ATTACH_JUDGES_NDA_LOADING,
  ATTACH_JUDGES_NDA_SUCCESS,
  ATTACH_JUDGES_NDA_ERROR,
} from "./types";
import Api from "./api";

function* attachJudgesNDASaga(data) {
  yield put({ type: ATTACH_JUDGES_NDA_LOADING });
  try {
    let res = yield call(Api.attachJudgesNDA, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_JUDGES_NDA_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_JUDGES_NDA_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_JUDGES_NDA_ERROR, payload: error.message });
  }
}

function* watchAttachJudgesNDAAsync() {
  yield takeLatest(ATTACH_JUDGES_NDA_ACTION, attachJudgesNDASaga);
}

export default watchAttachJudgesNDAAsync;

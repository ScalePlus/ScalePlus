import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_JUDGES_ACTION,
  ATTACH_JUDGES_LOADING,
  ATTACH_JUDGES_SUCCESS,
  ATTACH_JUDGES_ERROR,
} from "./types";
import Api from "./api";

function* attachJudgesSaga(data) {
  yield put({ type: ATTACH_JUDGES_LOADING });
  try {
    let res = yield call(Api.attachJudges, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_JUDGES_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_JUDGES_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_JUDGES_ERROR, payload: error.message });
  }
}

function* watchAttachJudgesAsync() {
  yield takeLatest(ATTACH_JUDGES_ACTION, attachJudgesSaga);
}

export default watchAttachJudgesAsync;

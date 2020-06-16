import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_SUBMISSION_FORM_ACTION,
  ATTACH_SUBMISSION_FORM_LOADING,
  ATTACH_SUBMISSION_FORM_SUCCESS,
  ATTACH_SUBMISSION_FORM_ERROR,
} from "./types";
import Api from "./api";

function* attachSubmissionformSaga(data) {
  yield put({ type: ATTACH_SUBMISSION_FORM_LOADING });
  try {
    let res = yield call(Api.attachSubmissionform, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_SUBMISSION_FORM_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_SUBMISSION_FORM_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_SUBMISSION_FORM_ERROR, payload: error.message });
  }
}

function* watchAttachSubmissionformAsync() {
  yield takeLatest(ATTACH_SUBMISSION_FORM_ACTION, attachSubmissionformSaga);
}

export default watchAttachSubmissionformAsync;

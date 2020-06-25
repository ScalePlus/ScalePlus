import { put, takeLatest, call } from "redux-saga/effects";
import {
  FILL_SUBMISSION_FORM_ACTION,
  FILL_SUBMISSION_FORM_LOADING,
  FILL_SUBMISSION_FORM_SUCCESS,
  FILL_SUBMISSION_FORM_ERROR,
  SUBMISSION_FORM_LIST_ACTION,
  SUBMISSION_FORM_LIST_LOADING,
  SUBMISSION_FORM_LIST_SUCCESS,
  SUBMISSION_FORM_LIST_ERROR,
  DISQUALIFY_SUBMISSION_FORM_ACTION,
  DISQUALIFY_SUBMISSION_FORM_LOADING,
  DISQUALIFY_SUBMISSION_FORM_SUCCESS,
  DISQUALIFY_SUBMISSION_FORM_ERROR,
  JUDGE_SUBMISSION_FORM_ACTION,
  JUDGE_SUBMISSION_FORM_LOADING,
  JUDGE_SUBMISSION_FORM_SUCCESS,
  JUDGE_SUBMISSION_FORM_ERROR,
} from "./types";
import Api from "./api";

function* fillSubmissionformSaga(data) {
  yield put({ type: FILL_SUBMISSION_FORM_LOADING });
  try {
    let res = yield call(Api.fillSubmissionform, data.payload, data.id);
    if (res.status) {
      yield put({ type: FILL_SUBMISSION_FORM_ERROR, payload: res.message });
    } else {
      yield put({ type: FILL_SUBMISSION_FORM_SUCCESS, payload: res.message });
    }
  } catch (error) {
    yield put({ type: FILL_SUBMISSION_FORM_ERROR, payload: error.message });
  }
}

function* getSubmissionsListSaga(data) {
  yield put({ type: SUBMISSION_FORM_LIST_LOADING });
  try {
    let res = yield call(Api.getSubmissionsList, data.id, data.searchCriteria);
    if (res.status) {
      yield put({ type: SUBMISSION_FORM_LIST_ERROR, payload: res.message });
    } else {
      yield put({ type: SUBMISSION_FORM_LIST_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: SUBMISSION_FORM_LIST_ERROR, payload: error.message });
  }
}

function* disqualifySubmissionSaga(data) {
  yield put({ type: DISQUALIFY_SUBMISSION_FORM_LOADING });
  try {
    let res = yield call(Api.disqualifySubmission, data.id, data.submissionId);
    if (res.status) {
      yield put({
        type: DISQUALIFY_SUBMISSION_FORM_ERROR,
        payload: res.message,
      });
    } else {
      yield put({
        type: DISQUALIFY_SUBMISSION_FORM_SUCCESS,
        payload: res.message,
      });
    }
  } catch (error) {
    yield put({
      type: DISQUALIFY_SUBMISSION_FORM_ERROR,
      payload: error.message,
    });
  }
}

function* judgeSubmissionformSaga(data) {
  yield put({ type: JUDGE_SUBMISSION_FORM_LOADING });
  try {
    let res = yield call(
      Api.judgeSubmissionform,
      data.id,
      data.submissionId,
      data.payload,
      data.isEvaluation
    );
    if (res.status) {
      yield put({
        type: JUDGE_SUBMISSION_FORM_ERROR,
        payload: res.message,
      });
    } else {
      yield put({
        type: JUDGE_SUBMISSION_FORM_SUCCESS,
        payload: res.message,
      });
    }
  } catch (error) {
    yield put({
      type: JUDGE_SUBMISSION_FORM_ERROR,
      payload: error.message,
    });
  }
}

function* watchSubmissionListAsync() {
  yield takeLatest(FILL_SUBMISSION_FORM_ACTION, fillSubmissionformSaga);
  yield takeLatest(SUBMISSION_FORM_LIST_ACTION, getSubmissionsListSaga);
  yield takeLatest(DISQUALIFY_SUBMISSION_FORM_ACTION, disqualifySubmissionSaga);
  yield takeLatest(JUDGE_SUBMISSION_FORM_ACTION, judgeSubmissionformSaga);
}

export default watchSubmissionListAsync;

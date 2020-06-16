import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_JUDGING_CRITERIA_ACTION,
  ATTACH_JUDGING_CRITERIA_LOADING,
  ATTACH_JUDGING_CRITERIA_SUCCESS,
  ATTACH_JUDGING_CRITERIA_ERROR,
  GET_RATING_TYPES_ACTION,
  GET_RATING_TYPES_LOADING,
  GET_RATING_TYPES_SUCCESS,
  GET_RATING_TYPES_ERROR,
} from "./types";
import Api from "./api";

function* attachJudgingCriteriaSaga(data) {
  yield put({ type: ATTACH_JUDGING_CRITERIA_LOADING });
  try {
    let res = yield call(Api.attachJudgingCriteria, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_JUDGING_CRITERIA_ERROR, payload: res.message });
    } else {
      yield put({
        type: ATTACH_JUDGING_CRITERIA_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: ATTACH_JUDGING_CRITERIA_ERROR, payload: error.message });
  }
}

function* getRatingTypesSaga() {
  yield put({ type: GET_RATING_TYPES_LOADING });
  try {
    let res = yield call(Api.getRatingTypes);
    if (res.status) {
      yield put({ type: GET_RATING_TYPES_ERROR, payload: res.message });
    } else {
      yield put({
        type: GET_RATING_TYPES_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: GET_RATING_TYPES_ERROR, payload: error.message });
  }
}

function* watchAttachJudgingCriteriaAsync() {
  yield takeLatest(ATTACH_JUDGING_CRITERIA_ACTION, attachJudgingCriteriaSaga);
  yield takeLatest(GET_RATING_TYPES_ACTION, getRatingTypesSaga);
}

export default watchAttachJudgingCriteriaAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_JUDGING_ACTIVITY_ACTION,
  ATTACH_JUDGING_ACTIVITY_LOADING,
  ATTACH_JUDGING_ACTIVITY_SUCCESS,
  ATTACH_JUDGING_ACTIVITY_ERROR,
} from "./types";
import Api from "./api";

function* attachJudgingActivitiesSaga(data) {
  yield put({ type: ATTACH_JUDGING_ACTIVITY_LOADING });
  try {
    let res = yield call(Api.attachJudgingActivities, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_JUDGING_ACTIVITY_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_JUDGING_ACTIVITY_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_JUDGING_ACTIVITY_ERROR, payload: error.message });
  }
}

function* watchAttachJudgingActivitiesAsync() {
  yield takeLatest(ATTACH_JUDGING_ACTIVITY_ACTION, attachJudgingActivitiesSaga);
}

export default watchAttachJudgingActivitiesAsync;

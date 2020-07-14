import { put, takeLatest, call } from "redux-saga/effects";
import {
  INVITE_PARTICIPANTS_ACTION,
  INVITE_PARTICIPANTS_LOADING,
  INVITE_PARTICIPANTS_SUCCESS,
  INVITE_PARTICIPANTS_ERROR,
} from "./types";
import Api from "./api";

function* inviteParticipantsSaga(data) {
  yield put({ type: INVITE_PARTICIPANTS_LOADING });
  try {
    let res = yield call(Api.inviteParticipants, data.payload, data.id);
    if (res.status) {
      yield put({ type: INVITE_PARTICIPANTS_ERROR, payload: res.message });
    } else {
      yield put({ type: INVITE_PARTICIPANTS_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: INVITE_PARTICIPANTS_ERROR, payload: error.message });
  }
}

function* watchAttachJudgesAsync() {
  yield takeLatest(INVITE_PARTICIPANTS_ACTION, inviteParticipantsSaga);
}

export default watchAttachJudgesAsync;

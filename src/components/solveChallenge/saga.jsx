import { put, takeLatest, call } from "redux-saga/effects";
import {
  SOLVE_CHALLENGE_ACTION,
  SOLVE_CHALLENGE_LOADING,
  SOLVE_CHALLENGE_SUCCESS,
  SOLVE_CHALLENGE_ERROR,
  ACCEPT_PARTICIPANT_INVITATION_ACTION,
  ACCEPT_PARTICIPANT_INVITATION_LOADING,
  ACCEPT_PARTICIPANT_INVITATION_SUCCESS,
  ACCEPT_PARTICIPANT_INVITATION_ERROR,
} from "./types";
import history from "../../history";
import Api from "./api";

function* solveChallengeSaga(data) {
  yield put({ type: SOLVE_CHALLENGE_LOADING });
  try {
    let res = yield call(Api.solveChallenge, data.id, data.payload);
    if (res.status) {
      yield put({ type: SOLVE_CHALLENGE_ERROR, payload: res.message });
    } else {
      yield put({ type: SOLVE_CHALLENGE_SUCCESS, payload: res.message });
      history.push(`/challenge/${data.id}/preview/Submissions`);
    }
  } catch (error) {
    yield put({ type: SOLVE_CHALLENGE_ERROR, payload: error.message });
  }
}

function* acceptParticipantInvitationSaga(data) {
  yield put({ type: ACCEPT_PARTICIPANT_INVITATION_LOADING });
  try {
    let res = yield call(Api.acceptParticipantInvitation, data.payload);
    if (res.status) {
      yield put({
        type: ACCEPT_PARTICIPANT_INVITATION_ERROR,
        payload: res.message,
      });
    } else {
      yield put({
        type: ACCEPT_PARTICIPANT_INVITATION_SUCCESS,
        payload: res.message,
      });
      history.push(`/dashboard`);
    }
  } catch (error) {
    yield put({
      type: ACCEPT_PARTICIPANT_INVITATION_ERROR,
      payload: error.message,
    });
  }
}

function* watchSolveChallengeAsync() {
  yield takeLatest(SOLVE_CHALLENGE_ACTION, solveChallengeSaga);
  yield takeLatest(
    ACCEPT_PARTICIPANT_INVITATION_ACTION,
    acceptParticipantInvitationSaga
  );
}

export default watchSolveChallengeAsync;

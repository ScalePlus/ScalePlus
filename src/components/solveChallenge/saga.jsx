import { put, takeLatest, call } from "redux-saga/effects";
import {
  SOLVE_CHALLENGE_ACTION,
  SOLVE_CHALLENGE_LOADING,
  SOLVE_CHALLENGE_SUCCESS,
  SOLVE_CHALLENGE_ERROR,
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

function* watchSolveChallengeAsync() {
  yield takeLatest(SOLVE_CHALLENGE_ACTION, solveChallengeSaga);
}

export default watchSolveChallengeAsync;

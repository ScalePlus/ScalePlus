import { put, takeLatest, call } from "redux-saga/effects";
import {
  GET_MY_CHALLENGES_ACTION,
  GET_MY_CHALLENGES_LOADING,
  GET_MY_CHALLENGES_SUCCESS,
  GET_MY_CHALLENGES_ERROR,
} from "./types";
import Api from "./api";

function* getMyChallengeSaga() {
  yield put({ type: GET_MY_CHALLENGES_LOADING });
  try {
    let res = yield call(Api.getMyChallenge);
    if (res.status) {
      yield put({ type: GET_MY_CHALLENGES_ERROR, payload: res.message });
    } else {
      yield put({ type: GET_MY_CHALLENGES_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: GET_MY_CHALLENGES_ERROR, payload: error.message });
  }
}

function* watchGetMyChallengeAsync() {
  yield takeLatest(GET_MY_CHALLENGES_ACTION, getMyChallengeSaga);
}

export default watchGetMyChallengeAsync;

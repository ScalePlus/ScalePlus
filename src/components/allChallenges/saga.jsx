import { put, takeLatest, call } from "redux-saga/effects";
import {
  GET_ALL_CHALLENGES_ACTION,
  GET_ALL_CHALLENGES_LOADING,
  GET_ALL_CHALLENGES_SUCCESS,
  GET_ALL_CHALLENGES_ERROR,
} from "./types";
import Api from "./api";

function* getAllChallengeSaga(data) {
  yield put({ type: GET_ALL_CHALLENGES_LOADING });
  try {
    let res = yield call(Api.getAllChallenge, data.page, data.filters);
    if (res.status) {
      yield put({ type: GET_ALL_CHALLENGES_ERROR, payload: res.message });
    } else {
      yield put({
        type: GET_ALL_CHALLENGES_SUCCESS,
        payload: res,
        page: data.page,
      });
    }
  } catch (error) {
    yield put({ type: GET_ALL_CHALLENGES_ERROR, payload: error.message });
  }
}

function* watchGetAllChallengeAsync() {
  yield takeLatest(GET_ALL_CHALLENGES_ACTION, getAllChallengeSaga);
}

export default watchGetAllChallengeAsync;

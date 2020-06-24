import { put, takeLatest, call } from "redux-saga/effects";
import {
  GET_ALL_CHALLENGES_ACTION,
  GET_ALL_CHALLENGES_LOADING,
  GET_ALL_CHALLENGES_SUCCESS,
  GET_ALL_CHALLENGES_ERROR,
  DO_SUBSCRIPTION_ACTION,
  DO_SUBSCRIPTION_LOADING,
  DO_SUBSCRIPTION_SUCCESS,
  DO_SUBSCRIPTION_ERROR,
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

function* doSubscriptionSaga(data) {
  yield put({ type: DO_SUBSCRIPTION_LOADING });
  try {
    let res = yield call(Api.doSubscription, data.payload);
    if (res.status) {
      yield put({ type: DO_SUBSCRIPTION_ERROR, payload: res.message });
    } else {
      yield put({
        type: DO_SUBSCRIPTION_SUCCESS,
        payload: res,
        page: data.page,
      });
    }
  } catch (error) {
    yield put({ type: DO_SUBSCRIPTION_ERROR, payload: error.message });
  }
}

function* watchGetAllChallengeAsync() {
  yield takeLatest(GET_ALL_CHALLENGES_ACTION, getAllChallengeSaga);
  yield takeLatest(DO_SUBSCRIPTION_ACTION, doSubscriptionSaga);
}

export default watchGetAllChallengeAsync;

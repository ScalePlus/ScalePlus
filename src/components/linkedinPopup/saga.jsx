import { put, takeLatest, call } from "redux-saga/effects";
import {
  LINKEDIN_DATA_ACTION,
  LINKEDIN_DATA_LOADING,
  LINKEDIN_DATA_SUCCESS,
  LINKEDIN_DATA_ERROR,
} from "./types";
import Api from "./api";

function* getLinkedinDataSaga(data) {
  yield put({ type: LINKEDIN_DATA_LOADING });
  try {
    let res = yield call(Api.getLinkedinData, data.payload);
    if (res.status) {
      yield put({ type: LINKEDIN_DATA_ERROR, payload: res.message });
    } else {
      yield put({ type: LINKEDIN_DATA_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: LINKEDIN_DATA_ERROR, payload: error.message });
  }
}

function* watchLinkedinDataAsync() {
  yield takeLatest(LINKEDIN_DATA_ACTION, getLinkedinDataSaga);
}

export default watchLinkedinDataAsync;

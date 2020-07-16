import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_STATUS_ACTION,
  UPDATE_STATUS_LOADING,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_ERROR,
} from "./types";
import Api from "./api";

function* updateStatusSaga(data) {
  yield put({ type: UPDATE_STATUS_LOADING });
  try {
    let res = yield call(Api.updateStatus, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_STATUS_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_STATUS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: UPDATE_STATUS_ERROR, payload: error.message });
  }
}

function* watchUpdateProfileViewAsync() {
  yield takeLatest(UPDATE_STATUS_ACTION, updateStatusSaga);
}

export default watchUpdateProfileViewAsync;

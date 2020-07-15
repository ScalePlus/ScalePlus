import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_PROFILE_ACTION,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from "./types";
import Api from "./api";

function* updateProfileSaga(data) {
  yield put({ type: UPDATE_PROFILE_LOADING });
  try {
    let res = yield call(Api.updateProfile, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_PROFILE_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_PROFILE_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: UPDATE_PROFILE_ERROR, payload: error.message });
  }
}

function* watchUpdateProfileAsync() {
  yield takeLatest(UPDATE_PROFILE_ACTION, updateProfileSaga);
}

export default watchUpdateProfileAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_DESC_ACTION,
  UPDATE_DESC_LOADING,
  UPDATE_DESC_SUCCESS,
  UPDATE_DESC_ERROR,
} from "./types";
import Api from "./api";

function* updateDescriptionSaga(data) {
  yield put({ type: UPDATE_DESC_LOADING });
  try {
    let res = yield call(Api.updateDescription, data.payload, data.id);
    if (res.status) {
      yield put({ type: UPDATE_DESC_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_DESC_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: UPDATE_DESC_ERROR, payload: error.message });
  }
}

function* watchUpdateDescriptionAsync() {
  yield takeLatest(UPDATE_DESC_ACTION, updateDescriptionSaga);
}

export default watchUpdateDescriptionAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_ESSENTIAL_DETAILS_ACTION,
  UPDATE_ESSENTIAL_DETAILS_LOADING,
  UPDATE_ESSENTIAL_DETAILS_SUCCESS,
  UPDATE_ESSENTIAL_DETAILS_ERROR,
  PRESERVE_ESSENTIAL_DATA_ACTION,
  PRESERVE_ESSENTIAL_DATA_SUCCESS,
} from "./types";
import Api from "./api";

function* updateEssentialDetailsSaga(data) {
  yield put({ type: UPDATE_ESSENTIAL_DETAILS_LOADING });
  try {
    let res = yield call(Api.updateEssentialDetails, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_ESSENTIAL_DETAILS_ERROR, payload: res.message });
    } else {
      yield put({
        type: UPDATE_ESSENTIAL_DETAILS_SUCCESS,
        payload: res.result,
      });
      alert("All information saved successfully");
    }
  } catch (error) {
    yield put({ type: UPDATE_ESSENTIAL_DETAILS_ERROR, payload: error.message });
  }
}

function* preserveDataSaga(data) {
  yield put({
    type: PRESERVE_ESSENTIAL_DATA_SUCCESS,
    payload: data.payload,
  });
}

function* watchUpdateEssentialDetailsAsync() {
  yield takeLatest(UPDATE_ESSENTIAL_DETAILS_ACTION, updateEssentialDetailsSaga);
  yield takeLatest(PRESERVE_ESSENTIAL_DATA_ACTION, preserveDataSaga);
}

export default watchUpdateEssentialDetailsAsync;

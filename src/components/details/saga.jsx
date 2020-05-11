import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_DETAILS_ACTION,
  UPDATE_DETAILS_LOADING,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";

function* updateDetailsSaga(data) {
  yield put({ type: UPDATE_DETAILS_LOADING });
  try {
    let res = yield call(Api.updateDetails, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_DETAILS_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_DETAILS_SUCCESS, payload: res.result });
      history.push("/business/tags");
    }
  } catch (error) {
    yield put({ type: UPDATE_DETAILS_ERROR, payload: error.message });
  }
}

function* watchUpdateDetailsAsync() {
  yield takeLatest(UPDATE_DETAILS_ACTION, updateDetailsSaga);
}

export default watchUpdateDetailsAsync;

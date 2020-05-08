import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_ESSENTIAL_DETAILS_ACTION,
  UPDATE_ESSENTIAL_DETAILS_LOADING,
  UPDATE_ESSENTIAL_DETAILS_SUCCESS,
  UPDATE_ESSENTIAL_DETAILS_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";

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
      history.push(`/`);
    }
  } catch (error) {
    yield put({ type: UPDATE_ESSENTIAL_DETAILS_ERROR, payload: error.message });
  }
}

function* watchUpdateEssentialDetailsAsync() {
  yield takeLatest(UPDATE_ESSENTIAL_DETAILS_ACTION, updateEssentialDetailsSaga);
}

export default watchUpdateEssentialDetailsAsync;

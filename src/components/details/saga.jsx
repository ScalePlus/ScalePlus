import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_DETAILS_ACTION,
  UPDATE_DETAILS_LOADING,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_ERROR,
  UPLOAD_LOGO_ACTION,
  UPLOAD_LOGO_LOADING,
  UPLOAD_LOGO_SUCCESS,
  UPLOAD_LOGO_ERROR,
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

function* uploadLogoSaga(data) {
  yield put({ type: UPLOAD_LOGO_LOADING });
  try {
    let res = yield call(Api.uploadLogo, data.payload);
    if (res.status) {
      yield put({ type: UPLOAD_LOGO_ERROR, payload: res.message });
    } else {
      yield put({ type: UPLOAD_LOGO_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: UPLOAD_LOGO_ERROR, payload: error.message });
  }
}

function* watchUpdateDetailsAsync() {
  yield takeLatest(UPDATE_DETAILS_ACTION, updateDetailsSaga);
  yield takeLatest(UPLOAD_LOGO_ACTION, uploadLogoSaga);
}

export default watchUpdateDetailsAsync;

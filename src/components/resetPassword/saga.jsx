import { put, takeLatest, call } from "redux-saga/effects";
import {
  RESET_PASSWORD_ACTION,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_PASSWORD_ACTION,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CLEAR_ALL,
  CLEAR_ALL_SUCCESS,
} from "./types";
import Api from "./api";
import history from "../../history";

function* resetPasswordSaga(data) {
  yield put({ type: RESET_PASSWORD_LOADING });
  try {
    let res = yield call(Api.forgotPassword, data.payload);
    if (res.status) {
      yield put({ type: RESET_PASSWORD_ERROR, payload: res.message });
    } else {
      yield put({ type: RESET_PASSWORD_SUCCESS, payload: res });
      if (window.location.pathname !== "/reset/password/confirmation") {
        history.push(`/reset/password/confirmation`);
      }
    }
  } catch (error) {
    yield put({ type: RESET_PASSWORD_ERROR, payload: error.message });
  }
}

function* changePasswordSaga(data) {
  yield put({ type: CHANGE_PASSWORD_LOADING });
  try {
    let res = yield call(Api.changePassword, data.payload);
    if (res.status) {
      yield put({ type: CHANGE_PASSWORD_ERROR, payload: res.message });
    } else {
      yield put({ type: CHANGE_PASSWORD_SUCCESS, payload: res.message });
      history.push(`/login`);
    }
  } catch (error) {
    yield put({ type: CHANGE_PASSWORD_ERROR, payload: error.message });
  }
}

function* clearAllSaga() {
  yield put({ type: CLEAR_ALL_SUCCESS });
}

function* watchResetPasswordAsync() {
  yield takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga);
  yield takeLatest(CHANGE_PASSWORD_ACTION, changePasswordSaga);
  yield takeLatest(CLEAR_ALL, clearAllSaga);
}

export default watchResetPasswordAsync;

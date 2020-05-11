import { put, takeLatest, call } from "redux-saga/effects";
import {
  EMAIL_VERIFICATION_ACTION,
  EMAIL_VERIFICATION_LOADING,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_ERROR,
  RESEND_EMAIL_VERIFICATION_ACTION,
  RESEND_EMAIL_VERIFICATION_LOADING,
  RESEND_EMAIL_VERIFICATION_SUCCESS,
  RESEND_EMAIL_VERIFICATION_ERROR,
} from "./types";
import Api from "./api";

function* emailVerificationSaga(data) {
  yield put({ type: EMAIL_VERIFICATION_LOADING });
  try {
    let res = yield call(Api.verifyEmail, data.payload);
    if (res.status) {
      yield put({ type: EMAIL_VERIFICATION_ERROR, payload: res.message });
    } else {
      yield put({ type: EMAIL_VERIFICATION_SUCCESS, payload: res.message });
      localStorage.setItem("userRole", res.result.roles[0]);
    }
  } catch (error) {
    yield put({ type: EMAIL_VERIFICATION_ERROR, payload: error.message });
  }
}

function* resendEmailVerificationSaga(data) {
  yield put({ type: RESEND_EMAIL_VERIFICATION_LOADING });
  try {
    let res = yield call(Api.resendVerification, data.payload);
    if (res.status) {
      yield put({
        type: RESEND_EMAIL_VERIFICATION_ERROR,
        payload: res.message,
      });
    } else {
      yield put({
        type: RESEND_EMAIL_VERIFICATION_SUCCESS,
        payload: res.message,
      });
    }
  } catch (error) {
    yield put({
      type: RESEND_EMAIL_VERIFICATION_ERROR,
      payload: error.message,
    });
  }
}

function* watchVerifyEmailAsync() {
  yield takeLatest(EMAIL_VERIFICATION_ACTION, emailVerificationSaga);
  yield takeLatest(
    RESEND_EMAIL_VERIFICATION_ACTION,
    resendEmailVerificationSaga
  );
}

export default watchVerifyEmailAsync;

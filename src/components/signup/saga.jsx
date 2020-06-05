import { put, takeLatest, call } from "redux-saga/effects";
import {
  SIGNUP_ACTION,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";

function* signupSaga(data) {
  yield put({ type: SIGNUP_LOADING });
  try {
    let res = yield call(Api.signup, data.payload);
    if (res.status) {
      yield put({ type: SIGNUP_ERROR, payload: res.message });
    } else {
      yield put({ type: SIGNUP_SUCCESS, payload: res.result });
      localStorage.setItem("userId", res.result.userId);
      if (data.mode === "modal") {
        data.setActiveModal("EmailVerification");
      } else {
        history.push(`/verification/${res.result.userId}`);
      }
    }
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, payload: error.message });
  }
}

function* watchSignupAsync() {
  yield takeLatest(SIGNUP_ACTION, signupSaga);
}

export default watchSignupAsync;

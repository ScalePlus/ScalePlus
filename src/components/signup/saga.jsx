import { put, takeLatest, call } from "redux-saga/effects";
import {
  SIGNUP_ACTION,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GOOGLE_SIGNUP_ACTION,
  GOOGLE_SIGNUP_LOADING,
  GOOGLE_SIGNUP_SUCCESS,
  GOOGLE_SIGNUP_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";
import { Constants } from "../../lib/constant";

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

function* googleRegisterSaga(data) {
  yield put({ type: GOOGLE_SIGNUP_LOADING });
  try {
    let res = yield call(Api.googleRegister, data.payload);
    if (res.status) {
      yield put({ type: GOOGLE_SIGNUP_ERROR, payload: res.message });
    } else {
      yield put({ type: GOOGLE_SIGNUP_SUCCESS, payload: res.result });
      console.log(res);

      if (res.result.token) {
        localStorage.setItem("token", res.result.token);
      }

      if (res.result.userRole) {
        localStorage.setItem("userRole", res.result.userRole);
      }

      if (res.result.profileUpdated) {
        localStorage.setItem("profileUpdated", res.result.profileUpdated);
      }

      if (res.result.userId) {
        localStorage.setItem("userId", res.result.userId);
      }

      if (data.mode === "modal") {
        const is_organisation =
            localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
          is_mentor_judge =
            localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

        if (res.result.profileUpdated) {
          if (is_organisation || is_mentor_judge) {
            data.setUserFlowModal("/dashboard");
          } else {
            data.setUserFlowModal("/solve/challenge");
          }
        } else {
          data.setUserFlowModal("/detail");
        }
      } else {
        if (res.result.profileUpdated) {
          history.push("/dashboard");
        } else {
          history.push("/detail");
        }
      }
    }
  } catch (error) {
    yield put({ type: GOOGLE_SIGNUP_ERROR, payload: error.message });
  }
}

function* watchSignupAsync() {
  yield takeLatest(SIGNUP_ACTION, signupSaga);
  yield takeLatest(GOOGLE_SIGNUP_ACTION, googleRegisterSaga);
}

export default watchSignupAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  SIGNIN_ACTION,
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  LOGGEDIN_USER_ACTION,
  LOGGEDIN_USER_LOADING,
  LOGGEDIN_USER_SUCCESS,
  LOGGEDIN_USER_ERROR,
  GET_USER_ACTION,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";

function* signinSaga(data) {
  yield put({ type: SIGNIN_LOADING });
  try {
    let res = yield call(Api.signin, data.payload);
    if (res.status) {
      yield put({ type: SIGNIN_ERROR, payload: res.message });
    } else {
      yield put({ type: SIGNIN_SUCCESS, payload: res.result });
      if (res.result.token) {
        localStorage.setItem("token", res.result.token);
        localStorage.setItem("userRole", res.result.userRole);
        localStorage.setItem("profileUpdated", res.result.profileUpdated);
        if (res.result.profileUpdated) {
          history.push("/challenge");
        } else {
          history.push("/detail");
        }
      } else {
        localStorage.setItem("userRole", res.result.userRole);
        history.push(`/verification/${res.result.userId}`);
      }
    }
  } catch (error) {
    yield put({ type: SIGNIN_ERROR, payload: error.message });
  }
}

function* loggedInUserSaga() {
  yield put({ type: LOGGEDIN_USER_LOADING });
  try {
    let res = yield call(Api.getLoggedInUser);
    if (res.status) {
      yield put({ type: LOGGEDIN_USER_ERROR, payload: res.message });
    } else {
      yield put({ type: LOGGEDIN_USER_SUCCESS, payload: res.result });
      localStorage.setItem("userRole", res.result.roles[0]);
    }
  } catch (error) {
    yield put({ type: LOGGEDIN_USER_ERROR, payload: error.message });
  }
}

function* getUserSaga(data) {
  yield put({ type: GET_USER_LOADING });
  try {
    let res = yield call(Api.getUser, data.payload);
    if (res.status) {
      yield put({ type: GET_USER_ERROR, payload: res.message });
    } else {
      yield put({ type: GET_USER_SUCCESS, payload: res.result });
      localStorage.setItem("userRole", res.result.roles[0]);
    }
  } catch (error) {
    yield put({ type: GET_USER_ERROR, payload: error.message });
  }
}

function* watchSigninAsync() {
  yield takeLatest(SIGNIN_ACTION, signinSaga);
  yield takeLatest(LOGGEDIN_USER_ACTION, loggedInUserSaga);
  yield takeLatest(GET_USER_ACTION, getUserSaga);
}

export default watchSigninAsync;

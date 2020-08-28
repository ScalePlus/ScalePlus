import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_PROFILE_ACTION,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_EMAIL_ACTION,
  UPDATE_EMAIL_LOADING,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR,
  UPDATE_PASSWORD_ACTION,
  UPDATE_PASSWORD_LOADING,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
} from "./types";
import { LOGOUT_SUCCESS } from "../signin/types";
import Api from "./api";
import history from "../../history";

function* updateProfileSaga(data) {
  yield put({ type: UPDATE_PROFILE_LOADING });
  try {
    let res = yield call(Api.updateProfile, data.payload, data.userId);
    if (res.status) {
      yield put({ type: UPDATE_PROFILE_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_PROFILE_SUCCESS, payload: res.message });
    }
  } catch (error) {
    yield put({ type: UPDATE_PROFILE_ERROR, payload: error.message });
  }
}

function* changeEmailSaga(data) {
  yield put({ type: UPDATE_EMAIL_LOADING });
  try {
    let res = yield call(Api.changeEmail, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_EMAIL_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_EMAIL_SUCCESS, payload: res.message });
      if (
        res &&
        res.result &&
        res.result._id &&
        res.result._id.toString() === localStorage.getItem("userId").toString()
      ) {
        yield put({ type: LOGOUT_SUCCESS });
        localStorage.clear();
        history.push("/");
      }
    }
  } catch (error) {
    yield put({ type: UPDATE_EMAIL_ERROR, payload: error.message });
  }
}

function* resetPasswordSaga(data) {
  yield put({ type: UPDATE_PASSWORD_LOADING });
  try {
    let res = yield call(Api.resetPassword, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_PASSWORD_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_PASSWORD_SUCCESS, payload: res.message });
      if (
        res &&
        res.result &&
        res.result._id &&
        res.result._id.toString() === localStorage.getItem("userId").toString()
      ) {
        yield put({ type: LOGOUT_SUCCESS });
        localStorage.clear();
        history.push("/");
      }
    }
  } catch (error) {
    yield put({ type: UPDATE_PASSWORD_ERROR, payload: error.message });
  }
}

function* watchUpdateProfileAsync() {
  yield takeLatest(UPDATE_PROFILE_ACTION, updateProfileSaga);
  yield takeLatest(UPDATE_EMAIL_ACTION, changeEmailSaga);
  yield takeLatest(UPDATE_PASSWORD_ACTION, resetPasswordSaga);
}

export default watchUpdateProfileAsync;

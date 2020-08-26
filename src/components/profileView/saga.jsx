import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_STATUS_ACTION,
  UPDATE_STATUS_LOADING,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_ERROR,
  CANCEL_INVITATION_ACTION,
  CANCEL_INVITATION_LOADING,
  CANCEL_INVITATION_SUCCESS,
  CANCEL_INVITATION_ERROR,
} from "./types";
import Api from "./api";

function* updateStatusSaga(data) {
  yield put({ type: UPDATE_STATUS_LOADING });
  try {
    let res = yield call(Api.updateStatus, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_STATUS_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_STATUS_SUCCESS, payload: res.message });
    }
  } catch (error) {
    yield put({ type: UPDATE_STATUS_ERROR, payload: error.message });
  }
}

function* cancelInvitationSaga(data) {
  yield put({ type: CANCEL_INVITATION_LOADING });
  try {
    let res = yield call(Api.cancelInvitation, data.payload);
    if (res.status) {
      yield put({ type: CANCEL_INVITATION_ERROR, payload: res.message });
    } else {
      yield put({ type: CANCEL_INVITATION_SUCCESS, payload: res.message });
    }
  } catch (error) {
    yield put({ type: CANCEL_INVITATION_ERROR, payload: error.message });
  }
}

function* watchUpdateProfileViewAsync() {
  yield takeLatest(UPDATE_STATUS_ACTION, updateStatusSaga);
  yield takeLatest(CANCEL_INVITATION_ACTION, cancelInvitationSaga);
}

export default watchUpdateProfileViewAsync;

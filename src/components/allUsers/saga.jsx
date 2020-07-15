import { put, takeLatest, call } from "redux-saga/effects";
import {
  GET_ATTACHED_USERS_ACTION,
  GET_ATTACHED_USERS_LOADING,
  GET_ATTACHED_USERS_SUCCESS,
  GET_ATTACHED_USERS_ERROR,
} from "./types";
import Api from "./api";

function* getAttachedUsersSaga(data) {
  yield put({ type: GET_ATTACHED_USERS_LOADING });
  try {
    let res = yield call(Api.getAttachedUsers, data.filters, data.searchText);
    if (res.status) {
      yield put({ type: GET_ATTACHED_USERS_ERROR, payload: res.message });
    } else {
      yield put({
        type: GET_ATTACHED_USERS_SUCCESS,
        payload: res,
      });
    }
  } catch (error) {
    yield put({ type: GET_ATTACHED_USERS_ERROR, payload: error.message });
  }
}

function* watchGetAttachedUsersAsync() {
  yield takeLatest(GET_ATTACHED_USERS_ACTION, getAttachedUsersSaga);
}

export default watchGetAttachedUsersAsync;

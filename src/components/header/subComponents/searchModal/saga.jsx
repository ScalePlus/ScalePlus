import { put, takeLatest, call } from "redux-saga/effects";
import {
  SEARCH_ALL_ACTION,
  SEARCH_ALL_LOADING,
  SEARCH_ALL_SUCCESS,
  SEARCH_ALL_ERROR,
} from "./types";
import Api from "./api";

function* searchAllSaga(data) {
  yield put({ type: SEARCH_ALL_LOADING });
  try {
    let res = yield call(Api.searchAll, data.searchText);
    if (res.status) {
      yield put({ type: SEARCH_ALL_ERROR, payload: res.message });
    } else {
      yield put({ type: SEARCH_ALL_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: SEARCH_ALL_ERROR, payload: error.message });
  }
}

function* watchSearchAllAsync() {
  yield takeLatest(SEARCH_ALL_ACTION, searchAllSaga);
}

export default watchSearchAllAsync;

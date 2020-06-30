import { put, takeLatest, call } from "redux-saga/effects";
import {
  SHARE_LINK_ACTION,
  SHARE_LINK_LOADING,
  SHARE_LINK_SUCCESS,
  SHARE_LINK_ERROR,
} from "./types";
import Api from "./api";

function* sharelinkSaga(data) {
  yield put({ type: SHARE_LINK_LOADING });
  try {
    let res = yield call(Api.sharelink, data.payload);
    if (res.status) {
      yield put({ type: SHARE_LINK_ERROR, payload: res.message });
    } else {
      yield put({ type: SHARE_LINK_SUCCESS, payload: res.message });
      data.changeMailRes(true);
      data.setEmail("");
    }
  } catch (error) {
    yield put({ type: SHARE_LINK_ERROR, payload: error.message });
  }
}

function* watchSharelinkAsync() {
  yield takeLatest(SHARE_LINK_ACTION, sharelinkSaga);
}

export default watchSharelinkAsync;

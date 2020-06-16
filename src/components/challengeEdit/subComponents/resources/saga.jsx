import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_RESOURCES_ACTION,
  ATTACH_RESOURCES_LOADING,
  ATTACH_RESOURCES_SUCCESS,
  ATTACH_RESOURCES_ERROR,
} from "./types";
import Api from "./api";

function* attachResourcesSaga(data) {
  yield put({ type: ATTACH_RESOURCES_LOADING });
  try {
    let res = yield call(Api.attachResources, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_RESOURCES_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_RESOURCES_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_RESOURCES_ERROR, payload: error.message });
  }
}

function* watchAttachResourceAsync() {
  yield takeLatest(ATTACH_RESOURCES_ACTION, attachResourcesSaga);
}

export default watchAttachResourceAsync;

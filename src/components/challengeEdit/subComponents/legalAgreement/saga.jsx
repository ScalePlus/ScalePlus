import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_LEGAL_AGREEMENT_ACTION,
  ATTACH_LEGAL_AGREEMENT_LOADING,
  ATTACH_LEGAL_AGREEMENT_SUCCESS,
  ATTACH_LEGAL_AGREEMENT_ERROR,
} from "./types";
import Api from "./api";

function* attachLegalAggreementSaga(data) {
  yield put({ type: ATTACH_LEGAL_AGREEMENT_LOADING });
  try {
    let res = yield call(Api.attachLegalAggreement, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_LEGAL_AGREEMENT_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_LEGAL_AGREEMENT_SUCCESS, payload: res });
    }
  } catch (error) {
    yield put({ type: ATTACH_LEGAL_AGREEMENT_ERROR, payload: error.message });
  }
}

function* watchAttachLegalAggreementAsync() {
  yield takeLatest(ATTACH_LEGAL_AGREEMENT_ACTION, attachLegalAggreementSaga);
}

export default watchAttachLegalAggreementAsync;

import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_ESSENTIAL_DETAILS_ACTION,
  UPDATE_ESSENTIAL_DETAILS_LOADING,
  UPDATE_ESSENTIAL_DETAILS_SUCCESS,
  UPDATE_ESSENTIAL_DETAILS_ERROR,
  PRESERVE_ESSENTIAL_DATA_ACTION,
  PRESERVE_ESSENTIAL_DATA_SUCCESS,
  CORE_BUSINESS_OPTIONS_ACTION,
  CORE_BUSINESS_OPTIONS_LOADING,
  CORE_BUSINESS_OPTIONS_SUCCESS,
  CORE_BUSINESS_OPTIONS_ERROR,
  MARKET_STAGE_OPTIONS_ACTION,
  MARKET_STAGE_OPTIONS_LOADING,
  MARKET_STAGE_OPTIONS_SUCCESS,
  MARKET_STAGE_OPTIONS_ERROR,
  EXPERTISE_OPTIONS_ACTION,
  EXPERTISE_OPTIONS_LOADING,
  EXPERTISE_OPTIONS_SUCCESS,
  EXPERTISE_OPTIONS_ERROR,
  FUNDING_OPTIONS_ACTION,
  FUNDING_OPTIONS_LOADING,
  FUNDING_OPTIONS_SUCCESS,
  FUNDING_OPTIONS_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";

function* updateEssentialDetailsSaga(data) {
  yield put({ type: UPDATE_ESSENTIAL_DETAILS_LOADING });
  try {
    let res = yield call(Api.updateEssentialDetails, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_ESSENTIAL_DETAILS_ERROR, payload: res.message });
    } else {
      yield put({
        type: UPDATE_ESSENTIAL_DETAILS_SUCCESS,
        payload: res.result,
      });
      if (res && res.result && res.result._id) {
        localStorage.setItem("profileUpdated", res.result._id);
      }
      history.push("/dashboard");
    }
  } catch (error) {
    yield put({ type: UPDATE_ESSENTIAL_DETAILS_ERROR, payload: error.message });
  }
}

function* preserveDataSaga(data) {
  yield put({
    type: PRESERVE_ESSENTIAL_DATA_SUCCESS,
    payload: data.payload,
  });
}

function* coreBusinessOptionsSaga() {
  yield put({ type: CORE_BUSINESS_OPTIONS_LOADING });
  try {
    let res = yield call(Api.coreBusinessOptions);
    if (res.status) {
      yield put({ type: CORE_BUSINESS_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: CORE_BUSINESS_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: CORE_BUSINESS_OPTIONS_ERROR, payload: error.message });
  }
}

function* marketStagesOptionsSaga() {
  yield put({ type: MARKET_STAGE_OPTIONS_LOADING });
  try {
    let res = yield call(Api.marketStagesOptions);
    if (res.status) {
      yield put({ type: MARKET_STAGE_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: MARKET_STAGE_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: MARKET_STAGE_OPTIONS_ERROR, payload: error.message });
  }
}

function* expertisesOptionsSaga() {
  yield put({ type: EXPERTISE_OPTIONS_LOADING });
  try {
    let res = yield call(Api.expertisesOptions);
    if (res.status) {
      yield put({ type: EXPERTISE_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: EXPERTISE_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: EXPERTISE_OPTIONS_ERROR, payload: error.message });
  }
}

function* fundingsOptionsSaga() {
  yield put({ type: FUNDING_OPTIONS_LOADING });
  try {
    let res = yield call(Api.fundingsOptions);
    if (res.status) {
      yield put({ type: FUNDING_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: FUNDING_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: FUNDING_OPTIONS_ERROR, payload: error.message });
  }
}

function* watchUpdateEssentialDetailsAsync() {
  yield takeLatest(UPDATE_ESSENTIAL_DETAILS_ACTION, updateEssentialDetailsSaga);
  yield takeLatest(PRESERVE_ESSENTIAL_DATA_ACTION, preserveDataSaga);
  yield takeLatest(CORE_BUSINESS_OPTIONS_ACTION, coreBusinessOptionsSaga);
  yield takeLatest(MARKET_STAGE_OPTIONS_ACTION, marketStagesOptionsSaga);
  yield takeLatest(EXPERTISE_OPTIONS_ACTION, expertisesOptionsSaga);
  yield takeLatest(FUNDING_OPTIONS_ACTION, fundingsOptionsSaga);
}

export default watchUpdateEssentialDetailsAsync;

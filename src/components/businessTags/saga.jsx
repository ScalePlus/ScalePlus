import { put, takeLatest, call } from "redux-saga/effects";
import {
  UPDATE_BUSINESS_TAGS_ACTION,
  UPDATE_BUSINESS_TAGS_LOADING,
  UPDATE_BUSINESS_TAGS_SUCCESS,
  UPDATE_BUSINESS_TAGS_ERROR,
  INDUSTRIES_OPTIONS_ACTION,
  INDUSTRIES_OPTIONS_LOADING,
  INDUSTRIES_OPTIONS_SUCCESS,
  INDUSTRIES_OPTIONS_ERROR,
  SERVICES_OPTIONS_ACTION,
  SERVICES_OPTIONS_LOADING,
  SERVICES_OPTIONS_SUCCESS,
  SERVICES_OPTIONS_ERROR,
  TECHNOLOGIES_OPTIONS_ACTION,
  TECHNOLOGIES_OPTIONS_LOADING,
  TECHNOLOGIES_OPTIONS_SUCCESS,
  TECHNOLOGIES_OPTIONS_ERROR,
  BUSINESS_MODELS_OPTIONS_ACTION,
  BUSINESS_MODELS_OPTIONS_LOADING,
  BUSINESS_MODELS_OPTIONS_SUCCESS,
  BUSINESS_MODELS_OPTIONS_ERROR,
  TARGET_MARKET_OPTIONS_ACTION,
  TARGET_MARKET_OPTIONS_LOADING,
  TARGET_MARKET_OPTIONS_SUCCESS,
  TARGET_MARKET_OPTIONS_ERROR,
  GEOGRAPHICAL_MARKET_OPTIONS_ACTION,
  GEOGRAPHICAL_MARKET_OPTIONS_LOADING,
  GEOGRAPHICAL_MARKET_OPTIONS_SUCCESS,
  GEOGRAPHICAL_MARKET_OPTIONS_ERROR,
} from "./types";
import Api from "./api";
import history from "../../history";

function* updateBusinessTagsSaga(data) {
  yield put({ type: UPDATE_BUSINESS_TAGS_LOADING });
  try {
    let res = yield call(Api.updateBusinessTags, data.payload);
    if (res.status) {
      yield put({ type: UPDATE_BUSINESS_TAGS_ERROR, payload: res.message });
    } else {
      yield put({ type: UPDATE_BUSINESS_TAGS_SUCCESS, payload: res.result });
      history.push("/essential/detail");
    }
  } catch (error) {
    yield put({ type: UPDATE_BUSINESS_TAGS_ERROR, payload: error.message });
  }
}

function* industriesOptionsSaga() {
  yield put({ type: INDUSTRIES_OPTIONS_LOADING });
  try {
    let res = yield call(Api.industriesOptions);
    if (res.status) {
      yield put({ type: INDUSTRIES_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: INDUSTRIES_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: INDUSTRIES_OPTIONS_ERROR, payload: error.message });
  }
}

function* servicesOptionsSaga() {
  yield put({ type: SERVICES_OPTIONS_LOADING });
  try {
    let res = yield call(Api.servicesOptions);
    if (res.status) {
      yield put({ type: SERVICES_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: SERVICES_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: SERVICES_OPTIONS_ERROR, payload: error.message });
  }
}

function* technologiesOptionsSaga() {
  yield put({ type: TECHNOLOGIES_OPTIONS_LOADING });
  try {
    let res = yield call(Api.technologiesOptions);
    if (res.status) {
      yield put({ type: TECHNOLOGIES_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: TECHNOLOGIES_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: TECHNOLOGIES_OPTIONS_ERROR, payload: error.message });
  }
}

function* businessModelsOptionsSaga() {
  yield put({ type: BUSINESS_MODELS_OPTIONS_LOADING });
  try {
    let res = yield call(Api.businessModelsOptions);
    if (res.status) {
      yield put({ type: BUSINESS_MODELS_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: BUSINESS_MODELS_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: BUSINESS_MODELS_OPTIONS_ERROR, payload: error.message });
  }
}

function* targetMarketsOptionsSaga() {
  yield put({ type: TARGET_MARKET_OPTIONS_LOADING });
  try {
    let res = yield call(Api.targetMarketsOptions);
    if (res.status) {
      yield put({ type: TARGET_MARKET_OPTIONS_ERROR, payload: res.message });
    } else {
      yield put({ type: TARGET_MARKET_OPTIONS_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: TARGET_MARKET_OPTIONS_ERROR, payload: error.message });
  }
}

function* geographicalMarketsOptionsSaga() {
  yield put({ type: GEOGRAPHICAL_MARKET_OPTIONS_LOADING });
  try {
    let res = yield call(Api.geographicalMarketsOptions);
    if (res.status) {
      yield put({
        type: GEOGRAPHICAL_MARKET_OPTIONS_ERROR,
        payload: res.message,
      });
    } else {
      yield put({
        type: GEOGRAPHICAL_MARKET_OPTIONS_SUCCESS,
        payload: res.result,
      });
    }
  } catch (error) {
    yield put({
      type: GEOGRAPHICAL_MARKET_OPTIONS_ERROR,
      payload: error.message,
    });
  }
}

function* watchUpdateBusinessTagsAsync() {
  yield takeLatest(UPDATE_BUSINESS_TAGS_ACTION, updateBusinessTagsSaga);
  yield takeLatest(INDUSTRIES_OPTIONS_ACTION, industriesOptionsSaga);
  yield takeLatest(SERVICES_OPTIONS_ACTION, servicesOptionsSaga);
  yield takeLatest(TECHNOLOGIES_OPTIONS_ACTION, technologiesOptionsSaga);
  yield takeLatest(BUSINESS_MODELS_OPTIONS_ACTION, businessModelsOptionsSaga);
  yield takeLatest(TARGET_MARKET_OPTIONS_ACTION, targetMarketsOptionsSaga);
  yield takeLatest(
    GEOGRAPHICAL_MARKET_OPTIONS_ACTION,
    geographicalMarketsOptionsSaga
  );
}

export default watchUpdateBusinessTagsAsync;

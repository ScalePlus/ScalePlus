import { put, takeLatest, call } from "redux-saga/effects";
import {
  ATTACH_TEAM_ACTION,
  ATTACH_TEAM_LOADING,
  ATTACH_TEAM_SUCCESS,
  ATTACH_TEAM_ERROR,
  ACCEPT_TEAM_INVITATION_ACTION,
  ACCEPT_TEAM_INVITATION_LOADING,
  ACCEPT_TEAM_INVITATION_SUCCESS,
  ACCEPT_TEAM_INVITATION_ERROR,
} from "./types";
import Api from "./api";
import {
  GET_CHALLENGE_LOADING,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_ERROR,
} from "../../../challengeMaster/types";
import challengeMasterApi from "../../../challengeMaster/api";
import history from "../../../../history";

function* attachTeamSaga(data) {
  yield put({ type: ATTACH_TEAM_LOADING });
  try {
    let res = yield call(Api.attachTeam, data.payload, data.id);
    if (res.status) {
      yield put({ type: ATTACH_TEAM_ERROR, payload: res.message });
    } else {
      yield put({ type: ATTACH_TEAM_SUCCESS, payload: res });

      yield put({ type: GET_CHALLENGE_LOADING });
      try {
        let res = yield call(challengeMasterApi.getChallenge, data.id);
        if (res.status) {
          yield put({ type: GET_CHALLENGE_ERROR, payload: res.message });
        } else {
          yield put({ type: GET_CHALLENGE_SUCCESS, payload: res.result });
        }
      } catch (error) {
        yield put({ type: GET_CHALLENGE_ERROR, payload: error.message });
      }
    }
  } catch (error) {
    yield put({ type: ATTACH_TEAM_ERROR, payload: error.message });
  }
}

function* acceptTeamInvitationSaga(data) {
  yield put({ type: ACCEPT_TEAM_INVITATION_LOADING });
  try {
    let res = yield call(Api.acceptTeamInvitation, data.payload);
    if (res.status) {
      yield put({
        type: ACCEPT_TEAM_INVITATION_ERROR,
        payload: res.message,
      });
    } else {
      yield put({
        type: ACCEPT_TEAM_INVITATION_SUCCESS,
        payload: res.message,
      });
      history.push(`/dashboard`);
    }
  } catch (error) {
    yield put({
      type: ACCEPT_TEAM_INVITATION_ERROR,
      payload: error.message,
    });
  }
}

function* watchAttachTeamAsync() {
  yield takeLatest(ATTACH_TEAM_ACTION, attachTeamSaga);
  yield takeLatest(ACCEPT_TEAM_INVITATION_ACTION, acceptTeamInvitationSaga);
}

export default watchAttachTeamAsync;

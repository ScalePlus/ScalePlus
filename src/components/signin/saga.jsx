import { put, takeLatest, call } from "redux-saga/effects";
import {
  SIGNIN_ACTION,
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  LOGGEDIN_USER_ACTION,
  LOGGEDIN_USER_LOADING,
  LOGGEDIN_USER_SUCCESS,
  LOGGEDIN_USER_ERROR,
  GET_USER_ACTION,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GOOGLE_LOGIN_ACTION,
  GOOGLE_LOGIN_LOADING,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  LINKEDIN_LOGIN_ACTION,
  LINKEDIN_LOGIN_LOADING,
  LINKEDIN_LOGIN_SUCCESS,
  LINKEDIN_LOGIN_ERROR,
  FILE_LIST_ACTION,
  FILE_LIST_LOADING,
  FILE_LIST_SUCCESS,
  FILE_LIST_ERROR,
  LOGOUT_ACTION,
  LOGOUT_SUCCESS,
} from "./types";
import Api from "./api";
import {
  GET_ALL_CHALLENGES_ERROR,
  GET_ALL_CHALLENGES_SUCCESS,
} from "../allChallenges/types";
import allChallengesApi from "../allChallenges/api";
import history from "../../history";
import { Constants } from "../../lib/constant";

function* signinSaga(data) {
  yield put({ type: SIGNIN_LOADING });
  try {
    let res = yield call(Api.signin, data.payload);
    if (res.status) {
      yield put({ type: SIGNIN_ERROR, payload: res.message });
    } else {
      //get challenges after login
      let allChallengeRes = yield call(allChallengesApi.getAllChallenge, 1);
      if (allChallengeRes.status) {
        yield put({
          type: GET_ALL_CHALLENGES_ERROR,
          payload: allChallengeRes.message,
        });
      } else {
        yield put({
          type: GET_ALL_CHALLENGES_SUCCESS,
          payload: allChallengeRes,
          page: data.page,
        });
      }

      yield put({ type: SIGNIN_SUCCESS, payload: res.result });
      if (res.result.token) {
        localStorage.setItem("token", res.result.token);
      }

      if (res.result.userRole) {
        localStorage.setItem("userRole", res.result.userRole);
      }

      if (res.result.profileUpdated) {
        localStorage.setItem("profileUpdated", res.result.profileUpdated);
      }

      if (res.result.userId) {
        localStorage.setItem("userId", res.result.userId);
      }

      if (
        res &&
        res.result &&
        res.result.userRole &&
        Constants.ROLES.ADMIN === res.result.userRole
      ) {
        history.push("/dashboard");
      } else {
        if (data.mode === "modal") {
          if (res.result.token) {
            const is_organisation =
                localStorage.getItem("userRole") ===
                Constants.ROLES.ORGANIZATION,
              is_mentor_judge =
                localStorage.getItem("userRole") ===
                Constants.ROLES.MENTOR_JUDGE;

            if (res.result.profileUpdated) {
              if (is_organisation || is_mentor_judge) {
                data.setUserFlowModal("/dashboard");
              } else {
                data.setUserFlowModal("/solve/challenge");
              }
            } else {
              data.setUserFlowModal("/detail");
            }
          } else {
            data.setActiveModal("EmailVerification");
          }
        } else {
          if (res.result.token) {
            if (res.result.profileUpdated) {
              history.push("/dashboard");
            } else {
              history.push("/detail");
            }
          } else {
            history.push(`/verification/${res.result.userId}`);
          }
        }
      }
    }
  } catch (error) {
    yield put({ type: SIGNIN_ERROR, payload: error.message });
  }
}

function* loggedInUserSaga() {
  yield put({ type: LOGGEDIN_USER_LOADING });
  try {
    let res = yield call(Api.getLoggedInUser);
    if (res.status) {
      yield put({ type: LOGGEDIN_USER_ERROR, payload: res.message });
    } else {
      yield put({ type: LOGGEDIN_USER_SUCCESS, payload: res.result });
      localStorage.setItem("userRole", res.result.roles[0]);
    }
  } catch (error) {
    yield put({ type: LOGGEDIN_USER_ERROR, payload: error.message });
  }
}

function* getUserSaga(data) {
  yield put({ type: GET_USER_LOADING });
  try {
    let res = yield call(Api.getUser, data.payload);
    if (res.status) {
      yield put({ type: GET_USER_ERROR, payload: res.message });
    } else {
      yield put({ type: GET_USER_SUCCESS, payload: res.result });
      localStorage.setItem("userRole", res.result.roles[0]);
    }
  } catch (error) {
    yield put({ type: GET_USER_ERROR, payload: error.message });
  }
}

function* googleLoginSaga(data) {
  yield put({ type: GOOGLE_LOGIN_LOADING });
  try {
    let res = yield call(Api.googleLogin, data.payload);
    if (res.status) {
      yield put({ type: GOOGLE_LOGIN_ERROR, payload: res.message });
    } else {
      yield put({ type: GOOGLE_LOGIN_SUCCESS, payload: res.result });

      if (res.result.token) {
        localStorage.setItem("token", res.result.token);
      }

      if (res.result.userRole) {
        localStorage.setItem("userRole", res.result.userRole);
      }

      if (res.result.profileUpdated) {
        localStorage.setItem("profileUpdated", res.result.profileUpdated);
      }

      if (res.result.userId) {
        localStorage.setItem("userId", res.result.userId);
      }

      if (data.mode === "modal") {
        const is_organisation =
            localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
          is_mentor_judge =
            localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

        if (res.result.profileUpdated) {
          if (is_organisation || is_mentor_judge) {
            data.setUserFlowModal("/dashboard");
          } else {
            data.setUserFlowModal("/solve/challenge");
          }
        } else {
          data.setUserFlowModal("/detail");
        }
      } else {
        if (res.result.profileUpdated) {
          history.push("/dashboard");
        } else {
          history.push("/detail");
        }
      }
    }
  } catch (error) {
    yield put({ type: GOOGLE_LOGIN_ERROR, payload: error.message });
  }
}

function* linkedinLoginSaga(data) {
  yield put({ type: LINKEDIN_LOGIN_LOADING });
  try {
    let res = yield call(Api.linkedinLogin, data.payload);
    if (res.status) {
      yield put({ type: LINKEDIN_LOGIN_ERROR, payload: res.message });
    } else {
      yield put({ type: LINKEDIN_LOGIN_SUCCESS, payload: res.result });

      if (res.result.token) {
        localStorage.setItem("token", res.result.token);
      }

      if (res.result.userRole) {
        localStorage.setItem("userRole", res.result.userRole);
      }

      if (res.result.profileUpdated) {
        localStorage.setItem("profileUpdated", res.result.profileUpdated);
      }

      if (res.result.userId) {
        localStorage.setItem("userId", res.result.userId);
      }

      if (data.mode === "modal") {
        const is_organisation =
            localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
          is_mentor_judge =
            localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

        if (res.result.profileUpdated) {
          if (is_organisation || is_mentor_judge) {
            data.setUserFlowModal("/dashboard");
          } else {
            data.setUserFlowModal("/solve/challenge");
          }
        } else {
          data.setUserFlowModal("/detail");
        }
      } else {
        if (res.result.profileUpdated) {
          history.push("/dashboard");
        } else {
          history.push("/detail");
        }
      }
    }
  } catch (error) {
    yield put({ type: LINKEDIN_LOGIN_ERROR, payload: error.message });
  }
}

function* getFileListSaga() {
  yield put({ type: FILE_LIST_LOADING });
  try {
    let res = yield call(Api.getFileList);
    if (res.status) {
      yield put({ type: FILE_LIST_ERROR, payload: res.message });
    } else {
      yield put({ type: FILE_LIST_SUCCESS, payload: res.result });
    }
  } catch (error) {
    yield put({ type: FILE_LIST_ERROR, payload: error.message });
  }
}

function* logoutSaga() {
  yield put({ type: LOGOUT_SUCCESS });
  localStorage.clear();
  history.push("/");
}

function* watchSigninAsync() {
  yield takeLatest(SIGNIN_ACTION, signinSaga);
  yield takeLatest(LOGGEDIN_USER_ACTION, loggedInUserSaga);
  yield takeLatest(GET_USER_ACTION, getUserSaga);
  yield takeLatest(GOOGLE_LOGIN_ACTION, googleLoginSaga);
  yield takeLatest(LINKEDIN_LOGIN_ACTION, linkedinLoginSaga);
  yield takeLatest(FILE_LIST_ACTION, getFileListSaga);
  yield takeLatest(LOGOUT_ACTION, logoutSaga);
}

export default watchSigninAsync;

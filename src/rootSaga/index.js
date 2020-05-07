import { fork } from "redux-saga/effects";

import watchSignupAsync from "../components/signup/saga";

export function* rootSaga() {
  yield fork(watchSignupAsync);
}

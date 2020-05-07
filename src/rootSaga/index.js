import { fork } from "redux-saga/effects";

import watchSignupAsync from "../components/signup/saga";
import watchVerifyEmailAsync from "../components/emailVerification/saga";

export function* rootSaga() {
  yield fork(watchSignupAsync);
  yield fork(watchVerifyEmailAsync);
}

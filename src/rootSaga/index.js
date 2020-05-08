import { fork } from "redux-saga/effects";

import watchSignupAsync from "../components/signup/saga";
import watchVerifyEmailAsync from "../components/emailVerification/saga";
import watchSigninAsync from "../components/signin/saga";
import watchUpdateDetailsAsync from "../components/details/saga";
import updateBusinessTagsSaga from "../components/businessTags/saga";
import watchUpdateEssentialDetailsAsync from "../components/essentialDetails/saga";

export function* rootSaga() {
  yield fork(watchSignupAsync);
  yield fork(watchVerifyEmailAsync);
  yield fork(watchSigninAsync);
  yield fork(watchUpdateDetailsAsync);
  yield fork(updateBusinessTagsSaga);
  yield fork(watchUpdateEssentialDetailsAsync);
}

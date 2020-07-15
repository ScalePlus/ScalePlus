import { fork } from "redux-saga/effects";

import watchSignupAsync from "../components/signup/saga";
import watchVerifyEmailAsync from "../components/emailVerification/saga";
import watchSigninAsync from "../components/signin/saga";
import watchUpdateDetailsAsync from "../components/details/saga";
import watchUpdateBusinessTagsAsync from "../components/businessTags/saga";
import watchUpdateEssentialDetailsAsync from "../components/essentialDetails/saga";
import watchResetPasswordAsync from "../components/resetPassword/saga";
import watchChallengeAsync from "../components/challengeMaster/saga";
import watchUpdateDescriptionAsync from "../components/challengeEdit/subComponents/description/saga";
import watchAttachOverviewAsync from "../components/challengeEdit/subComponents/overview/saga";
import watchAttachGuidelineAsync from "../components/challengeEdit/subComponents/guidelines/saga";
import watchAttachFAQAsync from "../components/challengeEdit/subComponents/FAQ/saga";
import watchAttachUpdatesAsync from "../components/challengeEdit/subComponents/updates/saga";
import watchAttachResourceAsync from "../components/challengeEdit/subComponents/resources/saga";
import watchAttachTimelineAsync from "../components/challengeEdit/subComponents/timeline/saga";
import watchAttachSubmissionformAsync from "../components/challengeEdit/subComponents/submissionForm/saga";
import watchAttachJudgesNDAAsync from "../components/challengeEdit/subComponents/judgesNDA/saga";
import watchAttachLegalAggreementAsync from "../components/challengeEdit/subComponents/legalAgreement/saga";
import watchAttachJudgingCriteriaAsync from "../components/challengeEdit/subComponents/judgingCriteria/saga";
import watchAttachTeamAsync from "../components/challengeEdit/subComponents/team/saga";
import watchAttachJudgesAsync from "../components/challengeEdit/subComponents/judges/saga";
import inviteParticipantsSaga from "../components/challengeEdit/subComponents/userList/inviteModal/saga";
import watchGetAllChallengeAsync from "../components/allChallenges/saga";
import watchGetMyChallengeAsync from "../components/myChallenges/saga";
import watchSubmissionListAsync from "../components/challengePreview/subComponents/submissions/saga";
import watchSolveChallengeAsync from "../components/solveChallenge/saga";
import watchSearchAllAsync from "../components/header/subComponents/searchModal/saga";
import watchLinkedinDataAsync from "../components/linkedinPopup/saga";
import sharelinkSaga from "../components/shareLinkModal/saga";
import getAttachedUsersSaga from "../components/allUsers/saga";
import watchAttachJudgingActivitiesAsync from "../components/challengeEdit/subComponents/judgingActivities/saga";
import watchUpdateProfileAsync from "../components/profile/saga";

export function* rootSaga() {
  yield fork(watchSignupAsync);
  yield fork(watchVerifyEmailAsync);
  yield fork(watchSigninAsync);
  yield fork(watchUpdateDetailsAsync);
  yield fork(watchUpdateBusinessTagsAsync);
  yield fork(watchUpdateEssentialDetailsAsync);
  yield fork(watchResetPasswordAsync);
  yield fork(watchChallengeAsync);
  yield fork(watchUpdateDescriptionAsync);
  yield fork(watchAttachOverviewAsync);
  yield fork(watchAttachGuidelineAsync);
  yield fork(watchAttachFAQAsync);
  yield fork(watchAttachUpdatesAsync);
  yield fork(watchAttachResourceAsync);
  yield fork(watchAttachTimelineAsync);
  yield fork(watchAttachSubmissionformAsync);
  yield fork(watchAttachJudgesNDAAsync);
  yield fork(watchAttachLegalAggreementAsync);
  yield fork(watchAttachJudgingCriteriaAsync);
  yield fork(watchGetAllChallengeAsync);
  yield fork(watchGetMyChallengeAsync);
  yield fork(watchAttachTeamAsync);
  yield fork(watchAttachJudgesAsync);
  yield fork(inviteParticipantsSaga);
  yield fork(watchSubmissionListAsync);
  yield fork(watchSolveChallengeAsync);
  yield fork(watchSearchAllAsync);
  yield fork(watchLinkedinDataAsync);
  yield fork(watchAttachJudgingActivitiesAsync);
  yield fork(sharelinkSaga);
  yield fork(getAttachedUsersSaga);
  yield fork(watchUpdateProfileAsync);
}

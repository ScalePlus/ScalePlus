import { combineReducers } from "redux";
import * as signupReducer from "../components/signup/reducer";
import * as emailVerificationReducer from "../components/emailVerification/reducer";
import * as signinReducer from "../components/signin/reducer";
import * as updateDetailsReducer from "../components/details/reducer";
import * as updateBusinessTagsReducer from "../components/businessTags/reducer";
import * as updateEssentialDetailsReducer from "../components/essentialDetails/reducer";
import * as resetPasswordReducer from "../components/resetPassword/reducer";
import * as challengeReducer from "../components/challengeMaster/reducer";
import * as challengeDescriptionReducer from "../components/challengeEdit/subComponents/description/reducer";
import * as challengeOverviewReducer from "../components/challengeEdit/subComponents/overview/reducer";
import * as challengeGuidelineReducer from "../components/challengeEdit/subComponents/guidelines/reducer";
import * as challengeFAQReducer from "../components/challengeEdit/subComponents/FAQ/reducer";
import * as challengeUpdatesReducer from "../components/challengeEdit/subComponents/updates/reducer";
import * as challengeResourceReducer from "../components/challengeEdit/subComponents/resources/reducer";
import * as challengeTimelineReducer from "../components/challengeEdit/subComponents/timeline/reducer";
import * as challengeSubmissionformReducer from "../components/challengeEdit/subComponents/submissionForm/reducer";
import * as challengeJudgesNDAReducer from "../components/challengeEdit/subComponents/judgesNDA/reducer";
import * as challengeLegalAggreementReducer from "../components/challengeEdit/subComponents/legalAgreement/reducer";
import * as challengeJudgingCriteriaReducer from "../components/challengeEdit/subComponents/judgingCriteria/reducer";
import * as challengeTeamReducer from "../components/challengeEdit/subComponents/team/reducer";
import * as challengeJudgesReducer from "../components/challengeEdit/subComponents/judges/reducer";
import * as allChallengesReducer from "../components/allChallenges/reducer";
import * as myChallengesReducer from "../components/myChallenges/reducer";
import * as submissionListReducer from "../components/challengePreview/subComponents/submissions/reducer";
import * as SolveChallengeReducer from "../components/solveChallenge/reducer";
import * as searchAllReducer from "../components/header/subComponents/searchModal/reducer";

export default combineReducers(
  Object.assign(
    signupReducer,
    emailVerificationReducer,
    signinReducer,
    updateDetailsReducer,
    updateBusinessTagsReducer,
    updateEssentialDetailsReducer,
    resetPasswordReducer,
    challengeReducer,
    challengeDescriptionReducer,
    challengeOverviewReducer,
    challengeGuidelineReducer,
    challengeFAQReducer,
    challengeUpdatesReducer,
    challengeResourceReducer,
    challengeTimelineReducer,
    challengeSubmissionformReducer,
    challengeJudgesNDAReducer,
    challengeLegalAggreementReducer,
    challengeJudgingCriteriaReducer,
    allChallengesReducer,
    myChallengesReducer,
    challengeTeamReducer,
    challengeJudgesReducer,
    submissionListReducer,
    SolveChallengeReducer,
    searchAllReducer
  )
);

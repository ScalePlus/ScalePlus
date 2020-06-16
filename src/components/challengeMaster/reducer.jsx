import createReducer from "../../reducers/createReducer";
import {
  CREATE_CHALLENGE_LOADING,
  CREATE_CHALLENGE_SUCCESS,
  CREATE_CHALLENGE_ERROR,
  GET_CHALLENGE_LOADING,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_ERROR,
  UPLOAD_FILE_LOADING,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CHALLENGE_CATEGORIES_LOADING,
  CHALLENGE_CATEGORIES_SUCCESS,
  CHALLENGE_CATEGORIES_ERROR,
  UPDATE_CHALLENGE_LOADING,
  UPDATE_CHALLENGE_SUCCESS,
  UPDATE_CHALLENGE_ERROR,
} from "./types";
import { UPDATE_DESC_SUCCESS } from "../challengeEdit/subComponents/description/types";
import { ATTACH_OVERVIEW_SUCCESS } from "../challengeEdit/subComponents/overview/types";
import { ATTACH_TIMELINE_SUCCESS } from "../challengeEdit/subComponents/timeline/types";
import { ATTACH_FAQ_SUCCESS } from "../challengeEdit/subComponents/FAQ/types";
import { ATTACH_RESOURCES_SUCCESS } from "../challengeEdit/subComponents/resources/types";
import { ATTACH_GUIDELINE_SUCCESS } from "../challengeEdit/subComponents/guidelines/types";
import { ATTACH_UPDATES_SUCCESS } from "../challengeEdit/subComponents/updates/types";
import { ATTACH_SUBMISSION_FORM_SUCCESS } from "../challengeEdit/subComponents/submissionForm/types";
import { ATTACH_JUDGING_CRITERIA_SUCCESS } from "../challengeEdit/subComponents/judgingCriteria/types";
import { ATTACH_JUDGES_NDA_SUCCESS } from "../challengeEdit/subComponents/judgesNDA/types";
import { ATTACH_LEGAL_AGREEMENT_SUCCESS } from "../challengeEdit/subComponents/legalAgreement/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  challengeData: null,
  uploadedFile: null,
  challengeCategories: null,
};

export const challengeReducer = createReducer(initialState, {
  [CREATE_CHALLENGE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [CREATE_CHALLENGE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [CREATE_CHALLENGE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [GET_CHALLENGE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      challengeData: null,
      error: null,
    });
  },
  [GET_CHALLENGE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      challengeData: action.payload,
      error: null,
    });
  },
  [UPDATE_DESC_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["descriptionId"] = action.payload.result;
      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_OVERVIEW_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["overviewId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_TIMELINE_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["timelineId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_FAQ_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["FAQId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_RESOURCES_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["resourceId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_GUIDELINE_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["guidelineId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_UPDATES_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["updateId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_SUBMISSION_FORM_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["submissionFormId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_JUDGING_CRITERIA_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["judgingCriteriaId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_JUDGES_NDA_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["judgesNDAID"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [ATTACH_LEGAL_AGREEMENT_SUCCESS](state, action) {
    if (action && action.payload && action.payload.result) {
      state.challengeData["legalAgreementId"] = action.payload.result;

      return Object.assign({}, state, {
        loading: false,
        challengeData: state.challengeData,
        error: null,
      });
    } else {
      return {};
    }
  },
  [GET_CHALLENGE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      challengeData: null,
      error: action.payload,
    });
  },
  [UPDATE_CHALLENGE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [UPDATE_CHALLENGE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [UPDATE_CHALLENGE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [UPLOAD_FILE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      uploadedFile: null,
      error: null,
    });
  },
  [UPLOAD_FILE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      uploadedFile: action.payload,
      error: null,
    });
  },
  [UPLOAD_FILE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      uploadedFile: null,
      error: action.payload,
    });
  },
  [CHALLENGE_CATEGORIES_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      challengeCategories: null,
      error: null,
    });
  },
  [CHALLENGE_CATEGORIES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      challengeCategories: action.payload,
      error: null,
    });
  },
  [CHALLENGE_CATEGORIES_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      challengeCategories: null,
      error: action.payload,
    });
  },
});

import createReducer from "../../reducers/createReducer";
import {
  SIGNIN_LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  LOGGEDIN_USER_LOADING,
  LOGGEDIN_USER_SUCCESS,
  LOGGEDIN_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GOOGLE_LOGIN_LOADING,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  LINKEDIN_LOGIN_LOADING,
  LINKEDIN_LOGIN_SUCCESS,
  LINKEDIN_LOGIN_ERROR,
  FILE_LIST_LOADING,
  FILE_LIST_SUCCESS,
  FILE_LIST_ERROR,
  LOGOUT_SUCCESS,
  GET_INVITATION_BY_CODE_LOADING,
  GET_INVITATION_BY_CODE_SUCCESS,
  GET_INVITATION_BY_CODE_ERROR,
} from "./types";
import { UPDATE_PROFILE_SUCCESS } from "../profile/types";
import { UPDATE_DETAILS_SUCCESS } from "../details/types";
import {
  UPDATE_BUSINESS_TAGS_SUCCESS,
  PRESERVE_BUSSINESS_TAG_SUCCESS,
} from "../businessTags/types";
import {
  UPDATE_ESSENTIAL_DETAILS_SUCCESS,
  PRESERVE_ESSENTIAL_DATA_SUCCESS,
} from "../essentialDetails/types";
import { ATTACH_JUDGES_SUCCESS } from "../challengeEdit/subComponents/judges/types";
import {
  ACCEPT_PARTICIPANT_INVITATION_SUCCESS,
  SOLVE_CHALLENGE_SUCCESS,
} from "../solveChallenge/types";
import { ACCEPT_TEAM_INVITATION_SUCCESS } from "../challengeEdit/subComponents/team/types";

let initialState = {
  loading: false,
  error: null,
  success: null,
  userData: null,
  otherUserDetail: null,
  fileList: null,
  invitation: null,
};

export const signinReducer = createReducer(initialState, {
  [LOGOUT_SUCCESS](state, action) {
    return Object.assign({}, state, initialState);
  },
  [ATTACH_JUDGES_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      invitation: null,
      error: null,
    });
  },
  [ACCEPT_PARTICIPANT_INVITATION_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      invitation: null,
      error: null,
    });
  },
  [ACCEPT_TEAM_INVITATION_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      invitation: null,
      error: null,
    });
  },
  [SOLVE_CHALLENGE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      invitation: null,
      error: null,
    });
  },
  [GET_INVITATION_BY_CODE_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      invitation: null,
      error: null,
    });
  },
  [GET_INVITATION_BY_CODE_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      invitation: action.payload,
      error: null,
    });
  },
  [GET_INVITATION_BY_CODE_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      invitation: null,
      error: action.payload,
    });
  },
  [SIGNIN_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [SIGNIN_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [SIGNIN_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [LOGGEDIN_USER_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      userData: null,
      error: null,
    });
  },
  [LOGGEDIN_USER_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      userData: action.payload,
      error: null,
    });
  },
  [UPDATE_PROFILE_SUCCESS](state, action) {
    let userData = state.userData,
      otherUserDetail = state.otherUserDetail;

    if (action.payload && action.payload.result) {
      if (
        action.payload.result._id.toString() ===
        localStorage.getItem("userId").toString()
      ) {
        userData = action.payload.result;
      }
      otherUserDetail = action.payload.result;
    }

    return Object.assign({}, state, {
      loading: false,
      userData,
      otherUserDetail,
      error: null,
    });
  },
  [UPDATE_DETAILS_SUCCESS](state, action) {
    let userData = state.userData;
    userData["details"] = action.payload.details;
    return Object.assign({}, state, {
      loading: false,
      userData,
      error: null,
    });
  },
  [UPDATE_BUSINESS_TAGS_SUCCESS](state, action) {
    let userData = state.userData;
    userData["businessTags"] = action.payload.businessTags;
    return Object.assign({}, state, {
      loading: false,
      userData,
      error: null,
    });
  },
  [PRESERVE_BUSSINESS_TAG_SUCCESS](state, action) {
    let userData = state.userData;
    userData["businessTags"] = action.payload;
    return Object.assign({}, state, {
      loading: false,
      userData,
      error: null,
    });
  },
  [UPDATE_ESSENTIAL_DETAILS_SUCCESS](state, action) {
    let userData = state.userData;
    userData["essentialDetails"] = action.payload.essentialDetails;
    return Object.assign({}, state, {
      loading: false,
      userData,
      error: null,
    });
  },
  [PRESERVE_ESSENTIAL_DATA_SUCCESS](state, action) {
    let userData = state.userData;
    userData["essentialDetails"] = action.payload;
    return Object.assign({}, state, {
      loading: false,
      userData,
      error: null,
    });
  },
  [LOGGEDIN_USER_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      userData: null,
      error: action.payload,
    });
  },
  [GET_USER_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      otherUserDetail: null,
      error: null,
    });
  },
  [GET_USER_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      otherUserDetail: action.payload,
      error: null,
    });
  },
  [GET_USER_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      otherUserDetail: null,
      error: action.payload,
    });
  },
  [GOOGLE_LOGIN_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [GOOGLE_LOGIN_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [GOOGLE_LOGIN_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [LINKEDIN_LOGIN_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      success: null,
      error: null,
    });
  },
  [LINKEDIN_LOGIN_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: action.payload,
      error: null,
    });
  },
  [LINKEDIN_LOGIN_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      success: null,
      error: action.payload,
    });
  },
  [FILE_LIST_LOADING](state, action) {
    return Object.assign({}, state, {
      loading: true,
      fileList: null,
      success: null,
      error: null,
    });
  },
  [FILE_LIST_SUCCESS](state, action) {
    return Object.assign({}, state, {
      loading: false,
      fileList: action.payload,
      success: null,
      error: null,
    });
  },
  [FILE_LIST_ERROR](state, action) {
    return Object.assign({}, state, {
      loading: false,
      fileList: null,
      success: null,
      error: action.payload,
    });
  },
});

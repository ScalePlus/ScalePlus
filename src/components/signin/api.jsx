import coreApi from "../../lib/coreApi";

export default {
  signin: (data) => {
    let url = `/user/login`;
    let result = coreApi.POST(url, data);
    return result;
  },
  getLoggedInUser: () => {
    let url = `/user/getLoggedInUser`;
    let result = coreApi.GET(url);
    return result;
  },
  getUser: (id) => {
    let url = `/user/get/${id}`;
    let result = coreApi.GET(url);
    return result;
  },
  googleLogin: (data) => {
    let url = `/user/login/google`;
    let result = coreApi.POST(url, data);
    return result;
  },
  linkedinLogin: (data) => {
    let url = `/user/login/linkedin`;
    let result = coreApi.POST(url, data);
    return result;
  },
  getFileList: () => {
    let url = `/i18n`;
    let result = coreApi.GET(url);
    return result;
  },
  getInvitationByCode: (invitationCode) => {
    let url = `/mail/invitations/invitationCode/${invitationCode}`;
    let result = coreApi.GET(url);
    return result;
  },
};

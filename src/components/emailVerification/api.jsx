import coreApi from "../../lib/coreApi";

export default {
  verifyEmail: (data) => {
    let url = `/user/email/verification`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  resendVerification: (data) => {
    let url = `/user/resend/email/verification`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

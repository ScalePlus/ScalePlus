import coreApi from "../../lib/coreApi";

export default {
  updateProfile: (data, userId) => {
    const url = `/user/update/${userId}`;
    const result = coreApi.PUT(url, data);
    return result;
  },
  changeEmail: (data) => {
    const url = `/user/change/email`;
    const result = coreApi.PUT(url, data);
    return result;
  },
  resetPassword: (data) => {
    const url = `/user/reset/password`;
    const result = coreApi.PUT(url, data);
    return result;
  },
};

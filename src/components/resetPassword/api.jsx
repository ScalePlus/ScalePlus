import coreApi from "../../lib/coreApi";

export default {
  forgotPassword: (data) => {
    let url = `/user/forgotPassword`;
    let result = coreApi.POST(url, data);
    return result;
  },
  changePassword: (data) => {
    let url = `/user/changePassword`;
    let result = coreApi.POST(url, data);
    return result;
  },
};

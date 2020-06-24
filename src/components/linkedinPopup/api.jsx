import coreApi from "../../lib/coreApi";

export default {
  getLinkedinData: (data) => {
    let url = `/user/linkedin`;
    let result = coreApi.POST(url, data);
    return result;
  },
};

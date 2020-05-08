import coreApi from "../../lib/coreApi";

export default {
  updateEssentialDetails: (data) => {
    let url = `/user/updateEssentialDetails`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

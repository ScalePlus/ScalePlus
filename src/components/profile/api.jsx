import coreApi from "../../lib/coreApi";

export default {
  updateProfile: (data) => {
    const url = `/user/update`;
    const result = coreApi.PUT(url, data);
    return result;
  },
};

import coreApi from "../../lib/coreApi";

export default {
  updateStatus: (data) => {
    const url = `/update/status/attached/users`;
    const result = coreApi.PUT(url, data);
    return result;
  },
};

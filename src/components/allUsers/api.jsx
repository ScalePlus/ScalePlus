import coreApi from "../../lib/coreApi";

export default {
  getAttachedUsers: (filters) => {
    let url = `/attached/users`;
    let result = coreApi.PUT(url, filters);
    return result;
  },
};

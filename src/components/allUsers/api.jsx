import coreApi from "../../lib/coreApi";

export default {
  getAttachedUsers: (filters, searchText) => {
    let url = `/attached/users`;
    let result = coreApi.PUT(url, { filters, searchText });
    return result;
  },
};

import coreApi from "../../lib/coreApi";

export default {
  getMyChallenge: (filters) => {
    let url = `/my/challenge`;
    let result = coreApi.PUT(url, filters);
    return result;
  },
};

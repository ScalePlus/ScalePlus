import coreApi from "../../lib/coreApi";

export default {
  getMyChallenge: () => {
    let url = `/my/challenge`;
    let result = coreApi.GET(url);
    return result;
  },
};

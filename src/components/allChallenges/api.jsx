import coreApi from "../../lib/coreApi";

export default {
  getAllChallenge: (page) => {
    let url = `/all/challenge/${page}`;
    let result = coreApi.GET(url);
    return result;
  },
};

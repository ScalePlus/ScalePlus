import coreApi from "../../lib/coreApi";

export default {
  getAllChallenge: (page, filters) => {
    let url = `/all/challenge/${page}`;
    let result = coreApi.PUT(url, filters);
    return result;
  },
};

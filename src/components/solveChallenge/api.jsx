import coreApi from "../../lib/coreApi";

export default {
  solveChallenge: (id, data) => {
    let url = `/challenge/${id}/partipants`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

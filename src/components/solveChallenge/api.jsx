import coreApi from "../../lib/coreApi";

export default {
  solveChallenge: (id, data) => {
    let url = `/challenge/${id}/partiipants`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

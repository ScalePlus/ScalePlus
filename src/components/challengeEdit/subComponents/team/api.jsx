import coreApi from "../../../../lib/coreApi";

export default {
  attachTeam: (data, id) => {
    let url = `/challenge/${id}/team`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

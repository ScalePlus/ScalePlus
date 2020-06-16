import coreApi from "../../../../lib/coreApi";

export default {
  attachJudges: (data, id) => {
    let url = `/challenge/${id}/judges`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

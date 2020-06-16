import coreApi from "../../../../lib/coreApi";

export default {
  attachJudgesNDA: (data, id) => {
    let url = `/challenge/${id}/judgesNDA`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

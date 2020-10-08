import coreApi from "../../../../lib/coreApi";

export default {
  attachSummary: (data, id) => {
    let url = `/challenge/${id}/summary`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

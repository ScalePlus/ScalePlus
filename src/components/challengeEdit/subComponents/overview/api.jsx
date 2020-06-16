import coreApi from "../../../../lib/coreApi";

export default {
  attachOverview: (data, id) => {
    let url = `/challenge/${id}/overview`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

import coreApi from "../../../../lib/coreApi";

export default {
  attachUpdates: (data, id) => {
    let url = `/challenge/${id}/updates`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

import coreApi from "../../../../lib/coreApi";

export default {
  attachResources: (data, id) => {
    let url = `/challenge/${id}/resources`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

import coreApi from "../../../../lib/coreApi";

export default {
  attachFAQs: (data, id) => {
    let url = `/challenge/${id}/FAQ`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

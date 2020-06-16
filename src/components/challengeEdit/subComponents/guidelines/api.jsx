import coreApi from "../../../../lib/coreApi";

export default {
  attachGuideline: (data, id) => {
    let url = `/challenge/${id}/guideline`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

import coreApi from "../../../../lib/coreApi";

export default {
  updateDescription: (data, id) => {
    let url = `/challenge/${id}/description`;
    const result = coreApi.PUT(url, data);

    return result;
  },
  getTags: () => {
    let url = `/business/tags`;
    const result = coreApi.GET(url);

    return result;
  },
};

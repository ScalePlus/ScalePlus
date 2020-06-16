import coreApi from "../../../../lib/coreApi";

export default {
  attachTimeline: (data, id) => {
    let url = `/challenge/${id}/timeline`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

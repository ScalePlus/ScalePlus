import coreApi from "../../../../lib/coreApi";

export default {
  attachJudgingActivities: (data, id) => {
    let url = `/challenge/${id}/judgingActivities`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

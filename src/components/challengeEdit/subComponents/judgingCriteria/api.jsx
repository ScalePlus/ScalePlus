import coreApi from "../../../../lib/coreApi";

export default {
  attachJudgingCriteria: (data, id) => {
    let url = `/challenge/${id}/judgingCriteria`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  getRatingTypes: () => {
    let url = `/challenge/ratingTypes/list`;
    let result = coreApi.GET(url);
    return result;
  },
};

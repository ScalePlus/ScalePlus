import coreApi from "../../lib/coreApi";

export default {
  getActivities: (filters, searchText, challengeId) => {
    let url = `/activities/list`;
    let result = coreApi.PUT(url, { filters, searchText, challengeId });
    return result;
  },
  markRead: () => {
    let url = `/activities/mark/all/read`;
    let result = coreApi.PUT(url);
    return result;
  },
};

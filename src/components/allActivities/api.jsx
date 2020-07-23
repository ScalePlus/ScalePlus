import coreApi from "../../lib/coreApi";

export default {
  getActivities: (filters, searchText) => {
    let url = `/activities/list`;
    let result = coreApi.PUT(url, { filters, searchText });
    return result;
  },
  markRead: () => {
    let url = `/activities/mark/all/read`;
    let result = coreApi.PUT(url);
    return result;
  },
};

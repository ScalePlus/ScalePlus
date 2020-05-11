import coreApi from "../../lib/coreApi";

export default {
  signin: (data) => {
    let url = `/user/login`;
    let result = coreApi.POST(url, data);
    return result;
  },
  getLoggedInUser: () => {
    let url = `/user/getLoggedInUser`;
    let result = coreApi.GET(url);
    return result;
  },
  getUser: (id) => {
    let url = `/user/get/${id}`;
    let result = coreApi.GET(url);
    return result;
  },
};

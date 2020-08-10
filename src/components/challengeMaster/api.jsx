import coreApi from "../../lib/coreApi";

export default {
  createChallenge: (data) => {
    let url = `/challenge`;
    let result = coreApi.POST(url, data);

    return result;
  },
  getChallenge: (id) => {
    let url = `/challenge/${id}`;
    let result = coreApi.GET(url);
    return result;
  },
  updateChallenge: (data) => {
    let url = `/challenge/${data._id}`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  updateViews: (data) => {
    let url = `/challenge/views/${data._id}`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  uploadFile: (data) => {
    let url = `/uploadFile`;
    let result = coreApi.FILE_UPLOAD(url, data, "file", "POST");
    return result;
  },
  challengeCategoriesList: () => {
    let url = `/challenge/categories/list`;
    let result = coreApi.PUT(url, { searchText: "" });
    return result;
  },
  challengeTagsList: () => {
    let url = `/challenge/tags/list`;
    let result = coreApi.PUT(url, { searchText: "" });
    return result;
  },
  getCurrencyList: (data) => {
    let url = `/currency/list`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

import coreApi from "../../lib/coreApi";

export default {
  createChallenge: (data) => {
    let url = `/challenge`;
    let result;

    if (data.bannerImage && data.bannerImage.name) {
      result = coreApi.FILE_UPLOAD(url, data, "bannerImage", "POST");
    } else {
      result = coreApi.POST(url, data);
    }

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
  uploadFile: (data) => {
    let url = `/uploadFile`;
    let result = coreApi.FILE_UPLOAD(url, data, "file", "POST");
    return result;
  },
  challengeCategoriesList: () => {
    let url = `/challenge/categories/list`;
    let result = coreApi.GET(url);
    return result;
  },
};

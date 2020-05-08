import coreApi from "../../lib/coreApi";

export default {
  updateDetails: (data) => {
    let url = `/user/updateDetails`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  uploadLogo: (file) => {
    let url = `/user/uploadLogo`;
    let result = coreApi.FILE_UPLOAD(url, file);
    return result;
  },
};

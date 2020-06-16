import coreApi from "../../lib/coreApi";

export default {
  updateDetails: (data) => {
    let url = `/user/updateDetails`;
    let result;

    if (data.logo && data.logo.name) {
      result = coreApi.FILE_UPLOAD(url, data, "logo", "PUT");
    } else {
      result = coreApi.PUT(url, data);
    }

    return result;
  },
};

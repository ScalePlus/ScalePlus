import coreApi from "../../../../lib/coreApi";

export default {
  updateDescription: (data, id) => {
    let url = `/challenge/${id}/description`;
    let result;

    if (data.bannerImage && data.bannerImage.name) {
      result = coreApi.FILE_UPLOAD(url, data, "bannerImage", "PUT");
    } else {
      result = coreApi.PUT(url, data);
    }

    return result;
  },
};

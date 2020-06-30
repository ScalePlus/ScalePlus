import coreApi from "../../lib/coreApi";

export default {
  sharelink: (data) => {
    let url = `/sharelink`;
    let result = coreApi.POST(url, data);
    return result;
  },
};

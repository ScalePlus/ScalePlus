import coreApi from "../../lib/coreApi";

export default {
  signup: (data) => {
    let url = `/user/register`;
    let result = coreApi.POST(url, data);
    return result;
  },
};

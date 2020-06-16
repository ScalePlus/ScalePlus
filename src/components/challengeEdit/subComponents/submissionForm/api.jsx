import coreApi from "../../../../lib/coreApi";

export default {
  attachSubmissionform: (data, id) => {
    let url = `/challenge/${id}/submissionform`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

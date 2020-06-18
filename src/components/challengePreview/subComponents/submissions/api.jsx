import coreApi from "../../../../lib/coreApi";

export default {
  fillSubmissionform: (data, id) => {
    let url = `/challenge/${id}/submissionform/fill`;
    let result = coreApi.POST(url, data);
    return result;
  },
  getSubmissionsList: (id) => {
    let url = `/challenge/${id}/submissionform/list`;
    let result = coreApi.GET(url);
    return result;
  },
  disqualifySubmission: (id, submissionId) => {
    let url = `/challenge/${id}/submissionform/${submissionId}/disqualify`;
    let result = coreApi.PUT(url);
    return result;
  },
  judgeSubmissionform: (id, submissionId, data) => {
    let url = `/challenge/${id}/submissionform/${submissionId}/judge`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

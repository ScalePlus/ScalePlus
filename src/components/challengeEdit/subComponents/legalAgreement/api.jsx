import coreApi from "../../../../lib/coreApi";

export default {
  attachLegalAggreement: (data, id) => {
    let url = `/challenge/${id}/legalaggreement`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

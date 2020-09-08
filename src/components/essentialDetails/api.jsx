import coreApi from "../../lib/coreApi";

export default {
  updateEssentialDetails: (data) => {
    let url = `/user/updateEssentialDetails`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  coreBusinessOptions: () => {
    let url = `/coreBusinesses/list`;
    let result = coreApi.PUT(url, { searchText: "" });
    return result;
  },
  marketStagesOptions: () => {
    let url = `/marketStages/list`;
    let result = coreApi.PUT(url, { searchText: "" });
    return result;
  },
  expertisesOptions: () => {
    let url = `/expertises/list`;
    let result = coreApi.PUT(url, { searchText: "" });
    return result;
  },
  fundingsOptions: () => {
    let url = `/fundings/list`;
    let result = coreApi.PUT(url, { searchText: "" });
    return result;
  },
};

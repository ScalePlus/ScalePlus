import coreApi from "../../lib/coreApi";

export default {
  updateBusinessTags: (data) => {
    let url = `/user/updateBusinessTags`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  industriesOptions: () => {
    let url = `/industries/list`;
    let result = coreApi.GET(url);
    return result;
  },
  servicesOptions: () => {
    let url = `/services/list`;
    let result = coreApi.GET(url);
    return result;
  },
  technologiesOptions: () => {
    let url = `/technologies/list`;
    let result = coreApi.GET(url);
    return result;
  },
  businessModelsOptions: () => {
    let url = `/businessModels/list`;
    let result = coreApi.GET(url);
    return result;
  },
  targetMarketsOptions: () => {
    let url = `/targetMarkets/list`;
    let result = coreApi.GET(url);
    return result;
  },
  geographicalMarketsOptions: () => {
    let url = `/geographicalMarkets/list`;
    let result = coreApi.GET(url);
    return result;
  },
};

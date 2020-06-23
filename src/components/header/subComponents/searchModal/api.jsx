import coreApi from "../../../../lib/coreApi";

export default {
  searchAll: (searchText) => {
    let url = `/search/${searchText}`;
    let result = coreApi.GET(url);
    return result;
  },
};

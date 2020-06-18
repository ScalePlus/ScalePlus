import coreApi from "../../../../lib/coreApi";

export default {
  attachTimeline: (data, id) => {
    let url = `/challenge/${id}/timeline`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  getTimelineState: () => {
    let url = `/challenge/timelineState/list`;
    let result = coreApi.GET(url);
    return result;
  },
};

import coreApi from "../../../../../lib/coreApi";

export default {
  inviteParticipants: (data, id) => {
    let url = `/challenge/${id}/invite/participants`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

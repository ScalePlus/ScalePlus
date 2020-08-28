import coreApi from "../../lib/coreApi";

export default {
  solveChallenge: (id, data) => {
    let url = `/challenge/${id}/partipants`;
    let result = coreApi.PUT(url, data);
    return result;
  },
  acceptParticipantInvitation: (data) => {
    let url = `/accept/participant/invitation`;
    let result = coreApi.PUT(url, data);
    return result;
  },
};

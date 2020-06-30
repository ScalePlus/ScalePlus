import { GET_ALL_CHALLENGES_ACTION, DO_SUBSCRIPTION_ACTION } from "./types";

export const getAllChallengeAction = (page, filters) => ({
  type: GET_ALL_CHALLENGES_ACTION,
  page,
  filters,
});

export const doSubscriptionAction = (data, changeSubscribed, setEmail) => ({
  type: DO_SUBSCRIPTION_ACTION,
  payload: data,
  changeSubscribed,
  setEmail,
});

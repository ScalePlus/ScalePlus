import { ATTACH_FAQ_ACTION } from "./types";

export const attachFAQsAction = (data, id) => ({
  type: ATTACH_FAQ_ACTION,
  payload: data,
  id,
});

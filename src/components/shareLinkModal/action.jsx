import { SHARE_LINK_ACTION } from "./types";

export const sharelinkAction = (data, changeMailRes, setEmail) => ({
  type: SHARE_LINK_ACTION,
  payload: data,
  changeMailRes,
  setEmail,
});

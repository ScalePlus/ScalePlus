import { ATTACH_RESOURCES_ACTION } from "./types";

export const attachResourcesAction = (data, id) => ({
  type: ATTACH_RESOURCES_ACTION,
  payload: data,
  id,
});

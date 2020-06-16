import { ATTACH_LEGAL_AGREEMENT_ACTION } from "./types";

export const attachLegalAggreementAction = (data, id) => ({
  type: ATTACH_LEGAL_AGREEMENT_ACTION,
  payload: data,
  id,
});

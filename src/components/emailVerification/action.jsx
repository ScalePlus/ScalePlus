import {
  EMAIL_VERIFICATION_ACTION,
  RESEND_EMAIL_VERIFICATION_ACTION,
} from "./types";

export const verifyEmailAction = (data) => ({
  type: EMAIL_VERIFICATION_ACTION,
  payload: data,
});

export const resendVerificationAction = (data) => ({
  type: RESEND_EMAIL_VERIFICATION_ACTION,
  payload: data,
});

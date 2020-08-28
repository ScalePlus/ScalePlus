export const Constants = {
  BASE_URL: "http://localhost:3001/api",
  SOCKET_BASE_URL: "http://localhost:3001",
  isURL: new RegExp(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  ),
  isValidPassword: new RegExp(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/g
  ),
  STATUS: {
    ACTIVE: 0,
    INACTIVE: 1,
  },
  USER_STATUS: {
    Challenge_Update: "Challenge Update",
    Created: "Created",
    Invited: "Invited",
    Joined: "Joined",
    Approved: "Approved",
    Submitted: "Submitted",
    Accepeted: "Accepeted",
    Declined: "Declined",
    Disqualified: "Disqualified",
    Deleted: "Deleted",
    Canceled: "Canceled",
  },
  ACTIVITY_TYPE: {
    CHALLENGE_CREATED: "Challenge created",
    TEAM_INVITE: "Invited to the team",
    JUDGE_INVITE: "Invited as a judge",
    PARTICIPANT_INVITE: "Invited to participate",
    SOLVE_INVITE: "Invited to solve challenge",
    SUBMIT_APPLICATION: "Submitted Application",
    APPROVE_APPLICATION: "Approve Application",
    DISQUALIFY_APPLICATION: "Disqualify Application",
    JOIN_CHALLENGE: "Joined Challenge",
    DELETE_ACCOUNT: "Delete Account",
    CHALLENGE_CANCELED: "Challenge Canceled",
    REGISTER_USER: "User Registered",
    ACCEPT_USER: "User accepted",
    ACCEPT_YOU: "Accepted you for the challenge",
    REJECT_USER: "User rejected",
    REJECT_YOU: "Rejected you from the challenge",
    INVITATION_CANCEL: "Invitation Canceled",
  },
  LINKEDIN: {
    clientId: "78m7ndhgdx1vyt",
    client_secret: "Sm9Iun2kdyNZjiDT",
    redirectUri: "http://localhost:3000/linkedin",
  },
  ROLES: {
    ADMIN: "Admin",
    STARTUP_INDIVIDUAL: "Startup or Individual",
    ORGANIZATION: "Organization",
    MENTOR_JUDGE: "Mentor / Judge",
  },
  TEAM_PERMISSION: { ADMIN: "admin", VIEW: "view" },
};

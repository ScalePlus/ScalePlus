export const Constants = {
  BASE_URL: "http://localhost:3001/api",
  isURL: new RegExp(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  ),
  isValidPassword: new RegExp(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/g
  ),
  STATUS: {
    ACTIVE: 0,
    DELETED: 1,
  },
  LINKEDIN: {
    clientId: "78m7ndhgdx1vyt",
    client_secret: "Sm9Iun2kdyNZjiDT",
    redirectUri: "http://localhost:3000/linkedin",
  },
  ROLES: {
    STARTUP_INDIVIDUAL: "Startup or Individual",
    ORGANIZATION: "Organization",
    MENTOR_JUDGE: "Mentor / Judge",
  },
  TEAM_PERMISSION: { ADMIN: "admin", VIEW: "view" },
};

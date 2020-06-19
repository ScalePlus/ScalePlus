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
    redirectUri: "http://localhost:3001/api/user/linkedin/callback",
  },
  ROLES: {
    STARTUP_INDIVIDUAL: "Startup or Individual",
    ORGANIZATION: "Organization",
    MENTOR_JUDGE: "Mentor / Judge",
  },
  TEAM_PERMISSION: { ADMIN: "admin", VIEW: "view" },
  Errors: {
    fname: "First name is required",
    lname: "Last name is required",
    email: "Email is required",
    invalid_email: "Invalid Email",
    password: "Password is required",
    invalid_password: "Invalid password",
    confirmPassword: "Confirm password is required",
    passwordMismatch: "Password does not match",
    role: "Role is required",
    verificationCode: "Verification code is required",
    name: "Name is required",
    logo: "Logo is required",
    personal_photo: "Personal photo is required",
    website: "Website is required",
    invalid_website: "Invalid Website",
    linkedin_url: "Linkedin profile is required",
    invalid_linkedin_url: "Invalid linkedin profile",
    location: "Location is required",
    incorporationDate: "Incorporation date is required",
    mobile: "Mobile is required",
    birthDate: "Birth date is required",
    industry: "Industry is required",
    service: "Service is required",
    technology: "Technology is required",
    businessModel: "Business model is required",
    targetMarket: "Target market is required",
    georgraphicalMarket: "Georgraphical market is required",
    companyDesciption: "Company desciption is required",
    coreBusiness: "Core business is required",
    marketStage: "Market stage is required",
    funding: "Funding is required",
    summary: "Summary is required",
    expertise: "Expertise is required",
    title: "Title is required",
    prize: "Prize is required",
    Categories: "Categories is required",
    launchDate: "Launch date is required",
    dueDate: "Due date is required",
    biginDate: "Bigin date is required",
    endDate: "End date is required",
    anounceDate: "Announce date is required",
    score: "Score is required",
    invalid_videoURL: "Invalid video URL",
    cancellationReason: "Cancellation reason is required",
  },
};

import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  updateProfileAction,
  changeEmailAction,
  resetPasswordAction,
} from "./action";
import {
  industriesOptionsAction,
  servicesOptionsAction,
  technologiesOptionsAction,
  businessModelsOptionsAction,
  targetMarketsOptionsAction,
  geographicalMarketsOptionsAction,
} from "../businessTags/action";
import Api from "../challengeMaster/api";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Alert } from "react-bootstrap";
import {
  PassInput,
  Input,
  DropDown,
  DateInput,
  TextArea,
  PrimaryButton,
  CheckBox,
  Loading,
} from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";
import DeleteUserModal from "./deleteModal";
let fileUploader;

const UserProfileEdit = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updateProfile = (data) => dispatch(updateProfileAction(data));
  const changeEmailMethod = (data) => dispatch(changeEmailAction(data));
  const resetPasswordMethod = (data) => dispatch(resetPasswordAction(data));

  const industriesOptionsMethod = useCallback(
    () => dispatch(industriesOptionsAction()),
    [dispatch]
  );
  const servicesOptionsMethod = useCallback(
    () => dispatch(servicesOptionsAction()),
    [dispatch]
  );
  const technologiesOptionsMethod = useCallback(
    () => dispatch(technologiesOptionsAction()),
    [dispatch]
  );
  const businessModelsOptionsMethod = useCallback(
    () => dispatch(businessModelsOptionsAction()),
    [dispatch]
  );
  const targetMarketsOptionsMethod = useCallback(
    () => dispatch(targetMarketsOptionsAction()),
    [dispatch]
  );
  const geographicalMarketsOptionsMethod = useCallback(
    () => dispatch(geographicalMarketsOptionsAction()),
    [dispatch]
  );

  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });
  const updateProfileReducer = useSelector((state) => {
    return state.updateProfileReducer;
  });
  const updateBusinessTagsReducer = useSelector((state) => {
    return state.updateBusinessTagsReducer;
  });

  const is_startup_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    is_mentor_judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

  const [loading, setLoading] = useState(false);
  const [roleSwitch, switchToggle] = useState(false);
  const [logo, changeLogo] = useState("");
  const [personal_photo, changePersonalPhoto] = useState("");
  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [email, changeEmail] = useState("");

  const [name, changeName] = useState("");
  const [mobile, changeMobile] = useState("");
  const [website, changeWebsite] = useState("");
  const [location, changeLocation] = useState("");
  const [birthDate, changeBirthDate] = useState(null);
  const [incorporationDate, changeIncorporationDate] = useState(null);
  const [inspireText, setInspireText] = useState("");
  const [bioText, setBioText] = useState("");
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  const [selectedIndustries, selectIndustry] = useState([]);
  const [selectedServices, selectService] = useState([]);
  const [selectedTechnologies, selectTechnology] = useState([]);
  const [selectedBusinessModels, selectBusinessModels] = useState([]);
  const [selectedTargetMarkets, selectTargetMarket] = useState([]);
  const [selectedGeographicalMarket, selectGeographicalMarket] = useState([]);
  const {
    industriesOptions,
    servicesOptions,
    technologiesOptions,
    businessModelsOptions,
    targetMarketsOptions,
    geographicalMarketsOptions,
  } = updateBusinessTagsReducer;

  const [industry, changeIndustry] = useState("");
  const [subIndustry, changeSubIndustry] = useState("");
  const [marketLocation, changeMarketLocation] = useState("");
  const [businessModel, changeBusinessModel] = useState("");
  const [marketSegment, changeMarketSegment] = useState("");
  const [topCustomers, changeTopCustomers] = useState("");

  const [size, changeSize] = useState("");
  const [founders, changeFounders] = useState("");
  const [departments, changeDepartments] = useState("");

  const [revenue, changeRevenue] = useState("");
  const [cost, changeCost] = useState("");
  const [EBTIDA, changeEBTIDA] = useState("");
  const [operational, changeOperational] = useState("");

  const [rounds, changeRounds] = useState("");
  const [investors, changeInvestors] = useState("");
  const [equityStructure, changeEquityStructure] = useState("");

  const [frontEnd, changeFrontEnd] = useState("");
  const [backEnd, changeBackEnd] = useState("");
  const [other, changeOther] = useState("");

  const [socialLinks, changeSocialLinks] = useState("");
  const [numberOfLikes, changeNumberOfLikes] = useState("");
  const [reactions, changeReactions] = useState("");

  const [topKPIs, changeTopKPIs] = useState("");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const [ans1, changeAns1] = useState("");
  const [ans2, changeAns2] = useState("");
  const [ans3, changeAns3] = useState("");
  const [ans4, changeAns4] = useState("");
  const [ans5, changeAns5] = useState("");
  const [ans6, changeAns6] = useState("");

  const [consulting, changeConsulting] = useState(false);

  const [deleteModalShow, setShow] = useState(false);

  const [submittedForm, changeSubmittedForm] = useState(0);

  useEffect(() => {
    industriesOptionsMethod();
  }, [industriesOptionsMethod]);

  useEffect(() => {
    servicesOptionsMethod();
  }, [servicesOptionsMethod]);

  useEffect(() => {
    technologiesOptionsMethod();
  }, [technologiesOptionsMethod]);

  useEffect(() => {
    businessModelsOptionsMethod();
  }, [businessModelsOptionsMethod]);

  useEffect(() => {
    targetMarketsOptionsMethod();
  }, [targetMarketsOptionsMethod]);

  useEffect(() => {
    geographicalMarketsOptionsMethod();
  }, [geographicalMarketsOptionsMethod]);

  useEffect(() => {
    const { userData } = signinReducer;
    if (userData) {
      const {
        firstName,
        lastName,
        email,
        inspireText,
        bioText,
        details,
        businessTags,
        businessInformation,
        humanCapital,
        financials,
        funding,
        technology,
        marketing,
        operations,
        M_A,
        consulting,
      } = userData;

      if (firstName) {
        changeFirstName(firstName);
      }
      if (lastName) {
        changeLastName(lastName);
      }
      if (email) {
        changeEmail(email);
      }
      if (inspireText) {
        setInspireText(inspireText);
      }
      if (bioText) {
        setBioText(bioText);
      }
      if (details) {
        const {
          name,
          logo,
          personal_photo,
          mobile,
          website,
          locationData,
          birthDate,
          incorporationDate,
          isIndividual,
        } = details;
        if (name) {
          changeName(name);
        }
        if (logo) {
          changeLogo(logo);
        }
        if (personal_photo) {
          changePersonalPhoto(personal_photo);
        }
        if (mobile) {
          changeMobile(mobile);
        }
        if (website) {
          changeWebsite(website);
        }
        if (locationData) {
          changeLocation(locationData);
        }
        if (birthDate) {
          changeBirthDate(new Date(birthDate));
        }
        if (incorporationDate) {
          changeIncorporationDate(new Date(incorporationDate));
        }
        switchToggle(isIndividual);
      }
      if (businessTags) {
        let {
          industry,
          services,
          technology,
          businessModel,
          georgraphicalMarket,
          targetMarket,
        } = businessTags;
        if (industry && industry.length) {
          industry = industry.filter((each) => each._id && each.name);
          selectIndustry(
            industry.map((each) => {
              return { value: each._id, label: each.name };
            })
          );
        }
        if (services && services.length) {
          services = services.filter((each) => each._id && each.name);
          selectService(
            services.map((each) => {
              return { value: each._id, label: each.name };
            })
          );
        }
        if (technology && technology.length) {
          technology = technology.filter((each) => each._id && each.name);
          selectTechnology(
            technology.map((each) => {
              return { value: each._id, label: each.name };
            })
          );
        }
        if (businessModel && businessModel.length) {
          businessModel = businessModel.filter((each) => each._id && each.name);
          selectBusinessModels(
            businessModel.map((each) => {
              return { value: each._id, label: each.name };
            })
          );
        }
        if (georgraphicalMarket && georgraphicalMarket.length) {
          georgraphicalMarket = georgraphicalMarket.filter(
            (each) => each._id && each.name
          );
          selectGeographicalMarket(
            georgraphicalMarket.map((each) => {
              return { value: each._id, label: each.name };
            })
          );
        }
        if (targetMarket && targetMarket.length) {
          targetMarket = targetMarket.filter((each) => each._id && each.name);
          selectTargetMarket(
            targetMarket.map((each) => {
              return { value: each._id, label: each.name };
            })
          );
        }
      }
      if (businessInformation) {
        const {
          industry,
          subIndustry,
          marketLocation,
          businessModel,
          marketSegment,
          topCustomers,
        } = businessInformation;
        if (industry) {
          changeIndustry(industry);
        }
        if (subIndustry) {
          changeSubIndustry(subIndustry);
        }
        if (marketLocation) {
          changeMarketLocation(marketLocation);
        }
        if (businessModel) {
          changeBusinessModel(businessModel);
        }
        if (marketSegment) {
          changeMarketSegment(marketSegment);
        }
        if (topCustomers) {
          changeTopCustomers(topCustomers);
        }
      }
      if (humanCapital) {
        const { size, founders, departments } = humanCapital;
        if (size) {
          changeSize(size);
        }
        if (founders) {
          changeFounders(founders);
        }
        if (departments) {
          changeDepartments(departments);
        }
      }
      if (financials) {
        const { revenue, cost, EBTIDA, operational } = financials;
        if (revenue) {
          changeRevenue(revenue);
        }
        if (cost) {
          changeCost(cost);
        }
        if (EBTIDA) {
          changeEBTIDA(EBTIDA);
        }
        if (operational) {
          changeOperational(operational);
        }
      }
      if (funding) {
        const { rounds, investors, equityStructure } = funding;
        if (rounds) {
          changeRounds(rounds);
        }
        if (investors) {
          changeInvestors(investors);
        }
        if (equityStructure) {
          changeEquityStructure(equityStructure);
        }
      }
      if (technology) {
        const { frontEnd, backEnd, other } = technology;
        if (frontEnd) {
          changeFrontEnd(frontEnd);
        }
        if (backEnd) {
          changeBackEnd(backEnd);
        }
        if (other) {
          changeOther(other);
        }
      }
      if (marketing) {
        const { socialLinks, numberOfLikes, reactions } = marketing;
        if (socialLinks) {
          changeSocialLinks(socialLinks);
        }
        if (numberOfLikes) {
          changeNumberOfLikes(numberOfLikes);
        }
        if (reactions) {
          changeReactions(reactions);
        }
      }
      if (operations) {
        const { topKPIs } = operations;
        if (topKPIs) {
          changeTopKPIs(topKPIs);
        }
      }
      if (M_A) {
        const { ans1, ans2, ans3, ans4, ans5, ans6 } = M_A;
        if (ans1) {
          changeAns1(ans1);
        }
        if (ans2) {
          changeAns2(ans2);
        }
        if (ans3) {
          changeAns3(ans3);
        }
        if (ans4) {
          changeAns4(ans4);
        }
        if (ans5) {
          changeAns5(ans5);
        }
        if (ans6) {
          changeAns6(ans6);
        }
      }
      if (consulting) {
        changeConsulting(consulting);
      }
    }
  }, [signinReducer]);

  useEffect(() => {
    const { error } = updateProfileReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [updateProfileReducer]);

  useEffect(() => {
    const { error } = updateBusinessTagsReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [updateBusinessTagsReducer]);

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={10}>
          <div className="title">{t("Edit Profile")}</div>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 1}
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(1);
              if (
                (is_startup_Individual || is_organisation) &&
                name &&
                logo &&
                website &&
                website.match(Constants.isURL) &&
                location &&
                incorporationDate &&
                form.checkValidity()
              ) {
                let formData = {
                  name,
                  logo,
                  website,
                  locationData: location,
                  incorporationDate,
                  isStartUp: !roleSwitch,
                  isIndividual: roleSwitch,
                };
                if (logo && logo.name) {
                  setLoading(true);
                  let fileResult = await Api.uploadFile({
                    file: logo,
                  });
                  if (
                    fileResult &&
                    fileResult.result &&
                    fileResult.result.imageKey
                  ) {
                    formData["logo"] = fileResult.result.imageKey;
                  }
                  setLoading(false);
                }
                updateProfile({
                  firstName,
                  lastName,
                  inspireText,
                  bioText,
                  details: formData,
                });
              }
              if (
                is_mentor_judge &&
                name &&
                personal_photo &&
                mobile &&
                website &&
                website.match(Constants.isURL) &&
                location &&
                birthDate &&
                form.checkValidity()
              ) {
                let formData = {
                  name,
                  mobile,
                  website,
                  locationData: location,
                  birthDate,
                };
                if (personal_photo && personal_photo.name) {
                  setLoading(true);
                  let fileResult = await Api.uploadFile({
                    file: personal_photo,
                  });
                  if (
                    fileResult &&
                    fileResult.result &&
                    fileResult.result.imageKey
                  ) {
                    formData["personal_photo"] = fileResult.result.imageKey;
                  }
                  setLoading(false);
                }
                updateProfile({
                  firstName,
                  lastName,
                  inspireText,
                  bioText,
                  details: formData,
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Basic information")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 1 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            {is_startup_Individual || is_organisation ? (
              <>
                <Row>
                  <Col className="avtar-container">
                    <div className="circule-contaier">
                      {logo ? (
                        <img
                          src={
                            logo && logo.name ? URL.createObjectURL(logo) : logo
                          }
                          alt=""
                          height="100%"
                          width="100%"
                          style={{ borderRadius: "50%" }}
                        ></img>
                      ) : personal_photo ? (
                        <img
                          src={
                            personal_photo && personal_photo.name
                              ? URL.createObjectURL(personal_photo)
                              : personal_photo
                          }
                          alt=""
                          height="100%"
                          width="100%"
                          style={{ borderRadius: "50%" }}
                        ></img>
                      ) : (
                        <img
                          src={"/images/image.svg"}
                          height="50px"
                          width="50px"
                          alt=""
                        ></img>
                      )}
                    </div>
                    <div
                      className="replace-link"
                      onClick={() => {
                        fileUploader.click();
                      }}
                    >
                      {t("replace")}
                    </div>
                    <input
                      type="file"
                      ref={(ref) => (fileUploader = ref)}
                      style={{ display: "none" }}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                      onChange={(e) => {
                        if (is_mentor_judge) {
                          changePersonalPhoto(e.target.files[0]);
                        } else {
                          changeLogo(e.target.files[0]);
                        }
                      }}
                      accept={"image/*"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("First name") + " *"}
                      value={firstName}
                      onChange={(e) => changeFirstName(e.target.value)}
                      required
                      errorMessage={t("fname_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Last name") + " *"}
                      value={lastName}
                      onChange={(e) => changeLastName(e.target.value)}
                      required
                      errorMessage={t("lname_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Organization Name")}
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                      required
                      errorMessage={t("name_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="email"
                      label={t("Email") + " *"}
                      value={email}
                      onChange={() => {}}
                      readOnly
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Website Name")}
                      value={website}
                      onChange={(e) => changeWebsite(e.target.value)}
                      isInvalid={
                        validated &&
                        (!website ||
                          (website && !website.match(Constants.isURL)))
                      }
                      errorMessage={
                        website
                          ? t("invalid_website_error")
                          : t("website_error")
                      }
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Location")}
                      value={location}
                      onChange={(e) => changeLocation(e.target.value)}
                      required
                      errorMessage={t("location_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <DateInput
                      isSmall={true}
                      label={t("Incorporation Date")}
                      value={incorporationDate}
                      maxDate={new Date()}
                      onChange={(date) => {
                        changeIncorporationDate(date);
                      }}
                      required
                      errorMessage={t("incorporationDate_error")}
                    />
                  </Col>
                </Row>
              </>
            ) : is_mentor_judge ? (
              <>
                <Row>
                  <Col className="avtar-container">
                    <div className="circule-contaier">
                      {personal_photo ? (
                        <img
                          src={
                            personal_photo && personal_photo.name
                              ? URL.createObjectURL(personal_photo)
                              : personal_photo
                          }
                          alt=""
                          height="100%"
                          width="100%"
                          style={{ borderRadius: "50%" }}
                        ></img>
                      ) : (
                        <img
                          src={"/images/image.svg"}
                          height="50px"
                          width="50px"
                          alt=""
                        ></img>
                      )}
                    </div>
                    <div
                      className="replace-link"
                      onClick={() => {
                        fileUploader.click();
                      }}
                    >
                      {t("replace")}
                    </div>
                    <input
                      type="file"
                      ref={(ref) => (fileUploader = ref)}
                      style={{ display: "none" }}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                      onChange={(e) => {
                        changePersonalPhoto(e.target.files[0]);
                      }}
                      accept={"image/*"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("First name") + " *"}
                      value={firstName}
                      onChange={(e) => changeFirstName(e.target.value)}
                      required
                      errorMessage={t("fname_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Last name") + " *"}
                      value={lastName}
                      onChange={(e) => changeLastName(e.target.value)}
                      required
                      errorMessage={t("lname_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Full Name as Per Passport")}
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                      required
                      errorMessage={t("name_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="email"
                      label={t("Email") + " *"}
                      value={email}
                      onChange={() => {}}
                      readOnly
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Mobile Number")}
                      value={mobile}
                      onChange={(e) => changeMobile(e.target.value)}
                      required
                      errorMessage={t("mobile_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Website of Linkedin")}
                      value={website}
                      onChange={(e) => changeWebsite(e.target.value)}
                      isInvalid={
                        validated &&
                        (!website ||
                          (website && !website.match(Constants.isURL)))
                      }
                      errorMessage={
                        website
                          ? t("invalid_website_error")
                          : t("website_error")
                      }
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <Input
                      type="text"
                      label={t("Location")}
                      value={location}
                      onChange={(e) => changeLocation(e.target.value)}
                      required
                      errorMessage={t("location_error")}
                    ></Input>
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <DateInput
                      isSmall={true}
                      label={t("Birth Date")}
                      value={birthDate}
                      openToDate={
                        birthDate
                          ? birthDate
                          : new Date().setFullYear(
                              new Date().getFullYear() - 18
                            )
                      }
                      minDate={new Date().setFullYear(
                        new Date().getFullYear() - 150
                      )}
                      maxDate={new Date().setFullYear(
                        new Date().getFullYear() - 18
                      )}
                      onChange={(date) => {
                        changeBirthDate(date);
                      }}
                      required
                      errorMessage={t("birthDate_error")}
                    />
                  </Col>
                </Row>
              </>
            ) : null}
            <Row>
              <Col>
                <TextArea
                  rows="2"
                  label={t("inspires_text")}
                  description={
                    t("Characters left") + `: ${100 - inspireText.length}`
                  }
                  maxLength={100}
                  value={inspireText}
                  onChange={(e) => {
                    setInspireText(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextArea
                  rows="4"
                  label={t("Bio")}
                  value={bioText}
                  onChange={(e) => {
                    setBioText(e.target.value);
                  }}
                />
              </Col>
            </Row>
          </Form>
          <div className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Account Settings")}</div>
              </Col>
            </Row>
            {errors &&
            errors.length &&
            (submittedForm === 12 || submittedForm === 13) ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Form
                  noValidate
                  validated={validated && submittedForm === 12}
                  onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    changeSubmittedForm(12);
                    const form = event.currentTarget;
                    if (
                      currentPass &&
                      currentPass.match(Constants.isValidPassword) &&
                      newPass &&
                      newPass.match(Constants.isValidPassword) &&
                      confirmPass &&
                      confirmPass.match(Constants.isValidPassword) &&
                      newPass === confirmPass &&
                      form.checkValidity()
                    ) {
                      resetPasswordMethod({
                        currentPass,
                        confirmPass,
                      });
                    }
                    setValidated(true);
                  }}
                >
                  <PassInput
                    label={t("Current Password")}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    isInvalid={
                      validated &&
                      (!currentPass ||
                        (currentPass &&
                          !currentPass.match(Constants.isValidPassword)))
                    }
                    errorMessage={
                      currentPass
                        ? t("invalid_password_error")
                        : t("password_error")
                    }
                  />
                  <PassInput
                    label={t("New Password")}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    isInvalid={
                      validated &&
                      (!newPass ||
                        (newPass && !newPass.match(Constants.isValidPassword)))
                    }
                    errorMessage={
                      newPass
                        ? t("invalid_password_error")
                        : t("password_error")
                    }
                  />
                  <PassInput
                    label={t("Confirm Password")}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    isInvalid={
                      validated &&
                      (!confirmPass ||
                        (newPass && confirmPass && newPass !== confirmPass))
                    }
                    errorMessage={
                      confirmPass
                        ? t("passwordMismatch_error")
                        : t("confirmPassword_error")
                    }
                  />
                  <div className="float-right">
                    <PrimaryButton
                      text={t("Update Password")}
                      variant="primary"
                      type="submit"
                    />
                  </div>
                </Form>
                <div style={{ marginTop: "5rem" }}>
                  <PrimaryButton
                    text={t("Delete Account")}
                    variant="secondary"
                    onClick={() => {
                      setShow(true);
                    }}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Form
                  noValidate
                  validated={validated && submittedForm === 13}
                  onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    changeSubmittedForm(13);
                    const form = event.currentTarget;
                    if (newEmail && form.checkValidity()) {
                      changeEmailMethod({ email: newEmail });
                    }
                    setValidated(true);
                  }}
                >
                  <Input
                    type="email"
                    label={t("New Email Address")}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                  <div className="float-right">
                    <PrimaryButton
                      text={t("Update Email")}
                      variant="primary"
                      type="submit"
                    />
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 2}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(2);
              if (
                selectedIndustries &&
                selectedIndustries.length &&
                selectedServices &&
                selectedServices.length &&
                selectedTechnologies &&
                selectedTechnologies.length &&
                selectedBusinessModels &&
                selectedBusinessModels.length &&
                selectedTargetMarkets &&
                selectedTargetMarkets.length &&
                selectedGeographicalMarket &&
                selectedGeographicalMarket.length &&
                form.checkValidity()
              ) {
                updateProfile({
                  businessTags: {
                    industry: selectedIndustries,
                    services: selectedServices,
                    technology: selectedTechnologies,
                    businessModel: selectedBusinessModels,
                    targetMarket: selectedTargetMarkets,
                    georgraphicalMarket: selectedGeographicalMarket,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Business Tags")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 2 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col>
                <DropDown
                  isSmall={true}
                  label={t("Industry")}
                  description={t("industry_description")}
                  options={
                    industriesOptions && industriesOptions.length
                      ? industriesOptions.map((each) => {
                          return { value: each._id, label: each.name };
                        })
                      : []
                  }
                  value={selectedIndustries}
                  onChange={(val) => {
                    selectIndustry(val);
                  }}
                  isInvalid={
                    validated &&
                    (!selectedIndustries ||
                      (selectedIndustries && selectedIndustries.length === 0))
                  }
                  errorMessage={t("industry_error")}
                />

                <DropDown
                  isSmall={true}
                  label={t("Sevices / products you offer")}
                  description={t("max_tag_description")}
                  options={
                    servicesOptions && servicesOptions.length
                      ? servicesOptions.map((each) => {
                          return { value: each._id, label: each.name };
                        })
                      : []
                  }
                  value={selectedServices}
                  onChange={(val) => {
                    selectService(val);
                  }}
                  isInvalid={
                    validated &&
                    (!selectedServices ||
                      (selectedServices && selectedServices.length === 0))
                  }
                  errorMessage={t("service_error")}
                />
                <DropDown
                  isSmall={true}
                  label={t("Technology")}
                  description={t("max_tag_description")}
                  options={
                    technologiesOptions && technologiesOptions.length
                      ? technologiesOptions.map((each) => {
                          return { value: each._id, label: each.name };
                        })
                      : []
                  }
                  value={selectedTechnologies}
                  onChange={(val) => {
                    selectTechnology(val);
                  }}
                  isInvalid={
                    validated &&
                    (!selectedTechnologies ||
                      (selectedTechnologies &&
                        selectedTechnologies.length === 0))
                  }
                  errorMessage={t("technology_error")}
                />

                <DropDown
                  isSmall={true}
                  label={t("Business Model")}
                  description={t("max_tag_description")}
                  options={
                    businessModelsOptions && businessModelsOptions.length
                      ? businessModelsOptions.map((each) => {
                          return { value: each._id, label: each.name };
                        })
                      : []
                  }
                  value={selectedBusinessModels}
                  onChange={(val) => {
                    selectBusinessModels(val);
                  }}
                  isInvalid={
                    validated &&
                    (!selectedBusinessModels ||
                      (selectedBusinessModels &&
                        selectedBusinessModels.length === 0))
                  }
                  errorMessage={t("businessModel_error")}
                />

                <DropDown
                  isSmall={true}
                  label={t("Target Market")}
                  description={t("max_tag_description")}
                  options={
                    targetMarketsOptions && targetMarketsOptions.length
                      ? targetMarketsOptions.map((each) => {
                          return { value: each._id, label: each.name };
                        })
                      : {}
                  }
                  value={selectedTargetMarkets}
                  onChange={(val) => {
                    selectTargetMarket(val);
                  }}
                  isInvalid={
                    validated &&
                    (!selectedTargetMarkets ||
                      (selectedTargetMarkets &&
                        selectedTargetMarkets.length === 0))
                  }
                  errorMessage={t("targetMarket_error")}
                />
                <DropDown
                  isSmall={true}
                  label={t("Geographical Market")}
                  description={t("max_tag_description")}
                  options={
                    geographicalMarketsOptions &&
                    geographicalMarketsOptions.length
                      ? geographicalMarketsOptions.map((each) => {
                          return { value: each._id, label: each.name };
                        })
                      : []
                  }
                  value={selectedGeographicalMarket}
                  onChange={(val) => {
                    selectGeographicalMarket(val);
                  }}
                  isInvalid={
                    validated &&
                    (!selectedGeographicalMarket ||
                      (selectedGeographicalMarket &&
                        selectedGeographicalMarket.length === 0))
                  }
                  errorMessage={t("georgraphicalMarket_error")}
                />
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 3}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(3);
              if (form.checkValidity()) {
                updateProfile({
                  businessInformation: {
                    industry,
                    subIndustry,
                    marketLocation,
                    businessModel,
                    marketSegment,
                    topCustomers,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Business Information")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 3 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Industry")}
                  value={industry}
                  onChange={(e) => changeIndustry(e.target.value)}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Sub Industry")}
                  value={subIndustry}
                  onChange={(e) => changeSubIndustry(e.target.value)}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Market/ Locations")}
                  value={marketLocation}
                  onChange={(e) => changeMarketLocation(e.target.value)}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Business Model")}
                  value={businessModel}
                  onChange={(e) => changeBusinessModel(e.target.value)}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Market Segment")}
                  value={marketSegment}
                  onChange={(e) => changeMarketSegment(e.target.value)}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Top Customers")}
                  value={topCustomers}
                  onChange={(e) => changeTopCustomers(e.target.value)}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 4}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(4);
              if (form.checkValidity()) {
                updateProfile({
                  humanCapital: {
                    size,
                    founders,
                    departments,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Human Capital")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 4 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Size")}
                  value={size}
                  onChange={(e) => {
                    changeSize(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Founders")}
                  value={founders}
                  onChange={(e) => {
                    changeFounders(e.target.value);
                  }}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Departments")}
                  value={departments}
                  onChange={(e) => {
                    changeDepartments(e.target.value);
                  }}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 5}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(5);
              if (form.checkValidity()) {
                updateProfile({
                  financials: {
                    revenue,
                    cost,
                    EBTIDA,
                    operational,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Financials")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 5 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Revenue")}
                  value={revenue}
                  onChange={(e) => {
                    changeRevenue(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Cost")}
                  value={cost}
                  onChange={(e) => {
                    changeCost(e.target.value);
                  }}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("EBTIDA")}
                  value={EBTIDA}
                  onChange={(e) => {
                    changeEBTIDA(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Operational")}
                  value={operational}
                  onChange={(e) => {
                    changeOperational(e.target.value);
                  }}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 6}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(6);
              if (form.checkValidity()) {
                updateProfile({
                  funding: {
                    rounds,
                    investors,
                    equityStructure,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Funding")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 6 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Rounds")}
                  value={rounds}
                  onChange={(e) => changeRounds(e.target.value)}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Investors")}
                  value={investors}
                  onChange={(e) => changeInvestors(e.target.value)}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Equity Structure")}
                  value={equityStructure}
                  onChange={(e) => changeEquityStructure(e.target.value)}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 7}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(7);
              if (form.checkValidity()) {
                updateProfile({
                  technology: {
                    frontEnd,
                    backEnd,
                    other,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Technology")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 7 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("FrontEnd")}
                  value={frontEnd}
                  onChange={(e) => changeFrontEnd(e.target.value)}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("BackEnd")}
                  value={backEnd}
                  onChange={(e) => changeBackEnd(e.target.value)}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Other")}
                  value={other}
                  onChange={(e) => changeOther(e.target.value)}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 8}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(8);
              if (form.checkValidity()) {
                updateProfile({
                  marketing: {
                    socialLinks,
                    numberOfLikes,
                    reactions,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Marketing")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 8 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Social links")}
                  value={socialLinks}
                  onChange={(e) => changeSocialLinks(e.target.value)}
                ></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="number"
                  label={t("Number of likes")}
                  value={numberOfLikes}
                  onChange={(e) => changeNumberOfLikes(e.target.value)}
                ></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Reactions")}
                  value={reactions}
                  onChange={(e) => changeReactions(e.target.value)}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 9}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(9);
              if (form.checkValidity()) {
                updateProfile({
                  operations: {
                    topKPIs,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Operations")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 9 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input
                  type="text"
                  label={t("Top KPIs")}
                  value={topKPIs}
                  onChange={(e) => {
                    changeTopKPIs(e.target.value);
                  }}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 10}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(10);
              if (form.checkValidity()) {
                updateProfile({
                  M_A: {
                    ans1,
                    ans2,
                    ans3,
                    ans4,
                    ans5,
                    ans6,
                  },
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("M&A")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 10 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col lg={12} md={12} sm={12}>
                <Input
                  type="text"
                  label={t("M&A_Q1")}
                  description={t("Some text here")}
                  value={ans1}
                  onChange={(e) => changeAns1(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q2")}
                  description={t("Some text here")}
                  value={ans2}
                  onChange={(e) => changeAns2(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q3")}
                  description={t("Some text here")}
                  value={ans3}
                  onChange={(e) => changeAns3(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q4")}
                  description={t("Some text here")}
                  value={ans4}
                  onChange={(e) => changeAns4(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q5")}
                  description={t("Some text here")}
                  value={ans5}
                  onChange={(e) => changeAns5(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q6")}
                  description={t("Some text here")}
                  value={ans6}
                  onChange={(e) => changeAns6(e.target.value)}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form
            className="box-container"
            noValidate
            validated={validated && submittedForm === 11}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const form = event.currentTarget;
              changeSubmittedForm(11);
              if (form.checkValidity()) {
                updateProfile({
                  consulting,
                });
              }
              setValidated(true);
            }}
          >
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Consulting")}</div>
                <div className="button-container">
                  <PrimaryButton
                    text={t("Update")}
                    variant="primary"
                    type="submit"
                  />
                </div>
              </Col>
            </Row>
            {errors && errors.length && submittedForm === 11 ? (
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Alert variant={"danger"} className="text-left">
                    {errors.map((each, index) => {
                      return <div key={index}>{each}</div>;
                    })}
                  </Alert>
                </Col>
              </Row>
            ) : null}
            <Row style={{ marginTop: 20 }}>
              <Col>
                <CheckBox
                  id={`checkbox-1`}
                  checkBoxText={t("Consulting_description")}
                  checked={consulting}
                  onChange={(e) => {
                    changeConsulting(!consulting);
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <DeleteUserModal
        t={t}
        show={deleteModalShow}
        setShow={setShow}
        errors={errors}
        onDelete={async () => {
          await updateProfile({
            status: Constants.STATUS.INACTIVE,
          });
          localStorage.clear();
          history.push("/");
        }}
      />
      {(updateProfileReducer.loading ||
        signinReducer.loading ||
        updateBusinessTagsReducer.loading ||
        loading) && <Loading />}
    </MainContainer>
  );
};

export default UserProfileEdit;

import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../profile/action";
import { updateDetailsAction } from "./action";
import { technologiesOptionsAction } from "../businessTags/action";
import { MainContainer } from "./style";
import {
  Title,
  Description,
  Input,
  FileInput,
  DateInput,
  Switch,
  IconButton,
  Loading,
  DropDown,
  TextArea,
} from "../common";
import { Constants } from "../../lib/constant";
import history from "../../history";

const OrganizationDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updateProfile = (data, userId) =>
    dispatch(updateProfileAction(data, userId));
  const updateDetailsMethod = (data) => dispatch(updateDetailsAction(data));
  const technologiesOptionsMethod = useCallback(
    () => dispatch(technologiesOptionsAction()),
    [dispatch]
  );

  const updateDetailsReducer = useSelector((state) => {
    return state.updateDetailsReducer;
  });
  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });
  const updateBusinessTagsReducer = useSelector((state) => {
    return state.updateBusinessTagsReducer;
  });
  const updateProfileReducer = useSelector((state) => {
    return state.updateProfileReducer;
  });

  const { technologiesOptions } = updateBusinessTagsReducer;

  const is_startup_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    is_mentor_judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

  const [isInd, switchIsInd] = useState(false);
  const [logo, changeLogo] = useState("");
  const [personal_photo, changePersonalPhoto] = useState("");
  const [name, changeName] = useState("");
  const [current_position_company, changeCurrentPosition] = useState("");
  const [website, changeWebsite] = useState("");
  const [location, changeLocation] = useState("");
  const [HQ, changeHQ] = useState("");
  const [problemSolved, changeProblemSolved] = useState("");
  // const [birthDate, changeBirthDate] = useState(null);
  const [incorporationDate, changeIncorporationDate] = useState(null);
  const [providedExpertise, setProvidedExpertise] = useState([]);
  const [selectedTechnologies, selectTechnology] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    technologiesOptionsMethod();
  }, [technologiesOptionsMethod]);

  useEffect(() => {
    if (updateProfileReducer?.success?.status === 0) {
      history.push("/");
    }
  }, [updateProfileReducer]);

  useEffect(() => {
    const { userData } = signinReducer;
    if (userData && userData.details) {
      const {
        name,
        logo,
        personal_photo,
        current_position_company,
        website,
        locationData,
        // birthDate,
        incorporationDate,
        isIndividual,
        HQ,
        problemSolved,
      } = userData.details;
      if (name) {
        changeName(name);
      }
      if (logo) {
        changeLogo(logo);
      }
      if (personal_photo) {
        changePersonalPhoto(personal_photo);
      }
      if (current_position_company) {
        changeCurrentPosition(current_position_company);
      }
      if (website) {
        changeWebsite(website);
      }
      if (locationData) {
        changeLocation(locationData);
      }
      if (HQ) {
        changeHQ(HQ);
      }
      if (problemSolved) {
        changeProblemSolved(problemSolved);
      }
      // if (birthDate) {
      //   changeBirthDate(new Date(birthDate));
      // }
      if (incorporationDate) {
        changeIncorporationDate(new Date(incorporationDate));
      }
      switchIsInd(isIndividual);
    }
    if (userData?.businessTags) {
      let { technology, providedExpertise } = userData.businessTags;
      if (providedExpertise && providedExpertise.length) {
        setProvidedExpertise(providedExpertise);
      }

      if (technology && technology.length) {
        technology = technology.filter((each) => each._id && each.name);
        selectTechnology(
          technology.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
      }
    }
    if (userData?.essentialDetails) {
      const { summary } = userData.essentialDetails;
      if (summary) {
        setTextAreaValue(summary);
      }
    }
  }, [signinReducer]);

  useEffect(() => {
    const { error } = updateDetailsReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [updateDetailsReducer]);

  const onUpdateDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
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
      updateDetailsMethod({
        name,
        logo,
        website,
        locationData: location,
        incorporationDate,
        isStartUp: !isInd,
        isIndividual: isInd,
        problemSolved: problemSolved,
        HQ: HQ,
      });
    }
    if (
      is_mentor_judge &&
      name &&
      personal_photo &&
      signinReducer?.userData?._id &&
      // website &&
      // website.match(Constants.isURL) &&
      // location &&
      // birthDate &&
      form.checkValidity()
    ) {
      let formData = {
        name,
        current_position_company,
        // website,
        // locationData: location,
        // birthDate,
      };
      if (personal_photo && personal_photo.name) {
        formData["logo"] = personal_photo;
      } else {
        formData["personal_photo"] = personal_photo;
      }
      // updateDetailsMethod(formData);

      updateProfile(
        {
          details: formData,
          businessTags: {
            providedExpertise,
            technology: selectedTechnologies,
          },
          essentialDetails: { summary: textAreaValue },
        },
        signinReducer.userData._id
      );
    }
    setValidated(true);
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title
                text={
                  is_startup_Individual
                    ? t("Quick Details")
                    : is_organisation
                    ? t("Organization Details")
                    : is_mentor_judge
                    ? t("Quick Details")
                    : ""
                }
                icon={true}
              ></Title>
            </Col>
          </Row>

          {is_startup_Individual && (
            <Row>
              <Col>
                <div className="switch-container">
                  <div className={`startup-text ${!isInd && "active"}`}>
                    <span>{t("Startup")}</span>
                  </div>
                  <div>
                    <Switch
                      checked={isInd}
                      onChange={(e) => {
                        switchIsInd(!isInd);
                        const { userData } = signinReducer;
                        if (userData && userData.details) {
                          const {
                            name,
                            logo,
                            website,
                            locationData,
                            incorporationDate,
                            isIndividual,
                          } = userData.details;
                          if (isIndividual === isInd) {
                            changeName("");
                            changeLogo("");
                            changeWebsite("");
                            changeLocation("");
                            changeIncorporationDate(null);
                          } else {
                            if (name) {
                              changeName(name);
                            }
                            if (logo) {
                              changeLogo(logo);
                            }
                            if (website) {
                              changeWebsite(website);
                            }
                            if (locationData) {
                              changeLocation(locationData);
                            }
                            if (incorporationDate) {
                              changeIncorporationDate(
                                new Date(incorporationDate)
                              );
                            }
                          }
                        }
                      }}
                      label=""
                    ></Switch>
                  </div>
                  <div className={`individual-text ${isInd && "active"}`}>
                    <span>{t("Individual")}</span>
                  </div>
                </div>
              </Col>
            </Row>
          )}

          <Row className="description-container">
            <Col>
              <Description>{t("detail_text")}</Description>
            </Col>
          </Row>
          <Form noValidate validated={validated} onSubmit={onUpdateDetails}>
            <div className="form-container">
              {errors && errors.length ? (
                <Alert variant={"danger"} className="text-left">
                  {errors.map((each, index) => {
                    return <div key={index}>{each}</div>;
                  })}
                </Alert>
              ) : null}
              <Row>
                {is_startup_Individual || is_organisation ? (
                  <Col>
                    <Input
                      type="text"
                      placeholder={
                        isInd
                          ? t("Full Name as Per Passport")
                          : t("Organization Name")
                      }
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                      required
                      errorMessage={t("name_error")}
                    ></Input>
                    <FileInput
                      placeholder={isInd ? t("Personal Photo") : t("Logo")}
                      value={logo}
                      onChange={(e) => {
                        changeLogo(e.target.files[0]);
                      }}
                      required
                      errorMessage={
                        isInd ? t("personal_photo_error") : t("logo_error")
                      }
                      buttonText="Upload"
                      acceptTypes="image/*"
                      maxMB={10}
                      aspectRatio={1 / 1}
                      onCropDone={(file) => {
                        changeLogo(file);
                      }}
                    ></FileInput>
                    <Input
                      type="text"
                      placeholder={t("Website")}
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
                    <Input
                      type="text"
                      placeholder={t("Location")}
                      value={location}
                      onChange={(e) => changeLocation(e.target.value)}
                      required
                      errorMessage={t("location_error")}
                    ></Input>
                    {isInd ? (
                      <DateInput
                        isSmall={false}
                        placeholder={t("Date of Birth")}
                        value={incorporationDate}
                        openToDate={
                          incorporationDate
                            ? incorporationDate
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
                          changeIncorporationDate(date);
                        }}
                        required
                        errorMessage={t("birthDate_error")}
                      />
                    ) : (
                      <DateInput
                        isSmall={false}
                        placeholder={t("Incorporation Date")}
                        value={incorporationDate}
                        maxDate={new Date()}
                        onChange={(date) => {
                          changeIncorporationDate(date);
                        }}
                        required
                        errorMessage={t("incorporationDate_error")}
                      />
                    )}
                    {is_startup_Individual ? (
                      <>
                        <Input
                          type="text"
                          placeholder={t(
                            "Problem solved / Market gap addressed"
                          )}
                          value={problemSolved}
                          onChange={(e) => changeProblemSolved(e.target.value)}
                        ></Input>
                        <Input
                          type="text"
                          placeholder={t("HQ")}
                          value={HQ}
                          onChange={(e) => changeHQ(e.target.value)}
                        ></Input>
                      </>
                    ) : null}
                  </Col>
                ) : is_mentor_judge ? (
                  <Col>
                    <Input
                      type="text"
                      placeholder={t("Full Name as Per Passport")}
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                      required
                      errorMessage={t("name_error")}
                    ></Input>
                    <FileInput
                      placeholder={t("Personal Photo")}
                      value={personal_photo}
                      onChange={(e) => {
                        changePersonalPhoto(e.target.files[0]);
                      }}
                      required
                      errorMessage={t("personal_photo_error")}
                      buttonText="Upload"
                      acceptTypes="image/*"
                      maxMB={10}
                      aspectRatio={1 / 1}
                      onCropDone={(file) => {
                        changePersonalPhoto(file);
                      }}
                    ></FileInput>
                    <Input
                      type="text"
                      placeholder={t("Current position, company (optional)")}
                      value={current_position_company}
                      onChange={(e) => changeCurrentPosition(e.target.value)}
                    ></Input>
                    {/* <Input
                      type="text"
                      placeholder={t("Website of Linkedin")}
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
                    ></Input> */}
                    {/* <Input
                      type="text"
                      placeholder={t("Location")}
                      value={location}
                      onChange={(e) => changeLocation(e.target.value)}
                      required
                      errorMessage={t("location_error")}
                    ></Input> */}
                    {/* <DateInput
                      isSmall={false}
                      placeholder={t("Date of Birth")}
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
                    /> */}
                    <DropDown
                      isSmall={false}
                      placeholder={t("Areas of expertise")}
                      options={[]}
                      value={providedExpertise}
                      onChange={(val) => {
                        setProvidedExpertise(val);
                      }}
                    />
                    <DropDown
                      isSmall={false}
                      placeholder={t("Technology Expertise")}
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
                    <TextArea
                      rows="12"
                      placeholder={t("mentor_sumary")}
                      value={textAreaValue}
                      onChange={(e) => {
                        setTextAreaValue(e.target.value);
                      }}
                      showCount={1000}
                    />
                  </Col>
                ) : null}
              </Row>
            </div>
            <Row className="button-container">
              <Col>
                <IconButton
                  text={
                    is_mentor_judge
                      ? t("Create My Account")
                      : t("Next_Business_Tags")
                  }
                  type="submit"
                ></IconButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {(updateDetailsReducer.loading ||
        signinReducer.loading ||
        updateBusinessTagsReducer.loading ||
        updateProfileReducer.loading) && <Loading />}
    </MainContainer>
  );
};

export default OrganizationDetails;

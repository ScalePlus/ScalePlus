import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateDetailsAction } from "./action";

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
} from "../common";
import { Constants } from "../../lib/constant";

const OrganizationDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updateDetailsMethod = (data) => dispatch(updateDetailsAction(data));
  const updateDetailsReducer = useSelector((state) => {
    return state.updateDetailsReducer;
  });
  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const is_startup_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    is_mentor_judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

  const [roleSwitch, switchToggle] = useState(false);
  const [logo, changeLogo] = useState("");
  const [personal_photo, changePersonalPhoto] = useState("");
  const [name, changeName] = useState("");
  const [mobile, changeMobile] = useState("");
  const [website, changeWebsite] = useState("");
  const [location, changeLocation] = useState("");
  const [birthDate, changeBirthDate] = useState(null);
  const [incorporationDate, changeIncorporationDate] = useState(null);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const { userData } = signinReducer;
    if (userData && userData.details) {
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
        isStartUp: !roleSwitch,
        isIndividual: roleSwitch,
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
        formData["logo"] = personal_photo;
      } else {
        formData["personal_photo"] = personal_photo;
      }
      updateDetailsMethod(formData);
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
                    ? t("Initial Details")
                    : is_organisation
                    ? t("Organization Details")
                    : is_mentor_judge
                    ? t("Initial Details")
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
                  <div className={`startup-text ${!roleSwitch && "active"}`}>
                    <span>{t("Startup")}</span>
                  </div>
                  <div>
                    <Switch
                      checked={roleSwitch}
                      onChange={(e) => {
                        switchToggle(!roleSwitch);
                      }}
                      label=""
                    ></Switch>
                  </div>
                  <div className={`individual-text ${roleSwitch && "active"}`}>
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
                      placeholder={t("Organization Name")}
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                      required
                      errorMessage={t("name_error")}
                    ></Input>
                    <FileInput
                      placeholder={t("Logo")}
                      value={logo}
                      onChange={(e) => {
                        changeLogo(e.target.files[0]);
                      }}
                      required
                      errorMessage={t("logo_error")}
                      buttonText="Upload"
                    ></FileInput>
                    <Input
                      type="text"
                      placeholder={t("Website")}
                      value={website}
                      onChange={(e) => changeWebsite(e.target.value)}
                      isInvalid={
                        !website || (website && !website.match(Constants.isURL))
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
                    ></FileInput>
                    <Input
                      type="number"
                      placeholder={t("Mobile Number")}
                      value={mobile}
                      onChange={(e) => changeMobile(e.target.value)}
                      required
                      errorMessage={t("mobile_error")}
                    ></Input>
                    <Input
                      type="text"
                      placeholder={t("Website of Linkedin")}
                      value={website}
                      onChange={(e) => changeWebsite(e.target.value)}
                      isInvalid={
                        !website || (website && !website.match(Constants.isURL))
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
                    <DateInput
                      isSmall={false}
                      placeholder={t("Birth Date")}
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
                ) : null}
              </Row>
            </div>
            <Row className="button-container">
              <Col>
                <IconButton
                  text={t("Next_Business_Tags")}
                  type="submit"
                ></IconButton>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {(updateDetailsReducer.loading || signinReducer.loading) && <Loading />}
    </MainContainer>
  );
};

export default OrganizationDetails;

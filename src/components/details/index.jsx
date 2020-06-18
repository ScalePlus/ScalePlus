import React, { useState, useEffect } from "react";
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
                    ? "Initial Details"
                    : is_organisation
                    ? "Organization Details"
                    : is_mentor_judge
                    ? "Initial Details"
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
                    <span>Startup</span>
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
                    <span>Individual</span>
                  </div>
                </div>
              </Col>
            </Row>
          )}

          <Row className="description-container">
            <Col>
              <Description>
                You can always change these details later
              </Description>
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
                      placeholder="Organization Name"
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                      required
                      errorMessage={Constants.Errors.name}
                    ></Input>
                    <FileInput
                      placeholder="Logo"
                      value={logo}
                      onChange={(e) => {
                        changeLogo(e.target.files[0]);
                      }}
                      required
                      errorMessage={Constants.Errors.logo}
                      buttonText="Upload"
                    ></FileInput>
                    <Input
                      type="text"
                      placeholder="Website"
                      value={website}
                      onChange={(e) => changeWebsite(e.target.value)}
                      isInvalid={
                        !website || (website && !website.match(Constants.isURL))
                      }
                      errorMessage={
                        website
                          ? Constants.Errors.invalid_website
                          : Constants.Errors.website
                      }
                    ></Input>
                    <Input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => changeLocation(e.target.value)}
                      required
                      errorMessage={Constants.Errors.location}
                    ></Input>
                    <DateInput
                      isSmall={false}
                      placeholder="Incorporation Date"
                      value={incorporationDate}
                      maxDate={new Date()}
                      onChange={(date) => {
                        changeIncorporationDate(date);
                      }}
                      required
                      errorMessage={Constants.Errors.incorporationDate}
                    />
                  </Col>
                ) : is_mentor_judge ? (
                  <Col>
                    <Input
                      type="text"
                      placeholder="Full Name as Per Passport"
                      value={name}
                      onChange={(e) => changeName(e.target.value)}
                      required
                      errorMessage={Constants.Errors.name}
                    ></Input>
                    <FileInput
                      placeholder="Personal Photo"
                      value={personal_photo}
                      onChange={(e) => {
                        changePersonalPhoto(e.target.files[0]);
                      }}
                      required
                      errorMessage={Constants.Errors.personal_photo}
                      buttonText="Upload"
                    ></FileInput>
                    <Input
                      type="number"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => changeMobile(e.target.value)}
                      required
                      errorMessage={Constants.Errors.mobile}
                    ></Input>
                    <Input
                      type="text"
                      placeholder="Website of Linkedin"
                      value={website}
                      onChange={(e) => changeWebsite(e.target.value)}
                      isInvalid={
                        !website || (website && !website.match(Constants.isURL))
                      }
                      errorMessage={
                        website
                          ? Constants.Errors.invalid_website
                          : Constants.Errors.website
                      }
                    ></Input>
                    <Input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => changeLocation(e.target.value)}
                      required
                      errorMessage={Constants.Errors.location}
                    ></Input>
                    <DateInput
                      isSmall={false}
                      placeholder="Birth Date"
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
                      errorMessage={Constants.Errors.birthDate}
                    />
                  </Col>
                ) : null}
              </Row>
            </div>
            <Row className="button-container">
              <Col>
                <IconButton
                  text={"Next: Business Tags"}
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

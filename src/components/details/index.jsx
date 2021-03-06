import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateDetailsAction } from "./action";

import { MainContainer } from "./style";
import {
  Title,
  Description,
  Input,
  FileInput,
  DateInput,
  Switch,
  PrimaryButton,
  Loading,
} from "../common";
import { Constants } from "../../lib/constant";
const isURL = new RegExp(
  "https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}"
);

const OrganizationDetails = () => {
  const dispatch = useDispatch();
  const updateDetailsMethod = (data) => dispatch(updateDetailsAction(data));
  const updateDetailsReducer = useSelector((state) => {
    return state.updateDetailsReducer;
  });
  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const isStartUp_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    isOrganisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    isMentor_Judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

  const [roleSwitch, switchToggle] = useState(false);
  const [logo, changeLogo] = useState("");
  const [name, changeName] = useState("");
  const [mobile, changeMobile] = useState("");
  const [website, changeWebsite] = useState("");
  const [location, changeLocation] = useState("");
  const [birthDate, changeBirthDate] = useState(null);
  const [incorporationDate, changeIncorporationDate] = useState(null);

  useEffect(() => {
    const { userData } = signinReducer;
    if (userData && userData.details) {
      const {
        name,
        logo,
        mobile,
        website,
        locationData,
        birthDate,
        incorporationDate,
        isIndividual,
      } = userData.details;
      changeName(name);
      changeLogo(logo);
      changeMobile(mobile);
      changeWebsite(website);
      changeLocation(locationData);
      changeBirthDate(new Date(birthDate));
      changeIncorporationDate(new Date(incorporationDate));
      switchToggle(isIndividual);
    }
  }, [signinReducer]);

  useEffect(() => {
    const { error } = updateDetailsReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
  }, [updateDetailsReducer]);

  const onUpdateDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isStartUp_Individual || isOrganisation) {
      if (!name) {
        toast.error(Constants.Errors.name, { position: "bottom-right" });
      }
      if (!logo) {
        toast.error(Constants.Errors.logo, { position: "bottom-right" });
      }
      if (!website) {
        toast.error(Constants.Errors.website, { position: "bottom-right" });
      }
      if (website && !isURL.test(website)) {
        toast.error(Constants.Errors.invalid_website, {
          position: "bottom-right",
        });
      }
      if (!location) {
        toast.error(Constants.Errors.location, { position: "bottom-right" });
      }
      if (!incorporationDate) {
        toast.error(Constants.Errors.incorporationDate, {
          position: "bottom-right",
        });
      }
      if (
        name &&
        logo &&
        website &&
        isURL.test(website) &&
        location &&
        incorporationDate
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
    }
    if (isMentor_Judge) {
      if (!name) {
        toast.error(Constants.Errors.name, { position: "bottom-right" });
      }
      if (!mobile) {
        toast.error(Constants.Errors.mobile, { position: "bottom-right" });
      }
      if (!website) {
        toast.error(Constants.Errors.website, { position: "bottom-right" });
      }
      if (website && !isURL.test(website)) {
        toast.error(Constants.Errors.invalid_website, {
          position: "bottom-right",
        });
      }
      if (!location) {
        toast.error(Constants.Errors.location, { position: "bottom-right" });
      }
      if (!birthDate) {
        toast.error(Constants.Errors.birthDate, {
          position: "bottom-right",
        });
      }
      if (
        name &&
        mobile &&
        website &&
        isURL.test(website) &&
        location &&
        birthDate
      ) {
        updateDetailsMethod({
          name,
          mobile,
          website,
          locationData: location,
          birthDate,
        });
      }
    }
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title
                text={
                  isStartUp_Individual
                    ? "Startup Details"
                    : isOrganisation
                    ? "Organization Details"
                    : isMentor_Judge
                    ? "Judge / Mentor Details"
                    : ""
                }
              ></Title>
            </Col>
          </Row>

          {isStartUp_Individual && (
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
          <Form onSubmit={onUpdateDetails}>
            <Row className="form-container">
              {isStartUp_Individual || isOrganisation ? (
                <Col>
                  <Input
                    type="text"
                    placeholder="Organization Name"
                    value={name}
                    onChange={(e) => changeName(e.target.value)}
                  ></Input>
                  <FileInput
                    placeholder="Logo"
                    value={logo}
                    onChange={(e) => {
                      changeLogo(e.target.files[0]);
                    }}
                  ></FileInput>
                  <Input
                    type="text"
                    placeholder="Website"
                    value={website}
                    onChange={(e) => changeWebsite(e.target.value)}
                  ></Input>
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => changeLocation(e.target.value)}
                  ></Input>
                  <DateInput
                    placeholder="Incorporation Date"
                    value={incorporationDate}
                    maxDate={new Date()}
                    onChange={(date) => {
                      changeIncorporationDate(date);
                    }}
                  />
                </Col>
              ) : isMentor_Judge ? (
                <Col>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => changeName(e.target.value)}
                  ></Input>
                  <Input
                    type="number"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => changeMobile(e.target.value)}
                  ></Input>
                  <Input
                    type="text"
                    placeholder="Website of Linkedin"
                    value={website}
                    onChange={(e) => changeWebsite(e.target.value)}
                  ></Input>
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => changeLocation(e.target.value)}
                  ></Input>
                  <DateInput
                    placeholder="Birth Date"
                    value={birthDate}
                    openToDate={
                      birthDate
                        ? birthDate
                        : new Date().setFullYear(new Date().getFullYear() - 18)
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
                  />
                </Col>
              ) : null}
            </Row>

            <Row className="button-container">
              <Col>
                <PrimaryButton
                  text={"Business Tags"}
                  type="submit"
                ></PrimaryButton>
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

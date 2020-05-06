import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import {
  Title,
  Description,
  Input,
  FileInput,
  Switch,
  PrimaryButton,
} from "../common";
import { Constants } from "../../lib/constant";

const OrganizationDetails = ({ history }) => {
  const [checkSwitch, switchToggle] = useState(false);
  const [selectedLogo, selectLogo] = useState();
  const isStartUp_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    isOrganisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    isMentor_Judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;
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
                  <div className={`startup-text ${!checkSwitch && "active"}`}>
                    <span>Startup</span>
                  </div>
                  <div>
                    <Switch
                      checked={checkSwitch}
                      onChange={(e) => {
                        switchToggle(!checkSwitch);
                      }}
                    ></Switch>
                  </div>
                  <div className={`individual-text ${checkSwitch && "active"}`}>
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

          <Row className="form-container">
            <Col>
              {isStartUp_Individual || isOrganisation ? (
                <Form>
                  <Input type="text" placeholder="Organization Name"></Input>
                  <FileInput
                    placeholder="Logo"
                    value={selectedLogo}
                    onChange={(e) => {
                      selectLogo(e.target.files[0]);
                    }}
                  ></FileInput>
                  <Input type="text" placeholder="Website"></Input>
                  <Input type="text" placeholder="Location"></Input>
                  <Input type="text" placeholder="Incorporation Date"></Input>
                </Form>
              ) : isMentor_Judge ? (
                <Form>
                  <Input type="text" placeholder="Full Name"></Input>
                  <Input type="number" placeholder="Mobile Number"></Input>
                  <Input type="text" placeholder="Website of Linkedin"></Input>
                  <Input type="text" placeholder="Location"></Input>
                  <Input type="text" placeholder="Birth Date"></Input>
                </Form>
              ) : (
                ""
              )}
            </Col>
          </Row>

          <Row className="button-container">
            <Col>
              <PrimaryButton
                text={"Business Tags"}
                onClick={() => {
                  history.push("/business/tags");
                }}
              ></PrimaryButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default OrganizationDetails;

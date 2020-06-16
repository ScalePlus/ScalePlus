import React, { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateEssentialDetailsAction, preserveDataAction } from "./action";

import { MainContainer } from "./style";
import {
  Title,
  TextArea,
  IconButton,
  BackButton,
  Tab,
  Loading,
} from "../common";
import { Constants } from "../../lib/constant";
const coreBusinessTabs = ["Software", "Physical Products", "Consulting"],
  marketStageTabs = [
    "Idea",
    "Prototype",
    "Ready For Market",
    "Product Released",
  ],
  fundingTabs = ["Consulting", "Ext. Investment", "Revenue"];

const EssentialDetail = ({ history }) => {
  const dispatch = useDispatch();
  const updateEssentialDetailsMethod = (data) =>
    dispatch(updateEssentialDetailsAction(data));
  const preserveDataMethod = (data) => dispatch(preserveDataAction(data));

  const updateEssentialDetailsReducer = useSelector((state) => {
    return state.updateEssentialDetailsReducer;
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
  const [textAreaValue, setTextAreaValue] = useState("");
  const [coreBusiness, selectCoreBusiness] = useState("");
  const [marketStage, selectMarketStage] = useState("");
  const [funding, selectFunding] = useState("");
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const { userData } = signinReducer;
    if (userData && userData.essentialDetails) {
      const {
        companyDesciption,
        summary,
        coreBusiness,
        marketStage,
        expertise,
        funding,
      } = userData.essentialDetails;
      if ((is_startup_Individual || is_organisation) && companyDesciption) {
        setTextAreaValue(companyDesciption);
      }
      if (is_mentor_judge && summary) {
        setTextAreaValue(summary);
      }
      if (coreBusiness) {
        selectCoreBusiness(coreBusiness);
      }

      if ((is_startup_Individual || is_organisation) && funding) {
        selectFunding(funding);
      }

      if ((is_startup_Individual || is_organisation) && marketStage) {
        selectMarketStage(marketStage);
      }

      if (is_mentor_judge && expertise) {
        selectMarketStage(expertise);
      }
    }
  }, [signinReducer, is_startup_Individual, is_organisation, is_mentor_judge]);

  useEffect(() => {
    const { error } = updateEssentialDetailsReducer;
    let errors = [];
    if (Array.isArray(error)) {
      errors = error;
    } else if (typeof error === "string") {
      errors.push(error);
    }
    setErrors(errors);
  }, [updateEssentialDetailsReducer]);

  const onUpdateEssentialDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (
      (is_startup_Individual || is_organisation) &&
      form.checkValidity() &&
      textAreaValue &&
      coreBusiness &&
      marketStage &&
      funding
    ) {
      updateEssentialDetailsMethod({
        companyDesciption: textAreaValue,
        coreBusiness,
        marketStage,
        funding,
      });
    }

    if (
      is_mentor_judge &&
      form.checkValidity() &&
      textAreaValue &&
      coreBusiness &&
      marketStage
    ) {
      updateEssentialDetailsMethod({
        summary: textAreaValue,
        coreBusiness,
        expertise: marketStage,
      });
    }

    setValidated(true);
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Essential Detail"} icon={true}></Title>
            </Col>
          </Row>

          <Form
            noValidate
            validated={validated}
            onSubmit={onUpdateEssentialDetails}
            className="form-container"
          >
            {errors && errors.length ? (
              <Alert variant={"danger"} className="text-left">
                {errors.map((each, index) => {
                  return <div key={index}>{each}</div>;
                })}
              </Alert>
            ) : null}
            <Row>
              <Col>
                <TextArea
                  rows="12"
                  placeholder={
                    is_startup_Individual || is_organisation
                      ? "Company Description"
                      : is_mentor_judge
                      ? "Summary"
                      : ""
                  }
                  value={textAreaValue}
                  onChange={(e) => {
                    setTextAreaValue(e.target.value);
                  }}
                  showCount={1000}
                  required
                  errorMessage={
                    is_startup_Individual || is_organisation
                      ? Constants.Errors.companyDesciption
                      : Constants.Errors.summary
                  }
                />
              </Col>
            </Row>

            <Row className="tab-title">
              <Col>
                <span>Core Business</span>
              </Col>
            </Row>
            <Row className="tab-container">
              {coreBusinessTabs.map((each, index) => {
                return (
                  <Col
                    key={index}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    onClick={() => {
                      selectCoreBusiness(each);
                    }}
                  >
                    <Tab text={each} isActive={each === coreBusiness} />
                  </Col>
                );
              })}
              <Col md={12}>
                {!coreBusiness && (
                  <Form.Text
                    className="invalid-text"
                    style={{ marginTop: -10, marginBottom: 15 }}
                  >
                    {Constants.Errors.coreBusiness}
                  </Form.Text>
                )}
              </Col>
            </Row>

            <Row className="tab-title">
              <Col>
                <span>
                  {is_startup_Individual || is_organisation
                    ? "Market Stage"
                    : is_mentor_judge
                    ? "Expertise"
                    : ""}
                </span>
              </Col>
            </Row>
            <Row className="tab-container">
              {marketStageTabs.map((each, index) => {
                return (
                  <Col
                    key={index}
                    lg={3}
                    md={6}
                    sm={6}
                    xs={12}
                    onClick={() => {
                      selectMarketStage(each);
                    }}
                  >
                    <Tab text={each} isActive={each === marketStage} />
                  </Col>
                );
              })}
              <Col md={12}>
                {!marketStage && (
                  <Form.Text
                    className="invalid-text"
                    style={{ marginTop: -10, marginBottom: 15 }}
                  >
                    {is_mentor_judge
                      ? Constants.Errors.expertise
                      : Constants.Errors.marketStage}
                  </Form.Text>
                )}
              </Col>
            </Row>

            {is_startup_Individual || is_organisation ? (
              <>
                <Row className="tab-title">
                  <Col>
                    <span>Funding</span>
                  </Col>
                </Row>
                <Row className="tab-container">
                  {fundingTabs.map((each, index) => {
                    return (
                      <Col
                        key={index}
                        lg={4}
                        md={6}
                        sm={6}
                        xs={12}
                        onClick={() => {
                          selectFunding(each);
                        }}
                      >
                        <Tab text={each} isActive={each === funding} />
                      </Col>
                    );
                  })}
                  <Col md={12}>
                    {!funding && (
                      <Form.Text
                        className="invalid-text"
                        style={{ marginTop: -10, marginBottom: 15 }}
                      >
                        {Constants.Errors.funding}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
              </>
            ) : null}

            <Row>
              <Col>
                <div className="button-container">
                  <BackButton
                    text={"Back"}
                    onClick={() => {
                      if (is_startup_Individual || is_organisation) {
                        if (
                          textAreaValue &&
                          coreBusiness &&
                          marketStage &&
                          funding
                        ) {
                          preserveDataMethod({
                            companyDesciption: textAreaValue,
                            coreBusiness,
                            marketStage,
                            funding,
                          });
                        }
                      }

                      if (is_mentor_judge) {
                        preserveDataMethod({
                          summary: textAreaValue,
                          coreBusiness,
                          expertise: marketStage,
                        });
                      }

                      history.goBack();
                    }}
                  ></BackButton>
                  <IconButton
                    text={
                      is_startup_Individual
                        ? "Add Members"
                        : is_organisation
                        ? "Create My Account"
                        : is_mentor_judge
                        ? "Join"
                        : ""
                    }
                    type="submit"
                  ></IconButton>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {(updateEssentialDetailsReducer.loading || signinReducer.loading) && (
        <Loading />
      )}
    </MainContainer>
  );
};

export default EssentialDetail;

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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

const EssentialDetail = ({ history }) => {
  const { t } = useTranslation();
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

  const coreBusinessTabs = [
      { label: t("Software"), value: "Software" },
      { label: t("Physical Products"), value: "Physical Products" },
      { label: t("Consulting"), value: "Consulting" },
    ],
    marketStageTabs = [
      { label: t("Idea"), value: "Idea" },
      { label: t("Prototype"), value: "Prototype" },
      { label: t("Ready For Market"), value: "Ready For Market" },
      { label: t("Product Released"), value: "Product Released" },
    ],
    fundingTabs = [
      { label: t("Consulting"), value: "Consulting" },
      { label: t("Ext_Investment"), value: "Ext. Investment" },
      { label: t("Revenue"), value: "Revenue" },
    ];
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
              <Title text={t("Essential Detail")} icon={true}></Title>
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
                      ? t("Company Description")
                      : is_mentor_judge
                      ? t("Summary")
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
                      ? t("companyDesciption_error")
                      : t("summary_error")
                  }
                />
              </Col>
            </Row>

            <Row className="tab-title">
              <Col>
                <span>{t("Core Business")}</span>
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
                      selectCoreBusiness(each.value);
                    }}
                  >
                    <Tab
                      text={each.label}
                      isActive={each.value === coreBusiness}
                    />
                  </Col>
                );
              })}
              <Col md={12}>
                {!coreBusiness && (
                  <Form.Text
                    className="invalid-text"
                    style={{ marginTop: -10, marginBottom: 15 }}
                  >
                    {t("coreBusiness_error")}
                  </Form.Text>
                )}
              </Col>
            </Row>

            <Row className="tab-title">
              <Col>
                <span>
                  {is_startup_Individual || is_organisation
                    ? t("Market Stage")
                    : is_mentor_judge
                    ? t("Expertise")
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
                      selectMarketStage(each.value);
                    }}
                  >
                    <Tab
                      text={each.label}
                      isActive={each.value === marketStage}
                    />
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
                      ? t("expertise_error")
                      : t("marketStage_error")}
                  </Form.Text>
                )}
              </Col>
            </Row>

            {is_startup_Individual || is_organisation ? (
              <>
                <Row className="tab-title">
                  <Col>
                    <span>{t("Funding")}</span>
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
                          selectFunding(each.value);
                        }}
                      >
                        <Tab
                          text={each.label}
                          isActive={each.value === funding}
                        />
                      </Col>
                    );
                  })}
                  <Col md={12}>
                    {!funding && (
                      <Form.Text
                        className="invalid-text"
                        style={{ marginTop: -10, marginBottom: 15 }}
                      >
                        {t("funding_error")}
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
                    text={t("Back")}
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
                        ? t("Add Members")
                        : is_organisation
                        ? t("Create My Account")
                        : is_mentor_judge
                        ? t("Join")
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

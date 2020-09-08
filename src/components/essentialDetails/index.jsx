import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEssentialDetailsAction,
  preserveDataAction,
  coreBusinessOptionsAction,
  marketStagesOptionsAction,
  expertisesOptionsAction,
  fundingsOptionsAction,
} from "./action";

import { MainContainer } from "./style";
import {
  Title,
  TextArea,
  IconButton,
  BackButton,
  // Tab,
  Loading,
  DropDown,
} from "../common";
import { Constants } from "../../lib/constant";

const EssentialDetail = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updateEssentialDetailsMethod = (data) =>
    dispatch(updateEssentialDetailsAction(data));
  const preserveDataMethod = (data) => dispatch(preserveDataAction(data));
  const coreBusinessOptionsMethod = useCallback(
    () => dispatch(coreBusinessOptionsAction()),
    [dispatch]
  );
  const marketStagesOptionsMethod = useCallback(
    () => dispatch(marketStagesOptionsAction()),
    [dispatch]
  );
  const expertisesOptionsMethod = useCallback(
    () => dispatch(expertisesOptionsAction()),
    [dispatch]
  );
  const fundingsOptionsMethod = useCallback(
    () => dispatch(fundingsOptionsAction()),
    [dispatch]
  );

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
  const [coreBusiness, selectCoreBusiness] = useState([]);
  const [marketStage, selectMarketStage] = useState([]);
  const [expertise, selectExpertise] = useState([]);
  const [funding, selectFunding] = useState([]);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const {
    coreBusinessOptions,
    marketStagesOptions,
    expertisesOptions,
    fundingsOptions,
  } = updateEssentialDetailsReducer;

  useEffect(() => {
    coreBusinessOptionsMethod();
    marketStagesOptionsMethod();
    expertisesOptionsMethod();
    fundingsOptionsMethod();
  }, [
    coreBusinessOptionsMethod,
    marketStagesOptionsMethod,
    expertisesOptionsMethod,
    fundingsOptionsMethod,
  ]);

  useEffect(() => {
    const { userData } = signinReducer;
    if (userData && userData.essentialDetails) {
      let {
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
      if (coreBusiness && coreBusiness.length) {
        coreBusiness = coreBusiness.filter((each) => each._id && each.name);
        selectCoreBusiness(
          coreBusiness.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
        // if (Array.isArray(coreBusiness)) {
        //   selectCoreBusiness(
        //     coreBusiness.map((each) => {
        //       const record = coreBusinessTabs.find(
        //         (record) => each === record.value
        //       );
        //       return record;
        //     })
        //   );
        // } else {
        //   selectCoreBusiness([
        //     coreBusinessTabs.find((record) => coreBusiness === record.value),
        //   ]);
        // }
      }

      if (
        (is_startup_Individual || is_organisation) &&
        funding &&
        funding.length
      ) {
        funding = funding.filter((each) => each._id && each.name);
        selectFunding(
          funding.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
        // if (Array.isArray(funding)) {
        //   selectFunding(
        //     funding.map((each) => {
        //       const record = fundingTabs.find(
        //         (record) => each === record.value
        //       );
        //       return record;
        //     })
        //   );
        // } else {
        //   selectFunding([
        //     fundingTabs.find((record) => funding === record.value),
        //   ]);
        // }
      }

      if (
        (is_startup_Individual || is_organisation) &&
        marketStage &&
        marketStage.length
      ) {
        marketStage = marketStage.filter((each) => each._id && each.name);
        selectMarketStage(
          marketStage.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
        // if (Array.isArray(marketStage)) {
        //   selectMarketStage(
        //     marketStage.map((each) => {
        //       const record = marketStageTabs.find(
        //         (record) => each === record.value
        //       );
        //       return record;
        //     })
        //   );
        // } else {
        //   selectMarketStage([
        //     marketStageTabs.find((record) => marketStage === record.value),
        //   ]);
        // }
      }

      if (is_mentor_judge && expertise && expertise.length) {
        expertise = expertise.filter((each) => each._id && each.name);
        selectExpertise(
          expertise.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
        // if (Array.isArray(expertise)) {
        //   selectExpertise(
        //     expertise.map((each) => {
        //       const record = marketStageTabs.find(
        //         (record) => each === record.value
        //       );
        //       return record;
        //     })
        //   );
        // } else {
        //   selectExpertise([
        //     marketStageTabs.find((record) => expertise === record.value),
        //   ]);
        // }
      }
    }
  }, [
    signinReducer,
    is_startup_Individual,
    is_organisation,
    is_mentor_judge,
    // coreBusinessTabs,
    // fundingTabs,
    // marketStageTabs,
  ]);

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
      coreBusiness.length &&
      marketStage &&
      marketStage.length &&
      funding &&
      funding.length
    ) {
      updateEssentialDetailsMethod({
        companyDesciption: textAreaValue,
        coreBusiness: coreBusiness,
        marketStage: marketStage,
        funding: funding,
      });
    }

    if (
      is_mentor_judge &&
      form.checkValidity() &&
      textAreaValue &&
      coreBusiness &&
      coreBusiness.length &&
      expertise &&
      expertise.length
    ) {
      updateEssentialDetailsMethod({
        summary: textAreaValue,
        coreBusiness: coreBusiness,
        expertise: expertise,
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
            <Row>
              <Col>
                <DropDown
                  isSmall={false}
                  placeholder={t("Core Business")}
                  options={
                    coreBusinessOptions && coreBusinessOptions.length
                      ? coreBusinessOptions.map((each) => {
                          return { value: each._id, label: each.name };
                        })
                      : []
                  }
                  value={coreBusiness}
                  onChange={(val) => {
                    selectCoreBusiness(val);
                  }}
                  isInvalid={
                    validated &&
                    (!coreBusiness || (coreBusiness && !coreBusiness.length))
                  }
                  errorMessage={t("coreBusiness_error")}
                />
              </Col>
            </Row>
            {/* <Row className="tab-container">
              {coreBusinessTabs.map((each, index) => {
                return (
                  <Col
                    key={index}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    onClick={() => {
                      let newArray = [...coreBusiness];
                      if (newArray.indexOf(each.value) >= 0) {
                        newArray.splice(newArray.indexOf(each.value), 1);
                      } else {
                        newArray.push(each.value);
                      }
                      selectCoreBusiness(newArray);
                    }}
                  >
                    <Tab
                      text={each.label}
                      isActive={
                        coreBusiness.indexOf(each.value) >= 0 ? true : false
                      }
                    />
                  </Col>
                );
              })}
              <Col md={12}>
                {!coreBusiness || (coreBusiness && !coreBusiness.length) ? (
                  <Form.Text
                    className="invalid-text"
                    style={{ marginTop: -10, marginBottom: 15 }}
                  >
                    {t("coreBusiness_error")}
                  </Form.Text>
                ) : null}
              </Col>
            </Row> */}

            {is_startup_Individual || is_organisation ? (
              <Row className="tab-title">
                <Col>
                  <span>{t("Market Stage")}</span>
                </Col>
              </Row>
            ) : is_mentor_judge ? (
              <Row className="tab-title">
                <Col>
                  <span>{t("Expertise")}</span>
                </Col>
              </Row>
            ) : null}

            {is_startup_Individual || is_organisation ? (
              <Row>
                <Col>
                  <DropDown
                    isSmall={false}
                    placeholder={t("Market Stage")}
                    options={
                      marketStagesOptions && marketStagesOptions.length
                        ? marketStagesOptions.map((each) => {
                            return { value: each._id, label: each.name };
                          })
                        : []
                    }
                    value={marketStage}
                    onChange={(val) => {
                      selectMarketStage(val);
                    }}
                    isInvalid={
                      validated &&
                      (!marketStage || (marketStage && !marketStage.length))
                    }
                    errorMessage={t("marketStage_error")}
                  />
                </Col>
              </Row>
            ) : is_mentor_judge ? (
              <Row>
                <Col>
                  <DropDown
                    isSmall={false}
                    placeholder={t("Expertise")}
                    options={
                      expertisesOptions && expertisesOptions.length
                        ? expertisesOptions.map((each) => {
                            return { value: each._id, label: each.name };
                          })
                        : []
                    }
                    value={expertise}
                    onChange={(val) => {
                      selectExpertise(val);
                    }}
                    isInvalid={
                      validated &&
                      (!expertise || (expertise && !expertise.length))
                    }
                    errorMessage={t("expertise_error")}
                  />
                </Col>
              </Row>
            ) : null}
            {/* <Row className="tab-container">
              {marketStageTabs.map((each, index) => {
                return (
                  <Col
                    key={index}
                    lg={3}
                    md={6}
                    sm={6}
                    xs={12}
                    onClick={() => {
                      let newArray = [...marketStage];
                      if (newArray.indexOf(each.value) >= 0) {
                        newArray.splice(newArray.indexOf(each.value), 1);
                      } else {
                        newArray.push(each.value);
                      }
                      selectMarketStage(newArray);
                    }}
                  >
                    <Tab
                      text={each.label}
                      isActive={
                        marketStage.indexOf(each.value) >= 0 ? true : false
                      }
                    />
                  </Col>
                );
              })}
              <Col md={12}>
                {!marketStage || (marketStage && !marketStage.length) ? (
                  <Form.Text
                    className="invalid-text"
                    style={{ marginTop: -10, marginBottom: 15 }}
                  >
                    {is_mentor_judge
                      ? t("expertise_error")
                      : t("marketStage_error")}
                  </Form.Text>
                ) : null}
              </Col>
            </Row> */}

            {is_startup_Individual || is_organisation ? (
              <>
                <Row className="tab-title">
                  <Col>
                    <span>{t("Funding")}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <DropDown
                      isSmall={false}
                      placeholder={t("Funding")}
                      options={
                        fundingsOptions && fundingsOptions.length
                          ? fundingsOptions.map((each) => {
                              return { value: each._id, label: each.name };
                            })
                          : []
                      }
                      value={funding}
                      onChange={(val) => {
                        selectFunding(val);
                      }}
                      isInvalid={
                        validated && (!funding || (funding && !funding.length))
                      }
                      errorMessage={t("funding_error")}
                    />
                  </Col>
                </Row>
                {/* <Row className="tab-container">
                  {fundingTabs.map((each, index) => {
                    return (
                      <Col
                        key={index}
                        lg={4}
                        md={6}
                        sm={6}
                        xs={12}
                        onClick={() => {
                          let newArray = [...funding];
                          if (newArray.indexOf(each.value) >= 0) {
                            newArray.splice(newArray.indexOf(each.value), 1);
                          } else {
                            newArray.push(each.value);
                          }
                          selectFunding(newArray);
                        }}
                      >
                        <Tab
                          text={each.label}
                          isActive={
                            funding.indexOf(each.value) >= 0 ? true : false
                          }
                        />
                      </Col>
                    );
                  })}
                  <Col md={12}>
                    {!funding || (funding && !funding.length) ? (
                      <Form.Text
                        className="invalid-text"
                        style={{ marginTop: -10, marginBottom: 15 }}
                      >
                        {t("funding_error")}
                      </Form.Text>
                    ) : null}
                  </Col>
                </Row> */}
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
                            coreBusiness: coreBusiness.map(
                              (each) => each.value
                            ),
                            marketStage: marketStage,
                            funding: funding,
                          });
                        }
                      }

                      if (is_mentor_judge) {
                        preserveDataMethod({
                          summary: textAreaValue,
                          coreBusiness: coreBusiness,
                          expertise: expertise,
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

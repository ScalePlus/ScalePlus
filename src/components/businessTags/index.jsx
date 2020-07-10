import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBusinessTagsAction,
  industriesOptionsAction,
  servicesOptionsAction,
  technologiesOptionsAction,
  businessModelsOptionsAction,
  targetMarketsOptionsAction,
  geographicalMarketsOptionsAction,
  preserveDataAction,
} from "./action";

import { MainContainer } from "./style";
import {
  Title,
  Description,
  DropDown,
  IconButton,
  BackButton,
  Loading,
} from "../common";

const BusinessTags = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updateBusinessTagsActionMethod = (data) =>
    dispatch(updateBusinessTagsAction(data));
  const preserveDataMethod = (data) => dispatch(preserveDataAction(data));
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
  const updateBusinessTagsReducer = useSelector((state) => {
    return state.updateBusinessTagsReducer;
  });
  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });
  const [selectedIndustries, selectIndustry] = useState([]);
  const [selectedServices, selectService] = useState([]);
  const [selectedTechnologies, selectTechnology] = useState([]);
  const [selectedBusinessModels, selectBusinessModels] = useState([]);
  const [selectedTargetMarkets, selectTargetMarket] = useState([]);
  const [selectedGeographicalMarket, selectGeographicalMarket] = useState([]);
  const [errors, setErrors] = useState([]);
  const [validated, setValidated] = useState(false);
  const {
    industriesOptions,
    servicesOptions,
    technologiesOptions,
    businessModelsOptions,
    targetMarketsOptions,
    geographicalMarketsOptions,
  } = updateBusinessTagsReducer;

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
    if (userData && userData.businessTags) {
      let {
        industry,
        services,
        technology,
        businessModel,
        georgraphicalMarket,
        targetMarket,
      } = userData.businessTags;
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
  }, [signinReducer]);

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

  const onUpdateBusinessTags = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

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
      updateBusinessTagsActionMethod({
        industry: selectedIndustries,
        services: selectedServices,
        technology: selectedTechnologies,
        businessModel: selectedBusinessModels,
        targetMarket: selectedTargetMarkets,
        georgraphicalMarket: selectedGeographicalMarket,
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
              <Title text={t("Business Tags")} icon={true}></Title>
            </Col>
          </Row>
          <Form
            noValidate
            validated={validated}
            onSubmit={onUpdateBusinessTags}
          >
            <Row className="description-container">
              <Col>
                <Description>{t("Select_tag_text")}</Description>
              </Col>
            </Row>

            <div className="form-container">
              {errors && errors.length ? (
                <Alert variant={"danger"} className="text-left">
                  {errors.map((each, index) => {
                    return <div key={index}>{each}</div>;
                  })}
                </Alert>
              ) : null}

              <Row>
                <Col>
                  <DropDown
                    isSmall={false}
                    placeholder={t("Industry")}
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
                    isSmall={false}
                    placeholder={t("Sevices / products you offer")}
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
                    isSmall={false}
                    placeholder={t("Technology")}
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
                    isSmall={false}
                    placeholder={t("Business Model")}
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
                </Col>
              </Row>
            </div>
            <Row>
              <Col className="market-label">
                <span>{t("Market Details")}</span>
              </Col>
            </Row>

            <Row className="form-container">
              <Col>
                <DropDown
                  isSmall={false}
                  placeholder={t("Target Market")}
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
                  isSmall={false}
                  placeholder={t("Geographical Market")}
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

            <Row>
              <Col>
                <div className="button-container">
                  <BackButton
                    text={t("Back")}
                    onClick={() => {
                      preserveDataMethod({
                        industry:
                          selectedIndustries && selectedIndustries.length
                            ? selectedIndustries.map((each) => {
                                return {
                                  _id: each.value,
                                  name: each.label,
                                };
                              })
                            : [],
                        services:
                          selectedServices && selectedServices.length
                            ? selectedServices.map((each) => {
                                return {
                                  _id: each.value,
                                  name: each.label,
                                };
                              })
                            : null,
                        technology:
                          selectedTechnologies && selectedTechnologies.length
                            ? selectedTechnologies.map((each) => {
                                return {
                                  _id: each.value,
                                  name: each.label,
                                };
                              })
                            : [],
                        businessModel:
                          selectedBusinessModels &&
                          selectedBusinessModels.length
                            ? selectedBusinessModels.map((each) => {
                                return {
                                  _id: each.value,
                                  name: each.label,
                                };
                              })
                            : [],
                        targetMarket:
                          selectedTargetMarkets && selectedTargetMarkets.length
                            ? selectedTargetMarkets.map((each) => {
                                return {
                                  _id: each.value,
                                  name: each.label,
                                };
                              })
                            : [],
                        georgraphicalMarket:
                          selectedGeographicalMarket &&
                          selectedGeographicalMarket.length
                            ? selectedGeographicalMarket.map((each) => {
                                return {
                                  _id: each.value,
                                  name: each.label,
                                };
                              })
                            : [],
                      });
                      history.goBack();
                    }}
                  ></BackButton>
                  <IconButton
                    text={t("Next_Essential_Details")}
                    type="submit"
                  ></IconButton>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {(updateBusinessTagsReducer.loading || signinReducer.loading) && (
        <Loading />
      )}
    </MainContainer>
  );
};

export default BusinessTags;

import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
import { Constants } from "../../lib/constant";

const BusinessTags = ({ history }) => {
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
      const {
        industry,
        services,
        technology,
        businessModel,
        georgraphicalMarket,
        targetMarket,
      } = userData.businessTags;
      if (industry && industry.length) {
        selectIndustry(
          industry.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
      }
      if (services && services.length) {
        selectService(
          services.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
      }
      if (technology && technology.length) {
        selectTechnology(
          technology.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
      }
      if (businessModel && businessModel.length) {
        selectBusinessModels(
          businessModel.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
      }
      if (georgraphicalMarket && georgraphicalMarket.length) {
        selectGeographicalMarket(
          georgraphicalMarket.map((each) => {
            return { value: each._id, label: each.name };
          })
        );
      }
      if (targetMarket && targetMarket.length) {
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
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
  }, [updateBusinessTagsReducer]);

  const onUpdateBusinessTags = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      !selectedIndustries ||
      (selectedIndustries && !selectedIndustries.length)
    ) {
      toast.error(Constants.Errors.industry, { position: "bottom-right" });
    }
    if (!selectedServices || (selectedServices && !selectedServices.length)) {
      toast.error(Constants.Errors.service, { position: "bottom-right" });
    }
    if (
      !selectedTechnologies ||
      (selectedTechnologies && !selectedTechnologies.length)
    ) {
      toast.error(Constants.Errors.technology, { position: "bottom-right" });
    }
    if (
      !selectedBusinessModels ||
      (selectedBusinessModels && !selectedBusinessModels.length)
    ) {
      toast.error(Constants.Errors.businessModel, { position: "bottom-right" });
    }
    if (
      !selectedTargetMarkets ||
      (selectedTargetMarkets && !selectedTargetMarkets.length)
    ) {
      toast.error(Constants.Errors.targetMarket, { position: "bottom-right" });
    }
    if (
      !selectedGeographicalMarket ||
      (selectedGeographicalMarket && !selectedGeographicalMarket.length)
    ) {
      toast.error(Constants.Errors.georgraphicalMarket, {
        position: "bottom-right",
      });
    }
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
      selectedGeographicalMarket.length
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
  };

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Business Tags"}></Title>
            </Col>
          </Row>
          <Form onSubmit={onUpdateBusinessTags}>
            <Row className="description-container">
              <Col>
                <Description>
                  Select from the list below what fits your business
                </Description>
              </Col>
            </Row>

            <Row className="form-container">
              <Col>
                <DropDown
                  placeholder={"Industry"}
                  options={
                    industriesOptions &&
                    industriesOptions.length &&
                    industriesOptions.map((each) => {
                      return { value: each._id, label: each.name };
                    })
                  }
                  value={selectedIndustries}
                  onChange={(val) => {
                    selectIndustry(val);
                  }}
                />
                <DropDown
                  placeholder={"Sevices / products you offer"}
                  options={
                    servicesOptions &&
                    servicesOptions.length &&
                    servicesOptions.map((each) => {
                      return { value: each._id, label: each.name };
                    })
                  }
                  value={selectedServices}
                  onChange={(val) => {
                    selectService(val);
                  }}
                />
                <DropDown
                  placeholder={"Technology"}
                  options={
                    technologiesOptions &&
                    technologiesOptions.length &&
                    technologiesOptions.map((each) => {
                      return { value: each._id, label: each.name };
                    })
                  }
                  value={selectedTechnologies}
                  onChange={(val) => {
                    selectTechnology(val);
                  }}
                />
                <DropDown
                  placeholder={"Business Model"}
                  options={
                    businessModelsOptions &&
                    businessModelsOptions.length &&
                    businessModelsOptions.map((each) => {
                      return { value: each._id, label: each.name };
                    })
                  }
                  value={selectedBusinessModels}
                  onChange={(val) => {
                    selectBusinessModels(val);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col className="market-label">
                <span>Market Details</span>
              </Col>
            </Row>

            <Row className="form-container">
              <Col>
                <DropDown
                  placeholder={"Target Market"}
                  options={
                    targetMarketsOptions &&
                    targetMarketsOptions.length &&
                    targetMarketsOptions.map((each) => {
                      return { value: each._id, label: each.name };
                    })
                  }
                  value={selectedTargetMarkets}
                  onChange={(val) => {
                    selectTargetMarket(val);
                  }}
                />
                <DropDown
                  placeholder={"Geographical Market"}
                  options={
                    geographicalMarketsOptions &&
                    geographicalMarketsOptions.length &&
                    geographicalMarketsOptions.map((each) => {
                      return { value: each._id, label: each.name };
                    })
                  }
                  value={selectedGeographicalMarket}
                  onChange={(val) => {
                    selectGeographicalMarket(val);
                  }}
                />
              </Col>
            </Row>

            <Row className="button-container">
              <Col lg={2} md={2} sm={2} xs={2}>
                <BackButton
                  text={"Back"}
                  onClick={() => {
                    preserveDataMethod({
                      industry:
                        selectedIndustries && selectedIndustries.length
                          ? selectedIndustries.map((each) => {
                              return { _id: each.value, name: each.label };
                            })
                          : [],
                      services:
                        selectedServices && selectedServices.length
                          ? selectedServices.map((each) => {
                              return { _id: each.value, name: each.label };
                            })
                          : null,
                      technology:
                        selectedTechnologies && selectedTechnologies.length
                          ? selectedTechnologies.map((each) => {
                              return { _id: each.value, name: each.label };
                            })
                          : [],
                      businessModel:
                        selectedBusinessModels && selectedBusinessModels.length
                          ? selectedBusinessModels.map((each) => {
                              return { _id: each.value, name: each.label };
                            })
                          : [],
                      targetMarket:
                        selectedTargetMarkets && selectedTargetMarkets.length
                          ? selectedTargetMarkets.map((each) => {
                              return { _id: each.value, name: each.label };
                            })
                          : [],
                      georgraphicalMarket:
                        selectedGeographicalMarket &&
                        selectedGeographicalMarket.length
                          ? selectedGeographicalMarket.map((each) => {
                              return { _id: each.value, name: each.label };
                            })
                          : [],
                    });
                    history.goBack();
                  }}
                ></BackButton>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <IconButton
                  text={"Essential Details"}
                  type="submit"
                ></IconButton>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2} />
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

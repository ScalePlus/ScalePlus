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
} from "./action";
import { getLoggedInUserAction } from "../signin/action";
import { MainContainer } from "./style";
import {
  Title,
  Description,
  DropDown,
  PrimaryButton,
  BackButton,
} from "../common";

const BusinessTags = ({ history }) => {
  const dispatch = useDispatch();
  const updateBusinessTagsActionMethod = (data) =>
    dispatch(updateBusinessTagsAction(data));
  const getLoggedInUserMethod = useCallback(
    () => dispatch(getLoggedInUserAction()),
    [dispatch]
  );
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
    getLoggedInUserMethod();
  }, [getLoggedInUserMethod]);

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

  const onUpdateBusinessTags = () => {
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
      !updateBusinessTagsReducer.loading
    ) {
      updateBusinessTagsActionMethod({
        industry: selectedIndustries.map((each) => {
          if (each.__isNew__) {
            return each;
          }
          return each.value;
        }),
        services: selectedServices.map((each) => {
          if (each.__isNew__) {
            return each;
          }
          return each.value;
        }),
        technology: selectedTechnologies.map((each) => {
          if (each.__isNew__) {
            return each;
          }
          return each.value;
        }),
        businessModel: selectedBusinessModels.map((each) => {
          if (each.__isNew__) {
            return each;
          }
          return each.value;
        }),
        targetMarket: selectedTargetMarkets.map((each) => {
          if (each.__isNew__) {
            return each;
          }
          return each.value;
        }),
        georgraphicalMarket: selectedGeographicalMarket.map((each) => {
          if (each.__isNew__) {
            return each;
          }
          return each.value;
        }),
      });
    } else {
      toast.error("Something went wrong", { position: "bottom-right" });
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

          <Row className="description-container">
            <Col>
              <Description>
                Select from the list below what fits your business
              </Description>
            </Col>
          </Row>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdateBusinessTags();
            }}
          >
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
            <input type="submit" style={{ display: "none" }}></input>
          </Form>
          <Row className="button-container">
            <Col lg={2} md={2} sm={2} xs={2}>
              <BackButton
                text={"Back"}
                onClick={() => {
                  history.goBack();
                }}
              ></BackButton>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <PrimaryButton
                text={"Essential Details"}
                onClick={() => {
                  onUpdateBusinessTags();
                }}
                disabled={updateBusinessTagsReducer.loading}
              ></PrimaryButton>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2} />
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default BusinessTags;

import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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

  const isStartUp_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    isOrganisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    isMentor_Judge =
      localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;
  const [textAreaValue, setTextAreaValue] = useState("");
  const [coreBusiness, selectCoreBusiness] = useState(coreBusinessTabs[0]);
  const [marketStage, selectMarketStage] = useState(marketStageTabs[0]);
  const [funding, selectFunding] = useState(fundingTabs[0]);

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
      if ((isStartUp_Individual || isOrganisation) && companyDesciption) {
        setTextAreaValue(companyDesciption);
      }
      if (isMentor_Judge && summary) {
        setTextAreaValue(summary);
      }
      if (coreBusiness) {
        selectCoreBusiness(coreBusiness);
      }

      if ((isStartUp_Individual || isOrganisation) && funding) {
        selectFunding(funding);
      }

      if ((isStartUp_Individual || isOrganisation) && marketStage) {
        selectMarketStage(marketStage);
      }

      if (isMentor_Judge && expertise) {
        selectMarketStage(expertise);
      }
    }
  }, [signinReducer, isStartUp_Individual, isOrganisation, isMentor_Judge]);

  useEffect(() => {
    const { error } = updateEssentialDetailsReducer;
    if (Array.isArray(error)) {
      for (let i = 0; i < error.length; i++) {
        toast.error(error[i], { position: "bottom-right" });
      }
    } else if (typeof error === "string") {
      toast.error(error, { position: "bottom-right" });
    }
  }, [updateEssentialDetailsReducer]);

  const onUpdateEssentialDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isStartUp_Individual || isOrganisation) {
      if (!textAreaValue) {
        toast.error(Constants.Errors.companyDesciption, {
          position: "bottom-right",
        });
      }
      if (!coreBusiness) {
        toast.error(Constants.Errors.coreBusiness, {
          position: "bottom-right",
        });
      }
      if (!marketStage) {
        toast.error(Constants.Errors.marketStage, {
          position: "bottom-right",
        });
      }
      if (!funding) {
        toast.error(Constants.Errors.funding, {
          position: "bottom-right",
        });
      }
      if (textAreaValue && coreBusiness && marketStage && funding) {
        updateEssentialDetailsMethod({
          companyDesciption: textAreaValue,
          coreBusiness,
          marketStage,
          funding,
        });
      }
    }
    if (isMentor_Judge) {
      if (!textAreaValue) {
        toast.error(Constants.Errors.summary, {
          position: "bottom-right",
        });
      }
      if (!coreBusiness) {
        toast.error(Constants.Errors.coreBusiness, {
          position: "bottom-right",
        });
      }
      if (!marketStage) {
        toast.error(Constants.Errors.expertise, {
          position: "bottom-right",
        });
      }

      if (textAreaValue && coreBusiness && marketStage) {
        updateEssentialDetailsMethod({
          summary: textAreaValue,
          coreBusiness,
          expertise: marketStage,
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
              <Title text={"Essential Detail"}></Title>
            </Col>
          </Row>

          <Form onSubmit={onUpdateEssentialDetails}>
            <Row className="form-container">
              <Col>
                <TextArea
                  rows="12"
                  placeholder={
                    isStartUp_Individual || isOrganisation
                      ? "Company Description"
                      : isMentor_Judge
                      ? "Summary"
                      : ""
                  }
                  value={textAreaValue}
                  onChange={(e) => {
                    setTextAreaValue(e.target.value);
                  }}
                  showCount={1000}
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
                    <div
                      className={
                        each !== coreBusinessTabs[coreBusinessTabs.length - 1]
                          ? "outer-tab-container"
                          : ""
                      }
                    >
                      <Tab text={each} isActive={each === coreBusiness} />
                    </div>
                  </Col>
                );
              })}
            </Row>

            <Row className="tab-title">
              <Col>
                <span>
                  {isStartUp_Individual || isOrganisation
                    ? "Market Stage"
                    : isMentor_Judge
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
                    <div
                      className={
                        each !== marketStageTabs[marketStageTabs.length - 1]
                          ? "outer-tab-container"
                          : ""
                      }
                    >
                      <Tab text={each} isActive={each === marketStage} />
                    </div>
                  </Col>
                );
              })}
            </Row>

            {isStartUp_Individual || isOrganisation ? (
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
                        <div
                          className={
                            each !== fundingTabs[fundingTabs.length - 1]
                              ? "outer-tab-container"
                              : ""
                          }
                        >
                          <Tab text={each} isActive={each === funding} />
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </>
            ) : null}

            <Row className="button-container">
              <Col lg={2} md={2} sm={2} xs={2}>
                <BackButton
                  text={"Back"}
                  onClick={() => {
                    if (isStartUp_Individual || isOrganisation) {
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

                    if (isMentor_Judge) {
                      preserveDataMethod({
                        summary: textAreaValue,
                        coreBusiness,
                        expertise: marketStage,
                      });
                    }

                    history.goBack();
                  }}
                ></BackButton>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <IconButton
                  text={
                    isStartUp_Individual
                      ? "Add Members"
                      : isOrganisation
                      ? "Create My Account"
                      : isMentor_Judge
                      ? "Join"
                      : ""
                  }
                  type="submit"
                ></IconButton>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2} />
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

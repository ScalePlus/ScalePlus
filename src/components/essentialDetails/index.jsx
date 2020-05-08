import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateEssentialDetailsAction } from "./action";
import { getLoggedInUserAction } from "../signin/action";
import { MainContainer } from "./style";
import { Title, TextArea, PrimaryButton, BackButton, Tab } from "../common";
import { Constants } from "../../lib/constant";
const coreBusinessTabs = ["Software", "Physical Products", "Consulting"],
  marketStageTabs = ["Idea", "Prototype", "Ready For Market"],
  fundingTabs = ["Consulting", "Ext. Investment", "Revenue"];
const isStartUp_Individual =
    localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
  isOrganisation =
    localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
  isMentor_Judge =
    localStorage.getItem("userRole") === Constants.ROLES.MENTOR_JUDGE;

const EssentialDetail = ({ history }) => {
  const dispatch = useDispatch();
  const updateEssentialDetailsMethod = (data) =>
    dispatch(updateEssentialDetailsAction(data));
  const getLoggedInUserMethod = useCallback(
    () => dispatch(getLoggedInUserAction()),
    [dispatch]
  );
  const updateEssentialDetailsReducer = useSelector((state) => {
    return state.updateEssentialDetailsReducer;
  });
  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [coreBusiness, selectCoreBusiness] = useState(coreBusinessTabs[0]);
  const [marketStage, selectMarketStage] = useState(marketStageTabs[0]);
  const [funding, selectFunding] = useState(fundingTabs[0]);

  useEffect(() => {
    getLoggedInUserMethod();
  }, [getLoggedInUserMethod]);

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
  }, [signinReducer]);

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

  const onUpdateEssentialDetails = () => {
    if (
      (isStartUp_Individual || isOrganisation) &&
      textAreaValue &&
      coreBusiness &&
      marketStage &&
      funding &&
      !updateEssentialDetailsReducer.loading
    ) {
      updateEssentialDetailsMethod({
        companyDesciption: textAreaValue,
        coreBusiness,
        marketStage,
        funding,
      });
    } else if (
      isMentor_Judge &&
      textAreaValue &&
      coreBusiness &&
      marketStage &&
      !updateEssentialDetailsReducer.loading
    ) {
      updateEssentialDetailsMethod({
        summary: textAreaValue,
        coreBusiness,
        expertise: marketStage,
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
              <Title text={"Essential Detail"}></Title>
            </Col>
          </Row>

          <Row className="form-container">
            <Col>
              <Form>
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
                />
              </Form>
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
                  history.goBack();
                }}
              ></BackButton>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <PrimaryButton
                text={
                  isStartUp_Individual
                    ? "Add Members"
                    : isOrganisation
                    ? "Create My Account"
                    : isMentor_Judge
                    ? "Join"
                    : ""
                }
                disabled={updateEssentialDetailsReducer.loading}
                onClick={() => {
                  onUpdateEssentialDetails();
                }}
              ></PrimaryButton>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2} />
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default EssentialDetail;

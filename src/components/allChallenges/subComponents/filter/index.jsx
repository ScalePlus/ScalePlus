import React, { useState, useEffect, useCallback } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Input, Tab, PrimaryButton } from "../../../common";
import { getTimelineStateAction } from "../../../challengeEdit/subComponents/timeline/action";
import { challengeCategoriesListAction } from "../../../challengeMaster/action";
import { MainContainer } from "./style";
const orderByTabs = ["Newest", "Popular"];

const Filters = ({ t, show, setShow, onApply, onReset }) => {
  const dispatch = useDispatch();

  const getTimelineStateMethod = useCallback(
    () => dispatch(getTimelineStateAction()),
    [dispatch]
  );
  const challengeCategoriesListMethod = useCallback(
    () => dispatch(challengeCategoriesListAction()),
    [dispatch]
  );

  const challengeTimelineReducer = useSelector((state) => {
    return state.challengeTimelineReducer;
  });
  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [searchText, setSearchText] = useState("");
  const [stage, selectStage] = useState("");
  const [category, selectCategory] = useState("");
  const [orderby, selectOrder] = useState("");
  const [stageTabs, setStageTabs] = useState(null);
  const [categoryTabs, setCategoryTabs] = useState(null);

  useEffect(() => {
    getTimelineStateMethod();
  }, [getTimelineStateMethod]);

  useEffect(() => {
    challengeCategoriesListMethod();
  }, [challengeCategoriesListMethod]);

  useEffect(() => {
    const { timelineStatesSuccess } = challengeTimelineReducer;
    if (timelineStatesSuccess && timelineStatesSuccess.result) {
      if (timelineStatesSuccess.result.length) {
        setStageTabs(timelineStatesSuccess.result);
      } else {
        setStageTabs(null);
      }
    }
  }, [challengeTimelineReducer]);

  useEffect(() => {
    const { challengeCategories } = challengeReducer;
    if (challengeCategories && challengeCategories.length) {
      setCategoryTabs(challengeCategories);
    }
  }, [challengeReducer]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="filter-modal"
      centered
    >
      <Modal.Body>
        <Row className="justify-content-center">
          <Col lg={12} md={12} sm={12} xs={12}>
            <MainContainer>
              <Row>
                <Col>
                  <div className="header-container">
                    <div className="title-text">{t("Filter Challenges")}</div>
                    <div
                      className="close-button-container"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Col ld={6} md={6} sm={12} xs={12}>
                  <Input
                    type="text"
                    placeholder={t("Search by keyword or title")}
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  ></Input>
                </Col>
              </Row>
              <Row style={{ marginTop: 3 }}>
                <Col ld={12} md={12} sm={12} xs={12}>
                  <div className="tab-title-text">
                    <span>{t("Stage")}</span>
                  </div>
                  <div className="custom-tab-container">
                    {stageTabs && stageTabs.length
                      ? stageTabs.map((each, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                selectStage(each._id);
                              }}
                              className="custom-tab"
                            >
                              <Tab
                                text={each.name}
                                isActive={
                                  each._id.toString() === stage.toString()
                                }
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 3 }}>
                <Col ld={12} md={12} sm={12} xs={12}>
                  <div className="tab-title-text">
                    <span>{t("Category")}</span>
                  </div>
                  <div className="custom-tab-container">
                    {categoryTabs && categoryTabs.length
                      ? categoryTabs.map((each, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                selectCategory(each._id);
                              }}
                              className="custom-tab"
                            >
                              <Tab
                                text={each.name}
                                isActive={
                                  each._id.toString() === category.toString()
                                }
                              />
                            </div>
                          );
                        })
                      : null}
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 3 }}>
                <Col ld={12} md={12} sm={12} xs={12}>
                  <div className="tab-title-text">
                    <span>{t("Order by")}</span>
                  </div>
                  <div className="custom-tab-container">
                    {orderByTabs.map((each, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            selectOrder(each);
                          }}
                          className="custom-tab"
                        >
                          <Tab text={each} isActive={each === orderby} />
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Col>
                  <div className="bottom-button-container">
                    <PrimaryButton
                      variant="primary"
                      text={t("Apply Filter")}
                      onClick={() => {
                        onApply({ searchText, stage, category, orderby });
                      }}
                    ></PrimaryButton>

                    <PrimaryButton
                      variant="secondary"
                      text={t("Reset Filter")}
                      onClick={() => {
                        setSearchText("");
                        selectStage("");
                        selectCategory("");
                        selectOrder("");
                        onReset();
                      }}
                    ></PrimaryButton>
                  </div>
                </Col>
              </Row>
            </MainContainer>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(Filters);

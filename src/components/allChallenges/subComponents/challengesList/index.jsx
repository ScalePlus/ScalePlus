import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallengeAction } from "../../action";
import Filters from "../filter";
import { ChallengesListContainer } from "./style";
import { PrimaryButton, CardComponent, Loading } from "../../../common";

const ChallengesList = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getAllChallengeMethod = useCallback(
    (page, filters) => dispatch(getAllChallengeAction(page, filters)),
    [dispatch]
  );

  const allChallengesReducer = useSelector((state) => {
    return state.allChallengesReducer;
  });

  const [show, setShow] = useState(false);
  const [filterCount, setFilterCount] = useState(null);
  const [filters, setFilters] = useState({});
  const [allChallenges, setAllChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [loadedPage, setLoadedPage] = useState(
    allChallengesReducer && allChallengesReducer.loadedPage
      ? allChallengesReducer.loadedPage
      : 0
  );

  useEffect(() => {
    const { allChallenges, loadedPage } = allChallengesReducer;
    if (loadedPage) {
      setLoadedPage(loadedPage);
    }

    if (allChallenges && allChallenges.result && allChallenges.result.data) {
      setAllChallenges(allChallenges.result.data);
    }
  }, [allChallengesReducer]);

  useEffect(() => {
    if (page > loadedPage) {
      getAllChallengeMethod(page, filters);
    }
  }, [getAllChallengeMethod, page, loadedPage, filters]);

  const onApply = ({ searchText, stage, category, orderby }) => {
    let count = 0,
      filters = {};
    if (searchText) {
      count++;
      filters["searchText"] = searchText;
    }
    if (stage) {
      count++;
      filters["stage"] = stage;
    }
    if (category) {
      count++;
      filters["category"] = category;
    }
    if (orderby) {
      count++;
      filters["orderby"] = orderby;
    }
    setLoadedPage(0);
    setFilters(filters);
    setFilterCount(count);
    setShow(false);
    getAllChallengeMethod(1, filters);
  };

  const onReset = () => {
    setLoadedPage(0);
    setFilters({});
    setFilterCount(null);
    setShow(false);
    getAllChallengeMethod(1, filters);
  };

  return (
    <ChallengesListContainer>
      {allChallengesReducer.loading && <Loading />}

      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row style={{ marginTop: 45 }}>
            <Col>
              <div className="header-container">
                <span className="title-text">{t("Explore Challenges")}</span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="sub-header-container">
                <div className="text">
                  <span>{t("Explore_challenges_sub_text")}</span>
                </div>
                <div className="filter-container" onClick={() => setShow(true)}>
                  <div>
                    <img
                      src={"/images/filter-icon.png"}
                      height="20px"
                      width="20px"
                      alt=""
                    ></img>
                  </div>
                  <div className="filter-text">
                    <span>{t("Filters")}</span>
                  </div>
                  {filterCount ? (
                    <div className="filter-count">
                      <span className="count-text">{filterCount}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>

          {allChallenges && allChallenges.length ? (
            <Row style={{ marginTop: 25 }}>
              <Col>
                <div className="card-list">
                  <Row style={{ paddingRight: 0, paddingLeft: 0 }}>
                    {allChallenges.map((each, index) => {
                      return (
                        <Col
                          lg={4}
                          md={6}
                          sm={12}
                          xs={12}
                          key={index}
                          style={{
                            paddingRight: "15px",
                            paddingLeft: "15px",
                          }}
                          onClick={() => {
                            history.push(
                              `/challenge/${each._id}/preview/Overview`
                            );
                          }}
                        >
                          <CardComponent
                            t={t}
                            organisationId={each.organisationId}
                            descriptionId={each.descriptionId}
                            judgesId={each.judgesId}
                            participantsId={each.participantsId}
                            timelineId={each.timelineId}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              <Col lg={11} md={11} sm={11} xs={11}>
                <div className="no-data-text">
                  {t("No challenges to explore")}
                </div>
              </Col>
            </Row>
          )}

          {allChallengesReducer &&
            allChallengesReducer.allChallenges &&
            allChallengesReducer.allChallenges.result &&
            allChallengesReducer.allChallenges.result.havemore && (
              <Row style={{ marginTop: 30 }}>
                <Col>
                  <div className="bottom-button-container">
                    <PrimaryButton
                      variant="primary"
                      text={t("Load More Challenges")}
                      onClick={() => {
                        setPage((data) => parseInt(data, 10) + 1);
                      }}
                    ></PrimaryButton>
                  </div>
                </Col>
              </Row>
            )}
        </Col>
      </Row>
      <Filters
        t={t}
        show={show}
        setShow={setShow}
        onApply={onApply}
        onReset={onReset}
      />
    </ChallengesListContainer>
  );
};

export default React.memo(ChallengesList);

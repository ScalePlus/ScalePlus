import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallengeAction } from "../../action";
import Filters from "../filter";
import { ChallengesListContainer } from "./style";
import { PrimaryButton, CardComponent, Loading } from "../../../common";
import { Constants } from "../../../../lib/constant";

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

  const is_admin =
      localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
      localStorage.getItem("token"),
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token");
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
    setLoadedPage(0);
    setFilters({});
    setFilterCount(null);
    setShow(false);
    getAllChallengeMethod(1, {});
  }, [getAllChallengeMethod]);

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
    if (stage && stage.length) {
      count++;
      filters["stage"] = stage;
    }
    if (category && category.length) {
      count++;
      filters["category"] = category;
    }
    if (orderby && orderby.length) {
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
          {!is_admin && (
            <Row style={{ marginTop: 45 }}>
              <Col>
                <div className="header-container">
                  <span className="title-text">{t("Explore Challenges")}</span>
                </div>
              </Col>
            </Row>
          )}

          <Row style={{ marginTop: is_admin ? 45 : 0 }}>
            <Col>
              <div className="sub-header-container">
                {is_admin ? (
                  <div className="header-container">
                    <div className="title-text">{t("All Challenges")}</div>
                    <div className="circle-container">
                      <span className="count">{allChallenges.length}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text">
                    <span>{t("Explore_challenges_sub_text")}</span>
                  </div>
                )}
                <div
                  className="filter-button-container"
                  onClick={() => setShow(true)}
                >
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
            <div className="card-list" style={{ marginTop: 25 }}>
              <Row>
                {allChallenges.map((each, index) => {
                  return (
                    <Col
                      lg={4}
                      md={6}
                      sm={12}
                      xs={12}
                      key={index}
                      onClick={() => {
                        if (
                          each.organisationId &&
                          each.organisationId.status === Constants.STATUS.ACTIVE
                        ) {
                          history.push(
                            `/challenge/${each._id}/preview/Overview`
                          );
                        }
                      }}
                    >
                      <CardComponent
                        t={t}
                        organisationId={each.organisationId}
                        descriptionId={each.descriptionId}
                        judgesId={each.judgesId}
                        participantsId={each.participantsId}
                        timelineId={each.timelineId}
                        showProgress={is_admin}
                        applications={each.applications}
                        qualified={each.qualified}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          ) : (
            <Row className="justify-content-center">
              <Col lg={11} md={11} sm={11} xs={11}>
                <div className="no-data-text">
                  {t("No challenges to explore")}{" "}
                  {is_organisation ? (
                    <Link to="/create/challenge/1">
                      {t("create challenge")}
                    </Link>
                  ) : null}
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

import React, { useState, useEffect, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllChallengeAction } from "../../action";
import Filters from "../filter";
import { ChallengesListContainer } from "./style";
import { PrimaryButton, CardComponent, Loading } from "../../../common";

const ChallengesList = ({ history }) => {
  const dispatch = useDispatch();
  const getAllChallengeMethod = useCallback(
    (page) => dispatch(getAllChallengeAction(page)),
    [dispatch]
  );

  const allChallengesReducer = useSelector((state) => {
    return state.allChallengesReducer;
  });

  const [show, setShow] = useState(false);
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
      getAllChallengeMethod(page);
    }
  }, [getAllChallengeMethod, page, loadedPage]);

  return (
    <ChallengesListContainer>
      {allChallengesReducer.loading && <Loading />}
      {allChallenges && allChallenges.length ? (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <Row style={{ marginTop: 45 }}>
              <Col>
                <div className="header-container">
                  <span className="title-text">Explore Challenges</span>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="sub-header-container">
                  <div className="text">
                    <span>Find a challenge, solve it, make a difference</span>
                  </div>
                  <div
                    className="filter-container"
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
                      <span>Filters</span>
                    </div>
                    <div className="filter-count">
                      <span className="count-text">2</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

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
                            organisationId={each.organisationId}
                            descriptionId={each.descriptionId}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>
            </Row>
            {allChallengesReducer &&
              allChallengesReducer.allChallenges &&
              allChallengesReducer.allChallenges.result &&
              allChallengesReducer.allChallenges.result.havemore && (
                <Row style={{ marginTop: 30 }}>
                  <Col>
                    <div className="bottom-button-container">
                      <PrimaryButton
                        variant="primary"
                        text={"Load More Challenges"}
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
      ) : (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="no-data-text">No challenges to explore</div>
          </Col>
        </Row>
      )}
      <Filters show={show} setShow={setShow} />
    </ChallengesListContainer>
  );
};

export default React.memo(ChallengesList);

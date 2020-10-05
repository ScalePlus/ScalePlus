import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyChallengeAction } from "../action";
import { MainContainer } from "./style";

function StartupEcoSystem() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getMyChallengeMethod = useCallback(
    () => dispatch(getMyChallengeAction()),
    [dispatch]
  );

  const myChallengesReducer = useSelector((state) => {
    return state.myChallengesReducer;
  });

  const [currentStartUps, setCurrent] = useState([]);
  const [currentVisible, setCurrentVisible] = useState([]);
  const [previousStartUps, setPrevious] = useState([]);
  const [prevoiusVisible, setPreviousVisible] = useState([]);
  const [totalCurrentStartUpPage, setCurrentStartUpTotalPage] = useState(null);
  const [renderCurrentStartUpPage, setCurrentStartUpRenderPage] = useState(
    null
  );
  const [totalPreviousStartUpPage, setPreviousStartUpTotalPage] = useState(
    null
  );
  const [renderPreviousStartUpPage, setPreviousStartUpRenderPage] = useState(
    null
  );
  const limit = 10;

  useEffect(() => {
    getMyChallengeMethod();
  }, [getMyChallengeMethod]);

  useEffect(() => {
    if (
      myChallengesReducer?.myChallenges?.result &&
      myChallengesReducer?.myChallenges?.result.length
    ) {
      const { result } = myChallengesReducer?.myChallenges;

      let currentStartUps = [],
        previousStartUps = [];

      const currentPrograms = result.filter((each) => {
        return (
          !each.timelineId ||
          (each.timelineId && !each.timelineId.data) ||
          (each.timelineId &&
            each.timelineId.data &&
            !each.timelineId.data.length) ||
          (each.timelineId &&
            each.timelineId.data &&
            each.timelineId.data.length &&
            each.timelineId.data.find(
              (rec) =>
                rec.state.name === "Closing" &&
                new Date(rec.endDate) > new Date()
            ))
        );
      });

      currentPrograms.map((each) => {
        if (each?.participantsId?.data.length) {
          each.participantsId.data.map((rec) => {
            if (rec?.team && rec?.team.length) {
              rec.team.map((teamRec) => {
                if (
                  teamRec?.userId &&
                  !currentStartUps.find(
                    (e) => e._id.toString() === teamRec.userId._id.toString()
                  )
                ) {
                  currentStartUps.push(teamRec.userId);
                }
                return teamRec;
              });
            }
            return rec;
          });
        }
        if (each?.invited_participantsId?.data.length) {
          each.invited_participantsId.data.map((rec) => {
            if (
              rec?.userId &&
              !currentStartUps.find(
                (e) => e._id.toString() === rec.userId._id.toString()
              )
            ) {
              currentStartUps.push(rec.userId);
            }
            return rec;
          });
        }
        return each;
      });

      const previousPrograms = result.filter((each) => {
        return (
          !each.timelineId ||
          (each.timelineId && !each.timelineId.data) ||
          (each.timelineId &&
            each.timelineId.data &&
            !each.timelineId.data.length) ||
          (each.timelineId &&
            each.timelineId.data &&
            each.timelineId.data.length &&
            each.timelineId.data.find(
              (rec) =>
                rec.state.name === "Closing" &&
                new Date(rec.endDate) < new Date()
            ))
        );
      });

      previousPrograms.map((each) => {
        if (
          each?.participantsId &&
          each?.participantsId.data &&
          each?.participantsId.data.length
        ) {
          each.participantsId.data.map((rec) => {
            if (rec?.team && rec?.team.length) {
              rec.team.map((teamRec) => {
                if (
                  teamRec?.userId &&
                  !previousStartUps.find(
                    (e) => e._id.toString() === teamRec.userId._id.toString()
                  )
                ) {
                  previousStartUps.push(teamRec.userId);
                }
                return teamRec;
              });
            }
            return rec;
          });
        }
        if (
          each?.invited_participantsId &&
          each?.invited_participantsId.data &&
          each?.invited_participantsId.data.length
        ) {
          each.invited_participantsId.data.map((rec) => {
            if (
              rec?.userId &&
              !previousStartUps.find(
                (e) => e._id.toString() === rec.userId._id.toString()
              )
            ) {
              previousStartUps.push(rec.userId);
            }
            return rec;
          });
        }
        return each;
      });

      if (currentStartUps && currentStartUps.length) {
        setCurrentStartUpTotalPage(Math.ceil(currentStartUps.length / limit));
        setCurrentStartUpRenderPage(1);
      }

      if (previousStartUps && previousStartUps.length) {
        setPreviousStartUpTotalPage(Math.ceil(previousStartUps.length / limit));
        setPreviousStartUpRenderPage(1);
      }

      setCurrent(currentStartUps);
      setPrevious(previousStartUps);
    } else {
      setCurrent([]);
      setPrevious([]);
    }
  }, [myChallengesReducer]);

  useEffect(() => {
    if (currentStartUps && currentStartUps.length) {
      setCurrentVisible(
        currentStartUps.slice(
          (renderCurrentStartUpPage - 1) * limit,
          renderCurrentStartUpPage * limit
        )
      );
    }
  }, [currentStartUps, totalCurrentStartUpPage, renderCurrentStartUpPage]);

  useEffect(() => {
    if (previousStartUps && previousStartUps.length) {
      setPreviousVisible(
        previousStartUps.slice(
          (renderPreviousStartUpPage - 1) * limit,
          renderPreviousStartUpPage * limit
        )
      );
    }
  }, [previousStartUps, totalPreviousStartUpPage, renderPreviousStartUpPage]);

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12} style={{ padding: 0 }}>
              <div className="title-text">{t("Startup Ecosystem")}</div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="sub-title-text">{t("Current Programs")}</div>
              {currentVisible && currentVisible.length ? (
                <div className="list-container">
                  {currentVisible.map((each, index) => {
                    return (
                      <div className="block" key={index}>
                        <div className="avtar-container">
                          <img
                            src="/images/image.svg"
                            height={15}
                            width={15}
                            alt="person"
                          />
                        </div>
                        <div className="user-name">
                          {each.firstName} {each.lastName}
                        </div>
                      </div>
                    );
                  })}
                  <div className="pagination">
                    {renderCurrentStartUpPage > 1 && (
                      <span
                        className="first-page"
                        onClick={() => {
                          setCurrentStartUpRenderPage(1);
                        }}
                      >
                        {"<<"}
                      </span>
                    )}
                    {renderCurrentStartUpPage > 1 && (
                      <span
                        className="previous-page"
                        onClick={() => {
                          const previousPage = renderCurrentStartUpPage - 1;
                          if (previousPage >= 1) {
                            setCurrentStartUpRenderPage(previousPage);
                          }
                        }}
                      >
                        {"<"}
                      </span>
                    )}

                    <span>{renderCurrentStartUpPage}</span>
                    <span className="of-text">{t("of")}</span>
                    <span>{totalCurrentStartUpPage}</span>

                    {renderCurrentStartUpPage !== totalCurrentStartUpPage && (
                      <span
                        className="next-page"
                        onClick={() => {
                          const nextpage = renderCurrentStartUpPage + 1;
                          if (nextpage <= totalCurrentStartUpPage) {
                            setCurrentStartUpRenderPage(nextpage);
                          }
                        }}
                      >
                        {">"}
                      </span>
                    )}
                    {renderCurrentStartUpPage !== totalCurrentStartUpPage && (
                      <span
                        className="last-page"
                        onClick={() =>
                          setCurrentStartUpRenderPage(totalCurrentStartUpPage)
                        }
                      >
                        {">>"}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="sub-title-text">{t("Previous Programs")}</div>{" "}
              {prevoiusVisible && prevoiusVisible.length ? (
                <div className="list-container">
                  {prevoiusVisible.map((each, index) => {
                    return (
                      <div className="block" key={index}>
                        <div className="avtar-container">
                          <img
                            src="/images/image.svg"
                            height={15}
                            width={15}
                            alt="person"
                          />
                        </div>
                        <div className="user-name">
                          {each.firstName} {each.lastName}
                        </div>
                      </div>
                    );
                  })}
                  <div className="pagination">
                    {renderPreviousStartUpPage > 1 && (
                      <span
                        className="first-page"
                        onClick={() => {
                          setPreviousStartUpRenderPage(1);
                        }}
                      >
                        {"<<"}
                      </span>
                    )}
                    {renderPreviousStartUpPage > 1 && (
                      <span
                        className="previous-page"
                        onClick={() => {
                          const previousPage = renderPreviousStartUpPage - 1;
                          if (previousPage >= 1) {
                            setPreviousStartUpRenderPage(previousPage);
                          }
                        }}
                      >
                        {"<"}
                      </span>
                    )}

                    <span>{renderPreviousStartUpPage}</span>
                    <span className="of-text">{t("of")}</span>
                    <span>{totalPreviousStartUpPage}</span>

                    {renderPreviousStartUpPage !== totalPreviousStartUpPage && (
                      <span
                        className="next-page"
                        onClick={() => {
                          const nextpage = renderPreviousStartUpPage + 1;
                          if (nextpage <= totalPreviousStartUpPage) {
                            setPreviousStartUpRenderPage(nextpage);
                          }
                        }}
                      >
                        {">"}
                      </span>
                    )}
                    {renderPreviousStartUpPage !== totalPreviousStartUpPage && (
                      <span
                        className="last-page"
                        onClick={() =>
                          setPreviousStartUpRenderPage(totalPreviousStartUpPage)
                        }
                      >
                        {">>"}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default StartupEcoSystem;

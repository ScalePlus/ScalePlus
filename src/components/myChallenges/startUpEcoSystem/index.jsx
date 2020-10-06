import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyChallengeAction } from "../action";
import { MainContainer } from "./style";
import { Pagination } from "../../common";

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
            {(currentVisible && currentVisible.length) ||
            (prevoiusVisible && prevoiusVisible.length) ? (
              <Col lg={12} md={12} sm={12} xs={12} style={{ padding: 0 }}>
                <div className="title-text">{t("Startup Ecosystem")}</div>
              </Col>
            ) : null}
            {currentVisible && currentVisible.length ? (
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="sub-title-text">{t("Current Programs")}</div>
                <div className="list-container">
                  {currentVisible.map((each, index) => {
                    return (
                      <div className="block" key={index}>
                        <div className="avtar-container">
                          <img
                            src={
                              each?.details?.logo
                                ? each.details.logo
                                : each?.details?.personal_photo
                                ? each.details.personal_photo
                                : "/images/image.svg"
                            }
                            className={
                              each?.details?.logo ||
                              each?.details?.personal_photo
                                ? "user_img"
                                : "default_img"
                            }
                            alt="person"
                          />
                        </div>
                        <div className="user-name">
                          {each.firstName && each.lastName
                            ? each.firstName + " " + each.lastName
                            : each.email}
                        </div>
                      </div>
                    );
                  })}
                  <Pagination
                    renderPage={renderCurrentStartUpPage}
                    setRenderPage={setCurrentStartUpRenderPage}
                    totalPage={totalCurrentStartUpPage}
                  />
                </div>
              </Col>
            ) : null}
            {prevoiusVisible && prevoiusVisible.length ? (
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="sub-title-text">{t("Previous Programs")}</div>{" "}
                <div className="list-container">
                  {prevoiusVisible.map((each, index) => {
                    return (
                      <div className="block" key={index}>
                        <div className="avtar-container">
                          <img
                            src={
                              each?.details?.logo
                                ? each.details.logo
                                : each?.details?.personal_photo
                                ? each.details.personal_photo
                                : "/images/image.svg"
                            }
                            className={
                              each?.details?.logo ||
                              each?.details?.personal_photo
                                ? "user_img"
                                : "default_img"
                            }
                            alt="person"
                          />
                        </div>
                        <div className="user-name">
                          {each.firstName && each.lastName
                            ? each.firstName + " " + each.lastName
                            : each.email}
                        </div>
                      </div>
                    );
                  })}
                  <Pagination
                    renderPage={renderPreviousStartUpPage}
                    setRenderPage={setPreviousStartUpRenderPage}
                    totalPage={totalPreviousStartUpPage}
                  />
                </div>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default StartupEcoSystem;

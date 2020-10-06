import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyChallengeAction } from "../action";
import { CardComponent, Loading } from "../../common";
import { MainContainer } from "./style";
import { Constants } from "../../../lib/constant";
const tags = ["A.I", "NLP", "Supply Chain Logistics"];

const MyChallengesList = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getMyChallengeMethod = useCallback(
    () => dispatch(getMyChallengeAction()),
    [dispatch]
  );

  const is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token"),
    is_startup =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL &&
      localStorage.getItem("token"),
    userId = localStorage.getItem("userId");
  const [currentPrograms, setCurrentPrograms] = useState([]);
  const [previousPrograms, setPreviousPrograms] = useState([]);

  const myChallengesReducer = useSelector((state) => {
    return state.myChallengesReducer;
  });

  useEffect(() => {
    getMyChallengeMethod();
  }, [getMyChallengeMethod]);

  useEffect(() => {
    const { myChallenges } = myChallengesReducer;
    if (myChallenges && myChallenges.result) {
      if (myChallenges.result.length) {
        const currentPrograms = myChallenges.result.filter((each) => {
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
        setCurrentPrograms(currentPrograms);

        const previousPrograms = myChallenges.result.filter((each) => {
          return (
            each.timelineId &&
            each.timelineId.data &&
            each.timelineId.data.length &&
            each.timelineId.data.find(
              (rec) =>
                rec.state.name === "Closing" &&
                new Date(rec.endDate) < new Date()
            )
          );
        });
        setPreviousPrograms(previousPrograms);
      } else {
        setCurrentPrograms([]);
        setPreviousPrograms([]);
      }
    }
  }, [myChallengesReducer, is_organisation, userId]);

  // const [menu, setMenu] = useState(null);
  return (
    <MainContainer>
      {myChallengesReducer.loading && <Loading />}
      <div className="my-content-container">
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <Row>
              <Col>
                <div className="header-wrapper">
                  <div className="header">
                    <div className="title">
                      <span>
                        {is_startup ? t("My Programs") : t("Current Programs")}
                      </span>
                    </div>
                    <div className="circle-container">
                      <span className="count">{currentPrograms.length}</span>
                    </div>
                    <div className="tags-container">
                      {tags.map((each, index) => {
                        return (
                          <div key={index} className="tag">
                            {each}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="filter-button-container" onClick={() => {}}>
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
                    <div className="filter-count">
                      <span className="count-text">{2}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="card-list">
              <Row style={{ paddingRight: 0, paddingLeft: 0 }}>
                {currentPrograms && currentPrograms.length ? (
                  currentPrograms.map((each, index) => {
                    return (
                      <Col
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                        key={index}
                        className="custom-card"
                        onClick={() => {
                          if (
                            each &&
                            each.organisationId &&
                            each.organisationId.status ===
                              Constants.STATUS.ACTIVE
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
                          showProgress={true}
                          applications={each.applications}
                          qualified={each.qualified}
                        />
                        {/* <div
                        className={
                          menu === index
                            ? "hover-container active"
                            : "hover-container"
                        }
                        onClick={() => {
                          if (menu === index) {
                            setMenu(null);
                          } else {
                            setMenu(index);
                          }
                        }}
                      >
                        <div className="content-container">
                          <div className="view-tab">View</div>
                          <div className="border-container"></div>
                          <div className="manage-tab">Manage</div>
                        </div>
                        <div className="image-container">
                          <img
                            src="/images/ui.png"
                            alt=""
                            height="20px"
                            width="25px"
                          />
                        </div>
                      </div> */}
                      </Col>
                    );
                  })
                ) : (
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <div className=" box-container">
                      {t("No challenges to explore")}{" "}
                      {is_organisation ? (
                        <Link to="/create/challenge/1">
                          {t("create challenge")}
                        </Link>
                      ) : (
                        <Link to="/all/challenges">{t("join challenge")}</Link>
                      )}
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <Row>
              <Col>
                <div className="header-wrapper">
                  <div className="header">
                    <div className="title">
                      <span>{t("Previous Programs")}</span>
                    </div>
                    <div className="circle-container">
                      <span className="count">{previousPrograms.length}</span>
                    </div>
                    <div className="tags-container">
                      {tags.map((each, index) => {
                        return (
                          <div key={index} className="tag">
                            {each}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="card-list">
              <Row style={{ paddingRight: 0, paddingLeft: 0 }}>
                {previousPrograms && previousPrograms.length ? (
                  previousPrograms.map((each, index) => {
                    return (
                      <Col
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}
                        key={index}
                        className="custom-card"
                        onClick={() => {
                          if (
                            each &&
                            each.organisationId &&
                            each.organisationId.status ===
                              Constants.STATUS.ACTIVE
                          ) {
                            history.push(
                              `/challenge/${each._id}/preview/Summary`
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
                          showProgress={true}
                          applications={each.applications}
                          qualified={each.qualified}
                          is_previous={true}
                        />
                      </Col>
                    );
                  })
                ) : (
                  <Col lg={4} md={6} sm={12} xs={12}>
                    <div className=" box-container">
                      {t("No Previous Programs")}
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </MainContainer>
  );
};

export default MyChallengesList;

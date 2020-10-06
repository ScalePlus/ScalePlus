import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyChallengeAction } from "../action";
import { getAllChallengeAction } from "../../allChallenges/action";
import { CardComponent, Loading } from "../../common";
import { getTagsAction } from "../../challengeEdit/subComponents/description/action";
import { MainContainer } from "./style";
import { Constants } from "../../../lib/constant";

const MyChallengesList = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getMyChallengeMethod = useCallback(
    () => dispatch(getMyChallengeAction()),
    [dispatch]
  );
  const getAllChallengeMethod = useCallback(
    () => dispatch(getAllChallengeAction(null, {})),
    [dispatch]
  );
  const getTagsMethod = useCallback(() => dispatch(getTagsAction()), [
    dispatch,
  ]);

  const is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token"),
    is_startup =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL &&
      localStorage.getItem("token"),
    userId = localStorage.getItem("userId");
  const [relevantPrograms, setRelevantPrograms] = useState([]);
  const [currentPrograms, setCurrentPrograms] = useState([]);
  const [previousPrograms, setPreviousPrograms] = useState([]);

  const [relevantTags, setRelevantTags] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [previousTags, setPreviousTags] = useState([]);

  const myChallengesReducer = useSelector((state) => {
    return state.myChallengesReducer;
  });

  const allChallengesReducer = useSelector((state) => {
    return state.allChallengesReducer;
  });

  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const challengeDescriptionReducer = useSelector((state) => {
    return state.challengeDescriptionReducer;
  });

  useEffect(() => {
    getTagsMethod();
    getAllChallengeMethod();
    getMyChallengeMethod();
  }, [getTagsMethod, getAllChallengeMethod, getMyChallengeMethod]);

  useEffect(() => {
    const { allChallenges } = allChallengesReducer;
    if (
      allChallenges &&
      allChallenges.result &&
      allChallenges.result.data &&
      allChallenges.result.data.length
    ) {
      const businessModel =
          signinReducer?.userData?.businessTags?.businessModel,
        industry = signinReducer?.userData?.businessTags?.industry,
        services = signinReducer?.userData?.businessTags?.services,
        technology = signinReducer?.userData?.businessTags?.technology;

      let usersTags = [];

      if (businessModel && businessModel.length) {
        usersTags = [...usersTags, ...businessModel];
      }

      if (industry && industry.length) {
        usersTags = [...usersTags, ...industry];
      }

      if (services && services.length) {
        usersTags = [...usersTags, ...services];
      }

      if (technology && technology.length) {
        usersTags = [...usersTags, ...technology];
      }

      const filteredRecord = allChallenges.result.data.filter((each) => {
        const foundRecord = each?.descriptionId?.tags.find((tag) => {
          return (
            tag &&
            usersTags.find((each) => each._id && each._id.toString() === tag)
          );
        });
        return each && foundRecord;
      });

      let relevantTags = [];

      filteredRecord.map((each) => {
        if (each?.descriptionId?.tags && each?.descriptionId?.tags.length) {
          each.descriptionId.tags.map((tag) => {
            if (
              tag &&
              challengeDescriptionReducer?.taglist?.result &&
              challengeDescriptionReducer?.taglist?.result.length
            ) {
              const foundRecord = challengeDescriptionReducer.taglist.result.find(
                (each) => each._id && each._id.toString() === tag
              );
              relevantTags.push(foundRecord);
            }
            return tag;
          });
        }
        return each;
      });

      setRelevantTags(relevantTags);
      setRelevantPrograms(filteredRecord);
    }
  }, [challengeDescriptionReducer, allChallengesReducer, signinReducer]);

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
        let currentTags = [];

        currentPrograms.map((each) => {
          if (each?.descriptionId?.tags && each?.descriptionId?.tags.length) {
            each.descriptionId.tags.map((tag) => {
              if (
                tag &&
                challengeDescriptionReducer?.taglist?.result &&
                challengeDescriptionReducer?.taglist?.result.length
              ) {
                const foundRecord = challengeDescriptionReducer.taglist.result.find(
                  (each) => each._id && each._id.toString() === tag
                );
                currentTags.push(foundRecord);
              }
              return tag;
            });
          }
          return each;
        });

        setCurrentTags(currentTags);
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
        let previousTags = [];

        previousPrograms.map((each) => {
          if (each?.descriptionId?.tags && each?.descriptionId?.tags.length) {
            each.descriptionId.tags.map((tag) => {
              if (
                tag &&
                challengeDescriptionReducer?.taglist?.result &&
                challengeDescriptionReducer?.taglist?.result.length
              ) {
                const foundRecord = challengeDescriptionReducer.taglist.result.find(
                  (each) => each._id && each._id.toString() === tag
                );
                previousTags.push(foundRecord);
              }
              return tag;
            });
          }
          return each;
        });

        setPreviousTags(previousTags);
        setPreviousPrograms(previousPrograms);
      } else {
        setCurrentPrograms([]);
        setPreviousPrograms([]);
      }
    }
  }, [
    challengeDescriptionReducer,
    myChallengesReducer,
    is_organisation,
    userId,
  ]);

  // const [menu, setMenu] = useState(null);
  return (
    <MainContainer>
      {myChallengesReducer.loading && <Loading />}
      <div className="my-content-container">
        {is_startup ? (
          <Row className="justify-content-center">
            <Col lg={11} md={11} sm={11} xs={11}>
              <Row>
                <Col>
                  <div className="header-wrapper">
                    <div className="header">
                      <div className="title">
                        <span>{t("Relevant Programs")}</span>
                      </div>
                      <div className="circle-container">
                        <span className="count">{relevantPrograms.length}</span>
                      </div>
                      <div className="tags-container">
                        {relevantTags && relevantTags.length
                          ? relevantTags.map((each, index) => {
                              return (
                                <div key={index} className="tag">
                                  {each.name}
                                </div>
                              );
                            })
                          : null}
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
                  {relevantPrograms && relevantPrograms.length ? (
                    relevantPrograms.map((each, index) => {
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
                        </Col>
                      );
                    })
                  ) : (
                    <Col lg={4} md={6} sm={12} xs={12}>
                      <div className=" box-container">
                        {t("No Relevant Programs")}
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        ) : null}
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
                      {currentTags && currentTags.length
                        ? currentTags.map((each, index) => {
                            return (
                              <div key={index} className="tag">
                                {each.name}
                              </div>
                            );
                          })
                        : null}
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
                      {previousTags && previousTags.length
                        ? previousTags.map((each, index) => {
                            return (
                              <div key={index} className="tag">
                                {each.name}
                              </div>
                            );
                          })
                        : null}
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

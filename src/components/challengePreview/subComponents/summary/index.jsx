import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { PageTitle, Pagination } from "../../../common";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";
import moment from "moment";

const Summary = ({
  t,
  challengeData,
  is_organisation,
  organisationTeamMember,
  is_mentor_judge,
  is_startup_Individual,
  is_logged_in,
  is_profile_updated,
  setUserFlowModal,
  submissionClosed,
  judgingClosed,
}) => {
  const [participants, setParticipants] = useState([]);
  const [visiblePariticipantData, setVisiblePariticipantData] = useState(null);
  const [totalPariticipantPage, setTotalPariticipantPage] = useState(null);
  const [renderPariticipantPage, setRenderPariticipantPage] = useState(null);

  const [judges, setJudges] = useState([]);
  const [visibleJudgeData, setVisibleJudgeData] = useState(null);
  const [totalJudgePage, setTotalJudgePage] = useState(null);
  const [renderJudgePage, setRenderJudgePage] = useState(null);

  const limit = 10;

  useEffect(() => {
    if (challengeData) {
      let participants = [],
        judges = [];

      if (challengeData?.participantsId?.data.length) {
        challengeData.participantsId.data.map((rec) => {
          if (rec?.team && rec?.team.length) {
            rec.team.map((teamRec) => {
              if (
                teamRec?.userId &&
                !participants.find(
                  (e) => e._id.toString() === teamRec.userId._id.toString()
                )
              ) {
                participants.push(teamRec.userId);
              }
              return teamRec;
            });
          }
          return rec;
        });
      }

      if (challengeData?.invited_participantsId?.data.length) {
        challengeData.invited_participantsId.data.map((rec) => {
          if (
            rec?.userId &&
            !participants.find(
              (e) => e._id.toString() === rec.userId._id.toString()
            )
          ) {
            participants.push(rec.userId);
          }
          return rec;
        });
      }

      if (challengeData?.judgesId?.data.length) {
        challengeData.judgesId.data.map((rec) => {
          if (
            rec?.userId &&
            !judges.find((e) => e._id.toString() === rec.userId._id.toString())
          ) {
            judges.push(rec.userId);
          }
          return rec;
        });
      }

      if (participants && participants.length) {
        setTotalPariticipantPage(Math.ceil(participants.length / limit));
        setRenderPariticipantPage(1);
      }

      if (judges && judges.length) {
        setTotalJudgePage(Math.ceil(judges.length / limit));
        setRenderJudgePage(1);
      }

      setParticipants(participants);
      setJudges(judges);
    }
  }, [challengeData]);

  useEffect(() => {
    if (participants && participants.length) {
      setVisiblePariticipantData(
        participants.slice(
          (renderPariticipantPage - 1) * limit,
          renderPariticipantPage * limit
        )
      );
    }
  }, [participants, totalPariticipantPage, renderPariticipantPage]);

  useEffect(() => {
    if (judges && judges.length) {
      setVisibleJudgeData(
        judges.slice((renderJudgePage - 1) * limit, renderJudgePage * limit)
      );
    }
  }, [judges, totalJudgePage, renderJudgePage]);

  return (
    <MainContainer>
      <Row className="justify-content-center image-box-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={5} md={4} sm={12} xs={12}>
              <div className="right-container">
                <PageTitle
                  text={
                    challengeData.descriptionId &&
                    challengeData.descriptionId.title
                  }
                />
                <div className="tab-container">
                  {challengeData.descriptionId &&
                  challengeData.descriptionId.tags &&
                  challengeData.descriptionId.tags.length
                    ? challengeData.descriptionId.tags.map((each, index) => {
                        return <span key={index}>{each.name}</span>;
                      })
                    : null}
                </div>
                <div
                  className="sub-text-container"
                  style={{
                    marginBottom: 25,
                    // maxHeight:
                    //   is_organisation || organisationTeamMember
                    //     ? "215px"
                    //     : "8rem",
                  }}
                >
                  <span>
                    {challengeData.descriptionId &&
                      challengeData.descriptionId.shortDescription}
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={7} md={8} sm={12} xs={12}>
              <div className="left-container">
                <img
                  alt=""
                  src={
                    challengeData.descriptionId &&
                    challengeData.descriptionId.bannerImage
                      ? challengeData.descriptionId.bannerImage
                      : "/images/image.svg"
                  }
                ></img>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ContentContainer>
        <Row className="justify-content-center header-container">
          <Col lg={11} md={11} sm={11} xs={11}>
            <HeaderComponent titleText={t("Challenge Summary")} />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            {challengeData?.timelineId?.data.length ? (
              <div className="date-period">
                {t("Date")}:{" "}
                {moment(challengeData.timelineId.data[0].startDate).format(
                  "DD.MM.YYYY"
                )}{" "}
                -{" "}
                {moment(
                  challengeData.timelineId.data[
                    challengeData.timelineId.data.length - 1
                  ].startDate
                ).format("DD.MM.YYYY")}
              </div>
            ) : null}
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  challengeData.overviewId && challengeData.overviewId.data,
              }}
            ></div>
            <Row className="list-row">
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title-text">
                  {t("Participants")} {participants.length}
                </div>
                {visiblePariticipantData && visiblePariticipantData.length ? (
                  <div className="list-container">
                    {visiblePariticipantData.map((each, index) => {
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
                      renderPage={renderPariticipantPage}
                      setRenderPage={setRenderPariticipantPage}
                      totalPage={totalPariticipantPage}
                    />
                  </div>
                ) : null}
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title-text">
                  {t("Judges")} {judges.length}
                </div>
                {visibleJudgeData && visibleJudgeData.length ? (
                  <div className="list-container">
                    {visibleJudgeData.map((each, index) => {
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
                      renderPage={renderJudgePage}
                      setRenderPage={setRenderJudgePage}
                      totalPage={totalJudgePage}
                    />
                  </div>
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </ContentContainer>
    </MainContainer>
  );
};

export default React.memo(Summary);

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { PageTitle } from "../../../common";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";
import moment from "moment";
import { Constants } from "../../../../lib/constant";

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
  const [memberAsParticipant, setParticipation] = useState(false);
  const [memberAsJudge, setJudge] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [judges, setJudges] = useState([]);

  useEffect(() => {
    if (challengeData) {
      setParticipation(
        challengeData.participantsId &&
          challengeData.participantsId.data &&
          challengeData.participantsId.data.length &&
          challengeData.participantsId.data.find((each) => {
            return each.team.find(
              (member) =>
                member.userId._id.toString() ===
                  localStorage.getItem("userId") &&
                member.status !== Constants.USER_STATUS.Declined &&
                member.status !== Constants.USER_STATUS.Canceled &&
                member.status !== Constants.USER_STATUS.Invited
            );
          })
          ? true
          : false
      );

      setJudge(
        challengeData.judgesId &&
          challengeData.judgesId.data.length &&
          challengeData.judgesId.data.find(
            (member) =>
              member.userId._id.toString() === localStorage.getItem("userId") &&
              member.status !== Constants.USER_STATUS.Declined &&
              member.status !== Constants.USER_STATUS.Invited
          )
          ? true
          : false
      );

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

      setParticipants(participants);
      setJudges(judges);
    }
  }, [challengeData]);

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
                {participants && participants.length ? (
                  <div className="list-container">
                    {participants.map((each, index) => {
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
                      <span>{1}</span>
                      <span className="of-text">{t("of")}</span>
                      <span>{1}</span>
                      <span className="next-page">{">"}</span>
                      <span className="last-page">{">>"}</span>
                    </div>
                  </div>
                ) : null}
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title-text">
                  {t("Judges")} {judges.length}
                </div>
                {judges && judges.length ? (
                  <div className="list-container">
                    {judges.map((each, index) => {
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
                      <span>{1}</span>
                      <span className="of-text">{t("of")}</span>
                      <span>{1}</span>
                      <span className="next-page">{">"}</span>
                      <span className="last-page">{">>"}</span>
                    </div>
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
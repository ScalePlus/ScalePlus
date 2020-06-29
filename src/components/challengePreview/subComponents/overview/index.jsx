import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";
import { PageTitle, PrimaryButton } from "../../../common";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";
import history from "../../../../history";
import { Constants } from "../../../../lib/constant";

const OverView = ({
  challengeData,
  is_organisation,
  organisationTeamMember,
  is_mentor_judge,
  is_startup_Individual,
  is_logged_in,
  is_profile_updated,
  setUserFlowModal,
  submissionClosed,
}) => {
  const [memberAsParticipant, setParticipation] = useState(false);
  const [memberAsJudge, setJudge] = useState(false);

  useEffect(() => {
    if (challengeData) {
      setParticipation(
        challengeData.participantsId &&
          challengeData.participantsId.data &&
          challengeData.participantsId.data.length &&
          challengeData.participantsId.data.find((each) => {
            return each.team.find(
              (member) =>
                member.userId._id.toString() === localStorage.getItem("userId")
            );
          })
          ? true
          : false
      );

      setJudge(
        challengeData.judgesId &&
          challengeData.judgesId.data.length &&
          challengeData.judgesId.data.find(
            (each) =>
              each.userId._id.toString() === localStorage.getItem("userId")
          )
          ? true
          : false
      );
    }
  }, [challengeData]);

  return (
    <MainContainer>
      <Row className="justify-content-center image-box-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
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
                <div className="bottom-container">
                  <div className="stage-container">
                    <div className="title-text">
                      <span>Stage:</span>
                    </div>
                    <div className="sub-text">
                      <span>Pre registration</span>
                    </div>
                  </div>
                  <div className="prize-container">
                    <div className="title-text">
                      <span>Prize:</span>
                    </div>
                    <div className="sub-text">
                      <span>
                        $
                        {challengeData.descriptionId &&
                          challengeData.descriptionId.prize}
                      </span>
                    </div>
                  </div>
                </div>
                {is_organisation || organisationTeamMember ? null : (
                  <div className="button-container">
                    <PrimaryButton
                      variant={submissionClosed ? "secondary" : "primary"}
                      text={
                        is_mentor_judge && !memberAsJudge
                          ? "Judge this Challenge"
                          : (is_startup_Individual &&
                              !memberAsParticipant &&
                              !organisationTeamMember) ||
                            !is_logged_in
                          ? submissionClosed
                            ? "Submission Closed"
                            : "Solve Challenge"
                          : null
                      }
                      onClick={() => {
                        if (is_logged_in) {
                          if (is_profile_updated) {
                            if (is_mentor_judge) {
                              history.push("/dashboard");
                            } else if (!submissionClosed) {
                              history.push(
                                `/solve/challenge/${challengeData._id}`
                              );
                            }
                          } else {
                            if (!submissionClosed) {
                              history.push("/detail");
                            }
                          }
                        } else {
                          if (!submissionClosed) {
                            setUserFlowModal(true);
                          }
                        }
                      }}
                    ></PrimaryButton>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ContentContainer>
        <Row className="justify-content-center header-container">
          <Col lg={11} md={11} sm={11} xs={11}>
            {(is_organisation ||
              (organisationTeamMember &&
                organisationTeamMember.permission ===
                  Constants.TEAM_PERMISSION.ADMIN)) &&
            challengeData &&
            !challengeData.isPublished ? (
              <HeaderComponent
                titleText="Challenge Overview"
                buttonText="Edit Overview"
                buttonVariant="info"
                buttonClick={() => {
                  history.push(`/challenge/${challengeData._id}/edit/Overview`);
                }}
              />
            ) : (
              <HeaderComponent titleText="Challenge Overview" />
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  challengeData.overviewId && challengeData.overviewId.data,
              }}
            ></div>
            {challengeData.descriptionId &&
              challengeData.descriptionId.videoURL && (
                <div className="video-container">
                  <ReactPlayer
                    url={challengeData.descriptionId.videoURL}
                    width={"100%"}
                    height={"100%"}
                    style={{ borderRadius: "6px" }}
                  />
                </div>
              )}
          </Col>
        </Row>
        {is_organisation || organisationTeamMember ? null : (
          <Row className="justify-content-center">
            <Col lg={3} md={3} sm={3} xs={3} className="button-container">
              <PrimaryButton
                variant={submissionClosed ? "secondary" : "primary"}
                text={
                  is_mentor_judge && !memberAsJudge
                    ? "Judge this Challenge"
                    : (is_startup_Individual &&
                        !memberAsParticipant &&
                        !organisationTeamMember) ||
                      !is_logged_in
                    ? submissionClosed
                      ? "Submission Closed"
                      : "Solve Challenge"
                    : null
                }
                onClick={() => {
                  if (is_logged_in) {
                    if (is_profile_updated) {
                      if (is_mentor_judge) {
                        history.push("/dashboard");
                      } else if (!submissionClosed) {
                        history.push(`/solve/challenge/${challengeData._id}`);
                      }
                    } else {
                      if (!submissionClosed) {
                        history.push("/detail");
                      }
                    }
                  } else {
                    if (!submissionClosed) {
                      setUserFlowModal(true);
                    }
                  }
                }}
              ></PrimaryButton>
            </Col>
          </Row>
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default React.memo(OverView);

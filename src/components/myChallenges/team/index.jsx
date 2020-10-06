import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyChallengeAction } from "../action";
import { MainContainer } from "./style";
import { Pagination } from "../../common";

function Team({ history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getMyChallengeMethod = useCallback(
    () => dispatch(getMyChallengeAction()),
    [dispatch]
  );

  const myChallengesReducer = useSelector((state) => {
    return state.myChallengesReducer;
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [visibleTeamMembers, setVisibleTeamMembers] = useState([]);
  const [totalTeamMembersPage, setTeamMembersTotalPage] = useState(null);
  const [renderTeamMembersPage, setTeamMembersRenderPage] = useState(null);

  const [activeTeams, setActiveTeams] = useState([]);
  const [visibleActiveTeams, setVisibleActiveTeams] = useState([]);
  const [totalActiveTeamsPage, setActiveTeamsTotalPage] = useState(null);
  const [renderActiveTeamsPage, setActiveTeamsRenderPage] = useState(null);
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
      let members = [],
        teams = [];
      result.map((each) => {
        if (
          (!each.timelineId ||
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
              ))) &&
          each?.participantsId?.data.length
        ) {
          each.participantsId.data.map((rec) => {
            if (rec?.team && rec?.team.length) {
              rec.team.map((teamRec) => {
                if (teamRec?.userId) {
                  if (
                    !members.find(
                      (e) =>
                        e?.userData?._id &&
                        teamRec?.userId?._id &&
                        e.userData._id.toString() ===
                          teamRec.userId._id.toString()
                    )
                  ) {
                    if (rec?.name) {
                      members.push({
                        userData: teamRec.userId,
                        teamData: [rec],
                      });
                    } else {
                      members.push({
                        userData: teamRec.userId,
                        teamData: [],
                      });
                    }
                  } else {
                    members = members.map((e) => {
                      if (
                        e?.userData?._id &&
                        teamRec?.userId?._id &&
                        e.userData._id.toString() ===
                          teamRec.userId._id.toString() &&
                        rec?.name
                      ) {
                        e.teamData.push(rec);
                      }
                      return e;
                    });
                  }
                }

                return teamRec;
              });
              if (rec?.name && each?.descriptionId) {
                teams.push({
                  challengeData: each.descriptionId,
                  teamData: rec,
                });
              }
            }
            return rec;
          });
        }

        return each;
      });

      if (teams && teams.length) {
        setActiveTeamsTotalPage(Math.ceil(teams.length / limit));
        setActiveTeamsRenderPage(1);
        setActiveTeams(teams);
      }

      if (members && members.length) {
        setTeamMembersTotalPage(Math.ceil(members.length / limit));
        setTeamMembersRenderPage(1);
        setTeamMembers(members);
      }
    }
  }, [myChallengesReducer]);

  useEffect(() => {
    if (activeTeams && activeTeams.length) {
      setVisibleActiveTeams(
        activeTeams.slice(
          (renderActiveTeamsPage - 1) * limit,
          renderActiveTeamsPage * limit
        )
      );
    }
  }, [activeTeams, totalActiveTeamsPage, renderActiveTeamsPage]);

  useEffect(() => {
    if (teamMembers && teamMembers.length) {
      setVisibleTeamMembers(
        teamMembers.slice(
          (renderTeamMembersPage - 1) * limit,
          renderTeamMembersPage * limit
        )
      );
    }
  }, [teamMembers, totalTeamMembersPage, renderTeamMembersPage]);

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            {visibleTeamMembers && visibleTeamMembers.length ? (
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="sub-title-text">{t("Team Members")}</div>
                <div className="list-container">
                  {visibleTeamMembers.map((each, index) => {
                    return (
                      <div className="block" key={index}>
                        <div className="basic-detail-container">
                          <div className="avtar-container">
                            <img
                              src="/images/image.svg"
                              height={15}
                              width={15}
                              alt="person"
                            />
                          </div>
                          <div className="user-name">
                            {each.userData.firstName && each.userData.lastName
                              ? each.userData.firstName +
                                " " +
                                each.userData.lastName
                              : each.userData.email}
                          </div>
                          {each?.teamData.length ? (
                            <div className="tags-container">
                              {each.teamData.map((each, index) => {
                                return (
                                  <div key={index} className="tag">
                                    {each?.name}
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                        <div
                          className="status-container"
                          style={
                            !each.userData.status
                              ? {
                                  backgroundColor: "#e0f9ea",
                                  color: "#66e397",
                                  borderColor: "#66e397",
                                }
                              : {
                                  backgroundColor: "#fce7e7",
                                  color: "#f18989",
                                  borderColor: "#f18989",
                                }
                          }
                        >
                          {!each.userData.status ? "Active" : "Inactive"}
                        </div>
                      </div>
                    );
                  })}
                  <Pagination
                    renderPage={renderTeamMembersPage}
                    setRenderPage={setTeamMembersRenderPage}
                    totalPage={totalTeamMembersPage}
                  />
                </div>
              </Col>
            ) : null}
            {visibleActiveTeams && visibleActiveTeams.length ? (
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="sub-title-text">{t("Active Teams")}</div>
                <div className="list-container">
                  {visibleActiveTeams.map((each, index) => {
                    return (
                      <div className="active-team-block" key={index}>
                        <div className="team-name">{each?.teamData?.name}</div>
                        <div className="challenge-name">
                          {each?.challengeData?.title}
                        </div>
                        <div className="members-list">
                          <div className="member-title">{t("Members")}</div>
                          <div className="tags-container">
                            {each.teamData.team.map((member, index) => {
                              return (
                                <div key={index} className="tag">
                                  {member?.userId?.firstName
                                    ? member.userId.firstName +
                                      " " +
                                      member.userId.lastName
                                    : member.userId.email}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Pagination
                    renderPage={renderActiveTeamsPage}
                    setRenderPage={setActiveTeamsRenderPage}
                    totalPage={totalActiveTeamsPage}
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

export default Team;

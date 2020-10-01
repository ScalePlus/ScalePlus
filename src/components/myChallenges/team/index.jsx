import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyChallengeAction } from "../action";
import { MainContainer } from "./style";
const teamMembers = [
  { name: "ALI JARDEH", status: 0 },
  { name: "MARWAN ALQADI", status: 0 },
  { name: "GHAITH A.", status: 0 },
  { name: "GHAITH ABDRELRAHMAN", status: 0 },
  { name: "ZAID F", status: 1 },
];
const tags = ["Tech Team", "Business Squad"];
const activeTeams = [
  {
    name: "TECH TEAM",
    challenge_name: "Low impact Agriculture CHallenge",
    members: [
      "ALI JARDEH",
      "MARWAN ALQADI",
      "GHAITH A.",
      "GHAITH ABDRELRAHMAN",
      "ZAID F",
    ],
  },
  {
    name: "BUSINESS SQAUD",
    challenge_name: "Water Preservation & clean the ocean",
    members: ["ALI JARDEH", "MARWAN ALQADI", "GHAITH A."],
  },
];

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

  useEffect(() => {
    getMyChallengeMethod();
  }, [getMyChallengeMethod]);

  useEffect(() => {
    if (
      myChallengesReducer?.myChallenges?.result &&
      myChallengesReducer?.myChallenges?.result.length
    ) {
      const { result } = myChallengesReducer?.myChallenges;
      let members = [];
      result.map((each) => {
        if (each?.teamId?.data.length) {
          each.teamId.data.map((rec) => {
            if (
              rec?.userId &&
              !members.find(
                (e) => e._id.toString() === rec.userId._id.toString()
              )
            ) {
              members.push(rec.userId);
            }
            return rec;
          });
        }
        return each;
      });
      console.log(members);
    }
  }, [myChallengesReducer]);

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="sub-title-text">{t("Team Members")}</div>
              <div className="list-container">
                {teamMembers.map((each, index) => {
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
                        <div className="user-name">{each.name}</div>
                        {index === 0 && (
                          <div className="tags-container">
                            {tags.map((each, index) => {
                              return (
                                <div key={index} className="tag">
                                  {each}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div
                        className="status-container"
                        style={
                          !each.status
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
                        {!each.status ? "Active" : "Inactive"}
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
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="sub-title-text">{t("Active Teams")}</div>
              <div className="list-container">
                {activeTeams.map((each, index) => {
                  return (
                    <div className="active-team-block" key={index}>
                      <div className="team-name">{each.name}</div>
                      <div className="challenge-name">
                        {each.challenge_name}
                      </div>
                      <div className="members-list">
                        <div className="member-title">{t("Members")}</div>
                        <div className="tags-container">
                          {each.members.map((member, index) => {
                            return (
                              <div key={index} className="tag">
                                {member}
                              </div>
                            );
                          })}
                        </div>
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
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default Team;

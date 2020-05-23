import React from "react";
import { MainContainer, AddButton } from "./style";
import { Row, Col } from "react-bootstrap";
const challenges = ["Challenge 1", "Challenge 2", "Challenge 3"];
const users = [
  {
    name: "User 1",
    challengeName: "Challenge Name",
    status: "Submitted",
  },
  {
    name: "User 2",
    challengeName: "Challenge Name",
    status: "Pending",
  },
  {
    name: "User 3",
    challengeName: "Challenge Name",
    status: "Pending",
  },
  {
    name: "User 4",
    challengeName: "Challenge Name",
    status: "Pending",
  },
  {
    name: "User 5",
    challengeName: "Challenge Name",
    status: "Pending",
  },
];
const judges = [
  {
    name: "Judge 1",
    challengeName: "Judge / Challenge Name",
  },
  {
    name: "Judge 2",
    challengeName: "Judge / Challenge Name",
  },
  {
    name: "Judge 3",
    challengeName: "Judge / Challenge Name",
  },
  {
    name: "Judge 4",
    challengeName: "Judge / Challenge Name",
  },
  {
    name: "Judge 5",
    challengeName: "Judge / Challenge Name",
  },
];

export default function Content({ history }) {
  return (
    <MainContainer>
      <Row>
        <Col lg={4} md={4} sm={12} xs={12}>
          <div className="block">
            <div className="header">
              <div>
                <span className="title">Challenges</span>
                <span className="count">3</span>
              </div>
              <AddButton
                onClick={() => {
                  history.push("/challenge");
                }}
              >
                <span className="button-text">Create</span>
              </AddButton>
            </div>
            <div className="content-container">
              {challenges.map((each, index) => {
                return (
                  <div key={index} className="content">
                    <div>
                      <span className="name">{each}</span>
                    </div>
                    <div>
                      <span className="grey-button">Modify</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
          <div className="block">
            <div className="header">
              <div>
                <span className="title">Users</span>
                <span className="count">8</span>
              </div>
              <AddButton>
                <span className="button-text">Add</span>
              </AddButton>
            </div>
            <div className="content-container">
              {users.map((each, index) => {
                return (
                  <div key={index} className="outer-content">
                    <div>
                      <span className="name">{each.name}</span>
                    </div>
                    <div className="inner-content">
                      <div>
                        <span className="sub-name">{each.challengeName}</span>
                      </div>
                      <div>
                        <span className="grey-button">{each.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col lg={4} md={4} sm={12} xs={12}>
          <div className="block">
            <div className="header">
              <div>
                <span className="title">Judges/Advisors</span>
                <span className="count">10</span>
              </div>
              <AddButton>
                <span className="button-text">Add</span>
              </AddButton>
            </div>
            <div className="content-container">
              {judges.map((each, index) => {
                return (
                  <div key={index} className="outer-content">
                    <div>
                      <span className="name">{each.name}</span>
                    </div>
                    <div className="inner-content">
                      <div>
                        <span className="sub-name">{each.challengeName}</span>
                      </div>
                      {/* <div>
                        <span className="grey-button">Modify</span>
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
}

import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardComponent } from "../../common";
import { MainContainer } from "./style";
let cards = [
  {
    src: "/images/Rectangle1.png",
    progress: 80,
    variant: "warning",
    label: "Judging",
  },
  {
    src: "/images/Rectangle2.png",
    progress: 10,
    variant: "success",
    label: "Start",
  },
];

const MyChallengesList = ({ history }) => {
  const [menu, setMenu] = useState(null);
  return (
    <MainContainer>
      <div className="my-content-container">
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <div className="header">
              <div className="title">
                <span>My Challenges</span>
              </div>
              <div className="circle-container">
                <span className="count">{cards.length}</span>
              </div>
            </div>
            <div className="card-list">
              <Row style={{ paddingRight: 0, paddingLeft: 0 }}>
                {cards.map((each, index) => {
                  return (
                    <Col
                      lg={4}
                      md={6}
                      sm={12}
                      xs={12}
                      key={index}
                      className="custom-card"
                      onClick={() => {
                        history.push("/challenge/preview");
                      }}
                    >
                      <CardComponent
                        src={each.src}
                        variant={each.variant}
                        progress={each.progress}
                        label={each.label}
                      />
                      <div
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
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </MainContainer>
  );
};

export default MyChallengesList;

import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { Input } from "../../../common";
import { HeaderContainer, ContentContainer } from "./style";
let challenges = [
  { src: "/images/Rectangle1.png" },
  { src: "/images/Rectangle2.png" },
  { src: "/images/Rectangle3.png" },
  { src: "/images/Rectangle4.png" },
  { src: "/images/Rectangle5.png" },
  { src: "/images/Rectangle6.png" },
  { src: "/images/Rectangle7.png" },
  { src: "/images/Rectangle2.png" },
  { src: "/images/Rectangle1.png" },
  { src: "/images/Rectangle4.png" },
  { src: "/images/Rectangle5.png" },
  { src: "/images/Rectangle6.png" },
];
let organizations = ["Ministry Of ....", "IBM", "Al Futtaim Group"];
let users = ["User 1", "User 2", "User 3"];

const SearchModal = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="search-modal"
    >
      <Modal.Header>
        <HeaderContainer>
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={12} xs={12}>
              <div className="header-component">
                <div className="left-container">
                  <Input
                    type="text"
                    placeholder="Type here to search..."
                  ></Input>
                </div>
                <div
                  className="right-container"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <span>x</span>
                </div>
              </div>
            </Col>
          </Row>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Body>
        <ContentContainer>
          <Row className="justify-content-center">
            <Col lg={10} md={10} sm={12} xs={12}>
              <div className="title-container">
                <span>Challenges</span>
              </div>
              {challenges.map((each, index) => {
                return (
                  <div className="challenge-container" key={index}>
                    <div className="image-container">
                      <img src={each.src} alt=""></img>
                    </div>
                    <div>
                      <div className="name">By Rio Tinto</div>
                      <div className="description">
                        Low Impact Agriculture Challenge
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="sub-title-container">
                <span>View All Challenges ></span>
              </div>
              <div className="title-container">
                <span>Organizations</span>
              </div>
              {organizations.map((each, index) => {
                return (
                  <div className="challenge-container" key={index}>
                    <div className="circle-container">
                      <img
                        alt=""
                        src={"/images/image.svg"}
                        height={40}
                        width={40}
                      ></img>
                    </div>
                    <div className="description">{each}</div>
                  </div>
                );
              })}
              <div className="sub-title-container">
                <span>View All Organizations ></span>
              </div>
              <div className="title-container">
                <span>Users</span>
              </div>
              {users.map((each, index) => {
                return (
                  <div className="challenge-container" key={index}>
                    <div className="circle-container">
                      <img
                        alt=""
                        src={"/images/image.svg"}
                        height={40}
                        width={40}
                      ></img>
                    </div>
                    <div className="description">{each}</div>
                  </div>
                );
              })}
              <div className="sub-title-container">
                <span>View All Users ></span>
              </div>
            </Col>
          </Row>
        </ContentContainer>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(SearchModal);

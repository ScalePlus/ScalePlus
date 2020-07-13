import React from "react";
import { useTranslation } from "react-i18next";
import { MainContainer } from "./style";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Input } from "../common";

const AllActivities = ({ history }) => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={12}>
          <Row>
            <Col>
              <div className="title-container">
                <div
                  className="title"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  {t("< All Activities")}
                </div>
                <div className="right-container">
                  <div className="input-container">
                    <Input placeholder="Search" type="text" />
                  </div>

                  <Dropdown>
                    <Dropdown.Toggle
                      as={React.forwardRef(({ children, onClick }, ref) => (
                        <div
                          className="filter-button-container"
                          onClick={(e) => {
                            e.preventDefault();
                            onClick(e);
                          }}
                          ref={ref}
                        >
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
                      ))}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu
                      alignRight={true}
                      className="activities-filter-menu"
                    >
                      <Dropdown.Item eventKey={1}>
                        {t("All Activities")}
                      </Dropdown.Item>
                      <div className="title-block">
                        <span>{t("By Admin")}</span>
                      </div>
                      <Dropdown.Item eventKey={2}>
                        {t("Application Approvals")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={3}>
                        {t("Application declines")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={4}>
                        {t("All Reviews")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={5}>
                        {t("All Submissions")}
                      </Dropdown.Item>
                      <div className="title-block">
                        <span>{t("By Startup/Individual")}</span>
                      </div>
                      <Dropdown.Item eventKey={6}>
                        {t("Submitted Application")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={7}>
                        {t("Participants")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={82}>
                        {t("Submissions")}
                      </Dropdown.Item>
                      <div className="title-block">
                        <span>{t("By Judge")}</span>
                      </div>
                      <Dropdown.Item eventKey={9}>
                        {t("Submitted Application")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={10}>
                        {t("Participants")}
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={11}>
                        {t("All Reviews")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
          <div className="list-container">
            <Row>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="block">
                  <div>
                    <div className="challenge-name">
                      Low Impact Agriculture Challenge
                    </div>
                    <div className="basic-information">
                      <div className="user-name">Ali Jaradeh</div>
                      <div>Submitted Application</div>
                    </div>
                  </div>
                  <div>
                    <div className="status-container">Invited</div>
                    <div>01.07.2020</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default AllActivities;

import React from "react";
import { useTranslation } from "react-i18next";
import { MainContainer } from "./style";
import { Row, Col } from "react-bootstrap";
import { Input } from "../common";

function AllUsers({ history, from_preview }) {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col
          lg={from_preview ? 11 : 9}
          md={from_preview ? 11 : 10}
          sm={from_preview ? 11 : 12}
        >
          <Row>
            <Col>
              <div className="title-container">
                <div
                  className="title"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  {from_preview ? t("Users") : t("< All Users")}
                </div>
                <div className="right-container">
                  {!from_preview && (
                    <div className="input-container">
                      <Input placeholder="Search" type="text" />
                    </div>
                  )}
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
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "2rem" }}>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6} xs={12}>
              <div
                className="list-single-block"
                onClick={() => {
                  history.push("/profile/view/123");
                }}
              >
                <div className="avtar-container">
                  <img src="/images/image.svg" alt="" height={30} width={30} />
                </div>
                <div className="user-info-container">
                  <div className="basic-information">
                    <div>
                      <div className="user-name">User name</div>
                      <div className="user-role">Admin</div>
                    </div>
                    <div>
                      <div className="challenge-name">
                        Low Impact Agriculture Challenge
                      </div>
                      <span className="status-container">Invited</span>
                    </div>
                    <div className="timestamp">01.07.2020</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default AllUsers;

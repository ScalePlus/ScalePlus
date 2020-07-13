import React, { useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { MainContainer } from "./style";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { InfoBlock } from "../common";
import { Switch } from "../../../common";
import UserInviteModal from "./inviteModal";

const UserList = ({ t, history, activeKey }) => {
  const [show, setShow] = useState(false);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>{t("users_info_text")}</span>
          </InfoBlock>
        </Col>
      </Row>
      <Row style={{ marginBottom: 25 }}>
        <Col>
          <HeaderComponent
            titleText={activeKey.label}
            infoButtonText={t("Invite User")}
            infoButtonVariant="info"
            infoButtonType="button"
            infoButtonClick={() => {
              setShow(true);
            }}
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: 25 }}>
        <Col className="switch-filter-container">
          <Switch variant="primary" label={t("Enable users tab")}></Switch>
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
            <Dropdown.Menu alignRight={true} className="user-filter-menu">
              <Dropdown.Item eventKey={1} onClick={() => {}}>
                {t("All Users")}
              </Dropdown.Item>
              <div className="border-container"></div>
              <Dropdown.Item eventKey={2} onClick={() => {}}>
                {t("All Admins")}
              </Dropdown.Item>
              <Dropdown.Item eventKey={3} onClick={() => {}}>
                {t("Admin Invites")}
              </Dropdown.Item>
              <Dropdown.Item eventKey={4} onClick={() => {}}>
                {t("Submitted Application")}
              </Dropdown.Item>
              <div className="border-container"></div>
              <Dropdown.Item eventKey={5} onClick={() => {}}>
                {t("Startup/Individual Only")}
              </Dropdown.Item>
              <Dropdown.Item eventKey={6} onClick={() => {}}>
                {t("Invited")}
              </Dropdown.Item>
              <Dropdown.Item eventKey={7} onClick={() => {}}>
                {t("Submitted Application")}
              </Dropdown.Item>
              <div className="border-container"></div>
              <Dropdown.Item eventKey={5} onClick={() => {}}>
                {t("Judge Only")}
              </Dropdown.Item>
              <Dropdown.Item eventKey={6} onClick={() => {}}>
                {t("Invited")}
              </Dropdown.Item>
              <Dropdown.Item eventKey={7} onClick={() => {}}>
                {t("Submitted Application")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
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
        </Col>{" "}
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
        </Col>{" "}
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
        </Col>{" "}
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
        </Col>{" "}
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
        </Col>{" "}
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
        </Col>{" "}
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
        </Col>{" "}
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
        </Col>{" "}
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
        </Col>{" "}
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
      <UserInviteModal t={t} show={show} setShow={setShow} />
    </MainContainer>
  );
};

export default UserList;

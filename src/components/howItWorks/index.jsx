import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { PrimaryButton } from "../common";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const HowItWorks = ({ history }) => {
  const { t } = useTranslation();
  const is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    is_logged_in = localStorage.getItem("token");
  const [showInfo, setShow] = useState(false);
  return (
    <MainContainer>
      <div className="subscribe-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title">
                  <span>{t("evaluate_title")}</span>
                </div>
                <div className="description">
                  <span>{t("evaluate_description")}</span>
                </div>
                <div className="button-container">
                  <PrimaryButton
                    variant="primary"
                    text={t("evaluate_button_text")}
                    onClick={() => {
                      if (!is_logged_in) {
                        history.push("/login");
                      } else if (is_organisation) {
                        history.push("/create/challenge");
                      } else {
                        setShow(true);
                      }
                    }}
                  ></PrimaryButton>
                  {showInfo && (
                    <div className="information-text">
                      <span>
                        {t("*Only registered organizations can do this!")}
                      </span>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="time-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <Row>
              <Col
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className="timer-image-container"
              >
                <img alt="" src="/images/timer.png"></img>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title">
                  <span>{t("launch_challenge_title")}</span>
                </div>
                <div className="description">
                  <span>{t("launch_challenge_description")}</span>
                </div>
                <div className="button-container">
                  <PrimaryButton
                    variant="primary"
                    text={t("launch_challenge_button_text")}
                    onClick={() => {
                      if (!is_logged_in) {
                        history.push("/login");
                      } else if (is_organisation) {
                        history.push("/create/challenge");
                      } else {
                        setShow(true);
                      }
                    }}
                  ></PrimaryButton>
                  {showInfo && (
                    <div className="information-text">
                      <span>
                        {t("*Only registered organizations can do this!")}
                      </span>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="expert-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title">
                  <span>{t("challenege_expert_title")}</span>
                </div>
                <div className="description">
                  <span>{t("challenege_expert_description")}</span>
                </div>
                <div className="button-container">
                  <PrimaryButton
                    variant="light"
                    text={t("challenege_expert_button_text")}
                    onClick={() => {}}
                  ></PrimaryButton>
                </div>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className="live-image-container"
              >
                <img alt="" src="/images/live.png"></img>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="expect-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={8} md={10} sm={12} xs={12}>
            <Row>
              <Col>
                <div className="title">
                  <span>{t("expect_title")}</span>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/platform.png"></img>
              </Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">{t("expect_description_1")}</span>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={1} md={1} sm={1} xs={1}></Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">{t("expect_description_2")}</span>
              </Col>
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/solver.png"></img>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/live-1.png"></img>
              </Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">{t("expect_description_3")}</span>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
            </Row>
            <Row className="justify-content-center align-items-center content-bar">
              <Col lg={1} md={1} sm={1} xs={1}></Col>
              <Col lg={8} md={8} sm={6} xs={6}>
                <span className="text">{t("expect_description_4")}</span>
              </Col>
              <Col lg={2} md={2} sm={4} xs={4} className="image-container">
                <img alt="" src="/images/knowledge-base.png"></img>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </MainContainer>
  );
};

export default HowItWorks;

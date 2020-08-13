import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ChallengesList from "../allChallenges/subComponents/challengesList";
import { MainContainer } from "./style";
import { PrimaryButton } from "../common";
import { Constants } from "../../lib/constant";

const Home = ({ history }) => {
  const { t } = useTranslation();
  const is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION,
    is_startup_Individual =
      localStorage.getItem("userRole") === Constants.ROLES.STARTUP_INDIVIDUAL,
    is_logged_in = localStorage.getItem("token");
  const [showOrganisationInfo, setOrganisationInfoShow] = useState(false);
  const [showStartupInfo, setStartupInfoShow] = useState(false);

  return (
    <MainContainer>
      <div className="home-container">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10}>
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="title">
                  <span>{t("home_title")}</span>
                </div>
                <div className="description">
                  <span>{t("home_description")}</span>
                  <br />
                  <Link to="/">{t("home_link")}</Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="blocks">
        <Row className="justify-content-center align-items-center">
          <Col lg={10} md={10} sm={10} xs={10} style={{ padding: "0px" }}>
            <Row>
              <Col
                lg={4}
                md={6}
                sm={12}
                xs={12}
                style={{ padding: "10px 15px" }}
              >
                <div className="box-container">
                  <div className="image-container">
                    <img alt="" src="/images/idea1.png" />
                  </div>
                  <div className="box-title">
                    <span>{t("Challenge The World")}</span>
                  </div>
                  <div className="description">
                    <span>
                      {t(
                        "Organizations with a challenge seeking innovative solutions"
                      )}
                    </span>
                  </div>
                  <div className="button-container">
                    <PrimaryButton
                      variant="primary"
                      text={t("Create Challenge")}
                      onClick={() => {
                        if (!is_logged_in) {
                          history.push("/login");
                        } else if (is_organisation) {
                          history.push("/create/challenge/1");
                        } else {
                          setOrganisationInfoShow(true);
                        }
                      }}
                    ></PrimaryButton>
                    {showOrganisationInfo && (
                      <div className="information-text">
                        <span>
                          {t("*Only registered organizations can do this!")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col
                lg={4}
                md={6}
                sm={12}
                xs={12}
                style={{ padding: "10px 15px" }}
              >
                <div className="box-container">
                  <div className="image-container">
                    <img alt="" src="/images/solver.png" />
                  </div>
                  <div className="box-title">
                    <span>{t("Challenge Yourself")}</span>
                  </div>
                  <div className="description">
                    <span>
                      {t(
                        "Individuals or groups looking to solve innovative challenges"
                      )}
                    </span>
                  </div>
                  <div className="button-container">
                    <PrimaryButton
                      variant="primary"
                      text={t("Solve Challenge")}
                      onClick={() => {
                        if (!is_logged_in || is_startup_Individual) {
                          history.push("/all/challenges");
                        } else {
                          setStartupInfoShow(true);
                        }
                      }}
                    ></PrimaryButton>
                    {showStartupInfo && (
                      <div className="information-text">
                        <span>
                          {t("*Only registered individuals can do this!")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="challenge-list">
        <ChallengesList history={history} />
      </div>
    </MainContainer>
  );
};

export default Home;

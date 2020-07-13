import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import { PrimaryButton } from "../common";

const ChallengeAgreement = ({ history }) => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={12}>
          <div className="header-container">
            <div
              className="back-container"
              onClick={() => {
                history.goBack();
              }}
            >
              {"<"}
            </div>
            <div className="avtar-container">
              <img src="/images/image.svg" alt="" height="25px" width="25px" />
            </div>
            <div className="user-name">Rio Tinto</div>
          </div>
          <div className="challenge-title">Challenge Title Here</div>
          <div className="sub-header-container">
            <div className="agreement-text">
              {t("Challenge-Specific Agreement")}
            </div>
            <div className="button-container">
              <PrimaryButton
                text={t("dont_accept_agreement")}
                variant="light"
              />
              <PrimaryButton text={t("accept_agreement")} variant="primary" />
            </div>
          </div>
          <div className="agreement">
            Imagine a rover the size of your Roomba® crawling the moon’s
            surface. These small rovers developed by NASA and commercial
            partners provide greater mission flexibility and allow NASA to
            collect key information about the lunar surface. However, existing
            science payloads are too big, too heavy, and require too much power
            for these rovers and new, miniaturized payload designs are needed.
            Payloads need to be similar in size to a new bar of soap to fit
            cleanly inside the rover (maximum external dimensions: 100mm x 100mm
            x 50mm).
            <br />
            <br />
            This ideation challenge will award $160,000 total in prizes across
            two categories. This ideation challenge is expected to be followed
            by new challenges to prototype, test, and deliver these miniaturized
            payloads. This larger effort will generate a maturation pipeline of
            next-generation instruments, sensors, and experiments that can be
            used for lunar exploration over the next few years.
            <br />
            <br />
            Imagine a rover the size of your Roomba® crawling the moon’s
            surface. These small rovers developed by NASA and commercial
            partners provide greater mission flexibility and allow NASA to
            collect key information about the lunar surface. However, existing
            science payloads are too big, too heavy, and require too much power
            for these rovers and new, miniaturized payload designs are needed.
            Payloads need to be similar in size to a new bar of soap to fit
            cleanly inside the rover (maximum external dimensions: 100mm x 100mm
            x 50mm).
            <br />
            <br />
            This ideation challenge will award $160,000 total in prizes across
            two categories. This ideation challenge is expected to be followed
            by new challenges to prototype, test, and deliver these miniaturized
            payloads. This larger effort will generate a maturation pipeline of
            next-generation instruments, sensors, and experiments that can be
            used for lunar exploration over the next few years. Imagine a rover
            the size of your Roomba® crawling the moon’s surface. These small
            rovers developed by NASA and commercial partners provide greater
            mission flexibility and allow NASA to collect key information about
            the lunar surface. However, existing science payloads are too big,
            too heavy, and require too much power for these rovers and new,
            miniaturized payload designs are needed. Payloads need to be similar
            in size to a new bar of soap to fit cleanly inside the rover
            (maximum external dimensions: 100mm x 100mm x 50mm).
            <br />
            <br />
            This ideation challenge will award $160,000 total in prizes across
            two categories. This ideation challenge is expected to be followed
            by new challenges to prototype, test, and deliver these miniaturized
            payloads. This larger effort will generate a maturation pipeline of
            next-generation instruments, sensors, and experiments that can be
            used for lunar exploration over the next few years. Imagine a rover
            the size of your Roomba® crawling the moon’s surface. These small
            rovers developed by NASA and commercial partners provide greater
            mission flexibility and allow NASA to collect key information about
            the lunar surface. However, existing science payloads are too big,
            too heavy, and require too much power for these rovers and new,
            miniaturized payload designs are needed. Payloads need to be similar
            in size to a new bar of soap to fit cleanly inside the rover
            (maximum external dimensions: 100mm x 100mm x 50mm).
            <br />
            <br />
            This ideation challenge will award $160,000 total in prizes across
            two categories. This ideation challenge is expected to be followed
            by new challenges to prototype, test, and deliver these miniaturized
            payloads. This larger effort will generate a maturation pipeline of
            next-generation instruments, sensors, and experiments that can be
            used for lunar exploration over the next few years. Imagine a rover
            the size of your Roomba® crawling the moon’s surface. These small
            rovers developed by NASA and commercial partners provide greater
            mission flexibility and allow NASA to collect key information about
            the lunar surface. However, existing science payloads are too big,
            too heavy, and require too much power for these rovers and new,
            miniaturized payload designs are needed. Payloads need to be similar
            in size to a new bar of soap to fit cleanly inside the rover
            (maximum external dimensions: 100mm x 100mm x 50mm).
            <br />
            <br />
            This ideation challenge will award $160,000 total in prizes across
            two categories. This ideation challenge is expected to be followed
            by new challenges to prototype, test, and deliver these miniaturized
            payloads. This larger effort will generate a maturation pipeline of
            next-generation instruments, sensors, and experiments that can be
            used for lunar exploration over the next few years. Imagine a rover
            the size of your Roomba® crawling the moon’s surface. These small
            rovers developed by NASA and commercial partners provide greater
            mission flexibility and allow NASA to collect key information about
            the lunar surface. However, existing science payloads are too big,
            too heavy, and require too much power for these rovers and new,
            miniaturized payload designs are needed. Payloads need to be similar
            in size to a new bar of soap to fit cleanly inside the rover
            (maximum external dimensions: 100mm x 100mm x 50mm).
            <br />
            <br />
            This ideation challenge will award $160,000 total in prizes across
            two categories. This ideation challenge is expected to be followed
            by new challenges to prototype, test, and deliver these miniaturized
            payloads. This larger effort will generate a maturation pipeline of
            next-generation instruments, sensors, and experiments that can be
            used for lunar exploration over the next few years.
          </div>
          <div className="float-right">
            <div className="button-container">
              <PrimaryButton
                text={t("dont_accept_agreement")}
                variant="light"
              />
              <PrimaryButton text={t("accept_agreement")} variant="primary" />
            </div>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default ChallengeAgreement;

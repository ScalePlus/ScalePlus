import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../../../common";
import { MainContainer } from "./style";
import Subscribe from "../subscribeModal";

const SubscribeHeader = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  return (
    <MainContainer>
      <div className="subscribe-container">
        <Row className="justify-content-center">
          <Col lg={4} md={8} sm={12} xs={12}>
            <Row>
              <Col>
                <span className="text">{t("footer_subscription_title")}</span>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <div className="button-container">
                  <PrimaryButton
                    variant="light"
                    text={t("Subscribe")}
                    onClick={() => {
                      setShow(true);
                    }}
                  ></PrimaryButton>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Subscribe show={show} setShow={setShow} />
    </MainContainer>
  );
};

export default SubscribeHeader;

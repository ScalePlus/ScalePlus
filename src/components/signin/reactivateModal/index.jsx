import React from "react";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../../common";
import { Modal, Row, Col } from "react-bootstrap";
import { HeaderContainer, ContentContainer } from "./style";

function ReActiveUserModal({ show, setShow }) {
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="subscribe-modal"
      centered
    >
      <Modal.Header>
        <HeaderContainer>
          <span>{t("Reactivate Account")}</span>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <ContentContainer>
              <Row>
                <Col>
                  <div className="subscribed-text">
                    <span>{t("reactive_user_description")}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text={t("Yes")}
                    onClick={() => {
                      setShow(false);
                    }}
                  ></PrimaryButton>
                </Col>
                <Col>
                  <PrimaryButton
                    variant="secondary"
                    text={t("No")}
                    onClick={() => {
                      setShow(false);
                    }}
                  ></PrimaryButton>
                </Col>
              </Row>
            </ContentContainer>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ReActiveUserModal;

import React from "react";
import { Modal, Row, Col, Alert } from "react-bootstrap";
import { PrimaryButton } from "../../common";
import { HeaderContainer, ContentContainer } from "./style";

const DeleteUserModal = ({ t, show, setShow, errors, onDelete }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="disqualify-modal"
      centered
    >
      <Modal.Header>
        <HeaderContainer>
          <span>{t("Delete Account")}</span>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Body>
        {errors && errors.length ? (
          <Row className="justify-content-center">
            <Col lg={12} md={12} sm={12} xs={12}>
              <Alert variant={"danger"} className="text-left">
                {errors.map((each, index) => {
                  return <div key={index}>{each}</div>;
                })}
              </Alert>
            </Col>
          </Row>
        ) : null}
        <Row className="justify-content-center">
          <Col>
            <ContentContainer>
              <div className="bold-text">{t("delete_user_modal_title")}</div>
              <div className="small-text">
                {t("delete_user_modal_sub_title")}
              </div>

              <div className="button-container">
                <PrimaryButton
                  variant="danger_light"
                  text={t("delete_user_modal_yes")}
                  onClick={() => {
                    onDelete();
                  }}
                ></PrimaryButton>
                <PrimaryButton
                  variant="secondary"
                  text={t("Cancel")}
                  onClick={() => {
                    setShow(false);
                  }}
                ></PrimaryButton>
              </div>
            </ContentContainer>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(DeleteUserModal);

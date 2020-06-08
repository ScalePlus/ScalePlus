import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { PrimaryButton } from "../../../../common";
import { HeaderContainer, ContentContainer } from "./style";

const DisqualifyModal = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="disqualify-modal"
    >
      <Modal.Header>
        <HeaderContainer>
          <span>Disqualify Submission</span>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col>
            <ContentContainer>
              <div className="bold-text">
                You are about to Disqualify this submission! you canont undo
                this!
              </div>
              <div className="small-text">
                Derived from Latin dolorem ipsum (“pain itself”), Lorem Ipsum is
                filler text used by publishers and graphic designers used to
                demonstrate graphic elements.
              </div>

              <div className="button-container">
                <PrimaryButton
                  variant="danger_light"
                  text={"Yes, Disqualify"}
                  onClick={() => {
                    setShow(false);
                  }}
                ></PrimaryButton>
                <PrimaryButton
                  variant="secondary"
                  text={"Cancel"}
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
export default React.memo(DisqualifyModal);

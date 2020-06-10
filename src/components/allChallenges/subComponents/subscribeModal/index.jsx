import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { Input, PrimaryButton } from "../../../common";
import { HeaderContainer, ContentContainer } from "./style";

const Subscribe = ({ show, setShow }) => {
  const [subscribed, changeSubscribed] = useState(false);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="subscribe-modal"
      centered
    >
      <Modal.Header>
        <HeaderContainer>
          <span>Subscribe to Newsletter</span>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <ContentContainer>
              {subscribed ? (
                <>
                  <Row>
                    <Col>
                      <div className="subscribed-text">
                        <span>Successfully Subscribed</span>
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                      ></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className="help-text">
                        Scale+ respect your privacy, we will never share your
                        details with anyone
                      </span>
                    </Col>
                  </Row>
                </>
              )}
              <Row>
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text={subscribed ? "close" : "Subscribe"}
                    onClick={() => {
                      if (subscribed) {
                        setShow(false);
                        changeSubscribed(false);
                      } else {
                        changeSubscribed(true);
                      }
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
};
export default React.memo(Subscribe);

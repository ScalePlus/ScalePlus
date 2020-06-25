import React, { useState, useCallback, useEffect } from "react";
import { Modal, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { doSubscriptionAction } from "../../action";
import { Input, PrimaryButton } from "../../../common";
import { HeaderContainer, ContentContainer } from "./style";

const Subscribe = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const doSubscriptionMethod = useCallback(
    (data) => dispatch(doSubscriptionAction(data)),
    [dispatch]
  );

  const allChallengesReducer = useSelector((state) => {
    return state.allChallengesReducer;
  });

  const [subscribed, changeSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const {
      error,
      subscriptionError,
      subscriptionSuccess,
    } = allChallengesReducer;
    if (subscriptionSuccess && email && !subscribed) {
      changeSubscribed(true);
      setEmail("");
    }

    if (subscriptionError) {
      let errors = [];
      if (Array.isArray(subscriptionError)) {
        errors = subscriptionError;
      } else if (typeof subscriptionError === "string") {
        errors.push(subscriptionError);
      }
      setErrors(errors);
    }

    if (error) {
      let errors = [];
      if (Array.isArray(error)) {
        errors = error;
      } else if (typeof error === "string") {
        errors.push(error);
      }
      setErrors(errors);
    }
  }, [allChallengesReducer, email, subscribed]);

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
              {errors && errors.length ? (
                <Row>
                  <Col>
                    <Alert variant={"danger"} className="text-left">
                      {errors.map((each, index) => {
                        return <div key={index}>{each}</div>;
                      })}
                    </Alert>
                  </Col>
                </Row>
              ) : null}
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
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
                    disabled={!email && !subscribed}
                    onClick={() => {
                      if (subscribed) {
                        setShow(false);
                        changeSubscribed(false);
                      } else {
                        doSubscriptionMethod({ email });
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

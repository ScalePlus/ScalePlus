import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Row, Col, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sharelinkAction } from "./action";
import { Input, PrimaryButton, Loading } from "../common";
import { HeaderContainer, ContentContainer } from "./style";

const ShareAsEmail = ({ show, setShow }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sharelinkMethod = useCallback(
    (data, changeMailRes, setEmail) =>
      dispatch(sharelinkAction(data, changeMailRes, setEmail)),
    [dispatch]
  );

  const sharelinkReducer = useSelector((state) => {
    return state.sharelinkReducer;
  });

  const [mailSent, changeMailRes] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const { error, success } = sharelinkReducer;

    if (success && email && !mailSent) {
      setErrors([]);
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
  }, [sharelinkReducer, email, mailSent]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="subscribe-modal"
      centered
    >
      <Modal.Header>
        <HeaderContainer>
          <span>{t("Share as Email")}</span>
        </HeaderContainer>
      </Modal.Header>
      <Modal.Body>
        {sharelinkReducer.loading && <Loading />}
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
              {mailSent ? (
                <>
                  <Row>
                    <Col>
                      <div className="subscribed-text">
                        <span>{t("Mail sent Successfully")}</span>
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
                        placeholder={t("Enter your email")}
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
                        {t(
                          "Scale+ respect your privacy, we will never share your details with anyone"
                        )}
                      </span>
                    </Col>
                  </Row>
                </>
              )}
              <Row>
                <Col>
                  <PrimaryButton
                    variant="primary"
                    text={mailSent ? t("Close") : t("Send")}
                    disabled={!email && !mailSent}
                    onClick={() => {
                      if (mailSent) {
                        setShow(false);
                        changeMailRes(false);
                      } else {
                        sharelinkMethod(
                          {
                            email,
                            pathname: window.location.pathname,
                          },
                          changeMailRes,
                          setEmail
                        );
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
export default React.memo(ShareAsEmail);

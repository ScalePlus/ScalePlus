import React, {
  useState,
  // useCallback, useEffect
} from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  //  Alert
} from "react-bootstrap";
import {
  // Input,
  PrimaryButton,
} from "../common";
// import { useDispatch, useSelector } from "react-redux";
// import { doSubscriptionAction } from "../allChallenges/action";
import { MainContainer } from "./style";
import history from "../../history";
import { Constants } from "../../lib/constant";
import Subscribe from "../allChallenges/subComponents/subscribeModal";
// const groups = [
//   "/images/Al-Futtaim_Group_DL_logo.svg",
//   "/images/Al-Futtaim_Group_DL_logo.svg",
//   "/images/Al-Futtaim_Group_DL_logo.svg",
//   "/images/Al-Futtaim_Group_DL_logo.svg",
//   "/images/Al-Futtaim_Group_DL_logo.svg",
//   "/images/Al-Futtaim_Group_DL_logo.svg",
// ];

const Footer = ({ t }) => {
  // const dispatch = useDispatch();
  // const doSubscriptionMethod = useCallback(
  //   (data, changeSubscribed, setEmail) =>
  //     dispatch(doSubscriptionAction(data, changeSubscribed, setEmail)),
  //   [dispatch]
  // );

  // const allChallengesReducer = useSelector((state) => {
  //   return state.allChallengesReducer;
  // });

  // const [errors, setErrors] = useState([]);
  // const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const is_admin =
    localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
    localStorage.getItem("token");
  // useEffect(() => {
  //   const { subscriptionError } = allChallengesReducer;

  //   let errors = [];
  //   if (Array.isArray(subscriptionError)) {
  //     errors = subscriptionError;
  //   } else if (typeof subscriptionError === "string") {
  //     errors.push(subscriptionError);
  //   }
  //   setErrors(errors);
  // }, [allChallengesReducer, email]);

  return (
    <MainContainer>
      {/* <div className="group-container">
        <Row>
          <Col>
            <div className="groups">
              {groups.map((each, index) => {
                return (
                  <div key={index}>
                    <img src={each} height={80} width={170} alt="" />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </div> */}

      {!is_admin && (
        <Row className="subscribe-container">
          <Col lg={9} md={9} sm={9} xs={9}>
            {/* {errors && errors.length ? (
              <Alert variant={"danger"} className="text-left">
                {errors.map((each, index) => {
                  return <div key={index}>{each}</div>;
                })}
              </Alert>
            ) : null} */}
            <div className="content-container">
              <div className="text">
                <span>{t("footer_subscription_title")}</span>
              </div>
              <div className="subscribe-button-container">
                <PrimaryButton
                  variant="light"
                  text={t("Subscribe")}
                  onClick={() => {
                    setShow(true);
                  }}
                ></PrimaryButton>
              </div>
              {/* <div className="form-container">
                <Input
                  type="email"
                  placeholder={t("Your email address")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <PrimaryButton
                  variant="light"
                  text={t("Subscribe")}
                  onClick={() => {
                    doSubscriptionMethod({ email }, null, setEmail);
                  }}
                ></PrimaryButton>
              </div> */}
            </div>
          </Col>
        </Row>
      )}

      <Row
        className="justify-content-center"
        style={{ marginBottom: 25, marginTop: is_admin ? 70 : 0 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row className="align-items-center middle-container">
            <Col
              lg={{ span: 2, offset: 1 }}
              md={{ span: 2, offset: 1 }}
              sm={{ span: 3, offset: 1 }}
              xs={{ span: 5, offset: 1 }}
            >
              <div
                className="logo-container"
                onClick={() => {
                  history.push("/home");
                }}
              >
                <img
                  src={"/images/scaleplus-logo.png"}
                  height="45px"
                  width="188px"
                  alt=""
                ></img>
              </div>
            </Col>
            <Col
              lg={{ span: 7, offset: 1 }}
              md={{ span: 8, offset: 1 }}
              sm={{ span: 7, offset: 1 }}
              xs={{ span: 5, offset: 1 }}
            >
              <div className="links-container">
                <div>
                  <div className="link">
                    <Link to="/workflow">{t("How It Works")}</Link>
                  </div>
                  <div className="link">
                    <Link to="/">{t("Careers")}</Link>
                  </div>
                  <div className="link">
                    <Link to="/">{t("Contact Us")}</Link>
                  </div>
                </div>
                <div>
                  <div className="link">
                    <Link to="/">{t("Organizations Involved")}</Link>
                  </div>
                  <div className="link">
                    <Link to="/">{t("Challenge Ideas")}</Link>
                  </div>
                  <div className="link">
                    <Link to="/">{t("Events & Webinars")}</Link>
                  </div>
                </div>
                <div>
                  <div className="link">
                    <Link to="/">{t("Pricing")}</Link>
                  </div>
                  <div className="link">
                    <Link to="/">{t("Partnerships")}</Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ marginBottom: 20 }}>
        <Col>
          <div className="sub-links-container">
            <div className="link">
              <Link to="/">{t("Privacy Policy")}</Link>
            </div>
            <div className="link">
              <Link to="/">{t("Cookies Policy")}</Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <div className="social-links-container">
            <div className="link">
              <Link to="/">{t("@Scaleplus")}</Link>
            </div>
            <div className="links">
              <div className="circle-container">
                <img
                  src={"/images/facebook.svg"}
                  height="15px"
                  width="15px"
                  alt=""
                ></img>
              </div>
              <div className="circle-container">
                <img
                  src={"/images/twitter.svg"}
                  height="15px"
                  width="15px"
                  alt=""
                ></img>
              </div>
              <div className="circle-container">
                <img
                  src={"/images/linkedin.svg"}
                  height="15px"
                  width="15px"
                  alt=""
                ></img>
              </div>
              <div className="circle-container">
                <img
                  src={"/images/whatsapp.svg"}
                  height="15px"
                  width="15px"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Subscribe show={show} setShow={setShow} />
    </MainContainer>
  );
};
export default Footer;

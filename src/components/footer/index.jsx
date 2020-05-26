import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";

export default function Footer() {
  return (
    <MainContainer>
      <Row style={{ marginBottom: 70 }}>
        <Col>
          <div className="group-container"></div>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ marginBottom: 25 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row className="align-items-center middle-container">
            <Col
              lg={{ span: 2, offset: 1 }}
              md={{ span: 2, offset: 1 }}
              sm={{ span: 3, offset: 1 }}
              xs={{ span: 5, offset: 1 }}
            >
              <div className="logo-container">
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
                    <Link to="/">How It Works</Link>
                  </div>
                  <div className="link">
                    <Link to="/">Careers</Link>
                  </div>
                  <div className="link">
                    <Link to="/">Contact Us</Link>
                  </div>
                </div>
                <div>
                  <div className="link">
                    <Link to="/">Organizations Involved</Link>
                  </div>
                  <div className="link">
                    <Link to="/">Challenge Ideas</Link>
                  </div>
                  <div className="link">
                    <Link to="/">Events & Webinars</Link>
                  </div>
                </div>
                <div>
                  <div className="link">
                    <Link to="/">Pricing</Link>
                  </div>
                  <div className="link">
                    <Link to="/">Partnerships</Link>
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
              <Link to="/">Privacy Policy</Link>
            </div>
            <div className="link">
              <Link to="/">Cookies Policy</Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <div className="social-links-container">
            <div className="link">
              <Link to="/">@Scaleplus</Link>
            </div>
            <div className="links">
              <div className="circle-container">
                <img
                  src={"/images/facebook.svg"}
                  height="20px"
                  width="20px"
                  alt=""
                ></img>
              </div>
              <div className="circle-container">
                <img
                  src={"/images/twitter.svg"}
                  height="20px"
                  width="20px"
                  alt=""
                ></img>
              </div>
              <div className="circle-container">
                <img
                  src={"/images/linkedin.svg"}
                  height="20px"
                  width="20px"
                  alt=""
                ></img>
              </div>
              <div className="circle-container">
                <img
                  src={"/images/whatsapp.svg"}
                  height="20px"
                  width="20px"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
}

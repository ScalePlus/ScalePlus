import React from "react";
import { PageTitle } from "../common";
import { Row, Col } from "react-bootstrap";
const tabs = [
  {
    src: "/images/idea.svg",
    title: "IDEAS",
    description: `Out-Of-Box Thinking, Market Research, Testimonials, Surveys,
    Novel Ideas, Insights`,
  },
  {
    src: "/images/product.svg",
    title: "PRODUCTS",
    description: "Final Product, Robust, Ready to-go Live",
  },
  {
    src: "/images/prototype.svg",
    title: "PROTOTYPES",
    description: "Full-Scale, Single Production, Hardware or Software",
  },
];

const Step1 = ({ setActiveStep }) => {
  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>WHAT ARE YOU LOOKING FOR?</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <PageTitle
              text="Have A Business Problem? Launch a Challenge to Get Innovative
            Solutions"
            />
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>First, Select What Type Of Solution You Are Looking For.</Col>
        </Row>
        <Row className="tabs-container">
          {tabs.map((each, index) => {
            return (
              <Col lg={4} md={4} sm={4} xs={12} key={index}>
                <div
                  className="box-container"
                  onClick={() => {
                    setActiveStep(1);
                  }}
                >
                  <div className="image-container">
                    <img
                      src={each.src}
                      height="120px"
                      width="120px"
                      alt=""
                    ></img>
                  </div>
                  <div className="tab-title">{each.title}</div>
                  <div className="description">{each.description}</div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row className="right-content-container">
          <Col>You can always edit this information later</Col>
        </Row>
        <Row className="bottom-container">
          <Col>
            Need Help? or Looking for custom solution?{" "}
            <span className="contact-link">Contact Us</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(Step1);

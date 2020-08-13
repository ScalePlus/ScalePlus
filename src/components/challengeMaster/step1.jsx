import React from "react";
import { PageTitle } from "../common";
import { Row, Col } from "react-bootstrap";

const Step1 = ({ t, typeOfSolution, setTypeOfSolution, history }) => {
  const tabs = [
    {
      src: "/images/idea.svg",
      title: t("IDEAS"),
      description: t("IDEAS_description"),
    },
    {
      src: "/images/product.svg",
      title: t("PRODUCTS"),
      description: t("PRODUCTS_description"),
    },
    {
      src: "/images/prototype.svg",
      title: t("PROTOTYPES"),
      description: t("PROTOTYPES_description"),
    },
  ];

  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>{t("STEP1_title")}</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <PageTitle text={t("STEP1_pagetitle")} />
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>{t("STEP1_subtitle")}</Col>
        </Row>
        <Row className="tabs-container">
          {tabs.map((each, index) => {
            return (
              <Col lg={4} md={4} sm={4} xs={12} key={index}>
                <div
                  className={
                    typeOfSolution === each.title
                      ? "step-box-container active"
                      : "step-box-container"
                  }
                  onClick={() => {
                    history.push("/create/challenge/2");
                    setTypeOfSolution(each.title);
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
          <Col>{t("You can always edit this information later")}</Col>
        </Row>
        <Row className="bottom-container">
          <Col>
            {t("Need_Help_Text")}{" "}
            <span className="contact-link">{t("Contact Us")}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(Step1);

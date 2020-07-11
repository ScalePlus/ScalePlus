import React from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "react-bootstrap";
import { PrimaryButton, Switch } from "../common";
import { MainContainer } from "./style";

function UserProfileView({ history }) {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={10}>
          <div className="title-container">
            <div className="title">
              <div
                className="title-label"
                onClick={() => {
                  history.goBack();
                }}
              >
                {t("< User Profile")}
              </div>
              <div className="status-container">Invited</div>
            </div>
            <div className="button-container">
              <PrimaryButton text={t("Reject")} variant="danger_light" />
              <PrimaryButton text={t("Accept")} variant="primary" />
            </div>
          </div>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Basic information")}</div>
              </Col>
            </Row>
            <Row>
              <Col className="avtar-container">
                <div className="circule-contaier">
                  <img
                    src={"/images/image.svg"}
                    height="50px"
                    width="50px"
                    alt=""
                  ></img>
                </div>
                <div className="info-container">
                  <Row>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">
                          {t("Organization Name")}
                        </div>
                        <div>{t("Organization Name")}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Email") + " *"}</div>
                        <div>{t("Email") + " *"}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Website Name")}</div>
                        <div>{t("Website Name")}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Location")}</div>
                        <div>{t("Location")}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">
                          {t("Establishment Date")}
                        </div>
                        <div>{t("Establishment Date")}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Phone Number")}</div>
                        <div>{t("Phone Number")}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">
                          {t("First name") + " *"}
                        </div>
                        <div>{t("First name") + " *"}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Last name") + " *"}</div>
                        <div>{t("Last name") + " *"}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Mobile Number")}</div>
                        <div>{t("Mobile Number")}</div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <div className="field-container">
                        <div className="bold-text">{t("Birth Date")}</div>
                        <div>{t("Birth Date")}</div>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "1rem" }}>
                    <Col>
                      <div className="bold-text">{t("inspires_text")}</div>
                      <div>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal. It is a long
                        established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed
                        to using.
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="border-container"></div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="bold-text">{t("Bio")}</div>
                      <div>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal. It is a long
                        established fact that a reader will be distracted by the
                        readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed
                        to using.
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Business Tags")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Industry")}</div>
                    <div>Advertising/Public Relations</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">
                      {t("Sevices / products you offer")}
                    </div>
                    <div>Advertising/Public Relations</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Technologies")}</div>
                    <div>Advertising/Public Relations</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Business Model")}</div>
                    <div>Advertising/Public Relations</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Target Market")}</div>
                    <div>Advertising/Public Relations</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Geographical Market")}</div>
                    <div>Advertising/Public Relations</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Business Information")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Industry")}</div>
                    <div>Industry</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Sub Industry")}</div>
                    <div>Sub Industry</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Market/ Locations")}</div>
                    <div>Market/ Locations</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Business Model")}</div>
                    <div>Business Model</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Market Segment")}</div>
                    <div>Market Segment</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Top Customers")}</div>
                    <div>Top Customers</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Human Capital")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Size")}</div>
                    <div>Size</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Founders")}</div>
                    <div>Founders</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Departments")}</div>
                    <div>Departments</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Financials")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Revenue")}</div>
                    <div>Revenue</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Cost")}</div>
                    <div>Cost</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("EBTIDA")}</div>
                    <div>EBTIDA</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Operational")}</div>
                    <div>Operational</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Funding")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Rounds")}</div>
                    <div>Rounds</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Investors")}</div>
                    <div>Investors</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Equity Structure")}</div>
                    <div>Equity Structure</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Technology")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("FrontEnd")}</div>
                    <div>FrontEnd</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("BackEnd")}</div>
                    <div>BackEnd</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Other")}</div>
                    <div>Other</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Marketing")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Social links")}</div>
                    <div>Social links</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Number of likes")}</div>
                    <div>Number of likes</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Reactions")}</div>
                    <div>Reactions</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Operations")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={6} md={6} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("Top KPIs")}</div>
                    <div>Top KPIs</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("M&A")}</div>
              </Col>
            </Row>
            <div className="info-container">
              <Row style={{ marginTop: 20 }}>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("M&A_Q1")}</div>
                    <div>{t("M&A_Q1")}</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("M&A_Q2")}</div>
                    <div>{t("M&A_Q2")}</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("M&A_Q3")}</div>
                    <div>{t("M&A_Q3")}</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("M&A_Q4")}</div>
                    <div>{t("M&A_Q4")}</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("M&A_Q5")}</div>
                    <div>{t("M&A_Q5")}</div>
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="field-container">
                    <div className="bold-text">{t("M&A_Q6")}</div>
                    <div>{t("M&A_Q6")}</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Consulting")}</div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <Switch variant="primary" label={t("Consulting_description")} />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default UserProfileView;

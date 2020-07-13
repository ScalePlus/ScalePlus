import React from "react";
import { useTranslation } from "react-i18next";
import { Form, Row, Col } from "react-bootstrap";
import {
  Input,
  DropDown,
  DateInput,
  TextArea,
  PrimaryButton,
  CheckBox,
} from "../common";
import { MainContainer } from "./style";

const UserProfileEdit = () => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={9} md={10} sm={10}>
          <div className="title">{t("Edit Profile")}</div>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Basic information")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
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
                <div className="replace-link">{t("replace")}</div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Organization Name")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="email" label={t("Email") + " *"}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Website Name")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <DropDown
                  isSmall={true}
                  isSelectOnly={true}
                  isSingle={true}
                  label={t("Location")}
                  placeholder=""
                  options={[
                    {
                      label: "United Arab Emirates",
                      value: 1,
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <DateInput isSmall={true} label={t("Establishment Date")} />
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Phone Number")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("First name") + " *"}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Last name") + " *"}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Mobile Number")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <DateInput isSmall={true} label={t("Birth Date")} />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextArea
                  rows="2"
                  label={t("inspires_text")}
                  description={t("Characters left") + ": 100"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextArea rows="4" label={t("Bio")} />
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Business Tags")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <DropDown
                  isSmall={true}
                  label={t("Industry")}
                  options={[]}
                  description={t("industry_description")}
                />
                <DropDown
                  isSmall={true}
                  label={t("Sevices / products you offer")}
                  options={[]}
                  description={t("max_tag_description")}
                />
                <DropDown
                  isSmall={true}
                  label={t("Technologies")}
                  options={[]}
                  description={t("max_tag_description")}
                />
                <DropDown
                  isSmall={true}
                  label={t("Business Model")}
                  options={[]}
                  description={t("max_tag_description")}
                />
                <DropDown
                  isSmall={true}
                  label={t("Target Market")}
                  options={[]}
                  description={t("max_tag_description")}
                />
                <DropDown
                  isSmall={true}
                  label={t("Geographical Market")}
                  options={[]}
                  description={t("max_tag_description")}
                />
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Business Information")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Industry")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Sub Industry")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Market/ Locations")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Business Model")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Market Segment")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Top Customers")}></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Human Capital")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Size")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Founders")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Departments")}></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Financials")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Revenue")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Cost")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("EBTIDA")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Operational")}></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Funding")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Rounds")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Investors")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Equity Structure")}></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Technology")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("FrontEnd")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("BackEnd")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Other")}></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Marketing")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Social links")}></Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Input type="number" label={t("Number of likes")}></Input>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Reactions")}></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Operations")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={6} md={6} sm={12}>
                <Input type="text" label={t("Top KPIs")}></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("M&A")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col lg={12} md={12} sm={12}>
                <Input
                  type="text"
                  label={t("M&A_Q1")}
                  description={t("Some text here")}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q2")}
                  description={t("Some text here")}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q3")}
                  description={t("Some text here")}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q4")}
                  description={t("Some text here")}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q5")}
                  description={t("Some text here")}
                ></Input>
                <Input
                  type="text"
                  label={t("M&A_Q6")}
                  description={t("Some text here")}
                ></Input>
              </Col>
            </Row>
          </Form>
          <Form className="box-container">
            <Row>
              <Col className="header-container">
                <div className="header-text">{t("Consulting")}</div>
                <div className="button-container">
                  <PrimaryButton text={t("Update")} variant="primary" />
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <CheckBox
                  id={`checkbox-1`}
                  checkBoxText={t("Consulting_description")}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default UserProfileEdit;

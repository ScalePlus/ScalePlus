import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import {
  Title,
  Description,
  DropDown,
  PrimaryButton,
  BackButton,
} from "../common";
import {
  industry,
  service,
  technology,
  businessModel,
  targetMarket,
  geographicalMarket,
} from "./options";

const BusinessTags = ({ history }) => {
  const [selectedIndustries, selectIndustry] = useState([]);
  const [selectedServices, selectService] = useState([]);
  const [selectedTechnologies, selectTechnology] = useState([]);
  const [selectedBusinessModels, selectBusinessModels] = useState([]);
  const [selectedTargetMarkets, selectTargetMarket] = useState([]);
  const [selectedGeographicalMarket, selectGeographicalMarket] = useState([]);
  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={5} md={10} sm={12}>
          <Row className="title-container">
            <Col>
              <Title text={"Business Tags"}></Title>
            </Col>
          </Row>

          <Row className="description-container">
            <Col>
              <Description>
                Select from the list below what fits your business
              </Description>
            </Col>
          </Row>

          <Row className="form-container">
            <Col>
              <Form>
                <DropDown
                  placeholder={"Industry"}
                  options={
                    industry &&
                    industry.length &&
                    industry.map((each) => {
                      return { value: each, label: each };
                    })
                  }
                  value={selectedIndustries}
                  onChange={(val) => {
                    selectIndustry(val);
                  }}
                />
                <DropDown
                  placeholder={"Sevices / products you offer"}
                  options={
                    service &&
                    service.length &&
                    service.map((each) => {
                      return { value: each, label: each };
                    })
                  }
                  value={selectedServices}
                  onChange={(val) => {
                    selectService(val);
                  }}
                />
                <DropDown
                  placeholder={"Technology"}
                  options={
                    technology &&
                    technology.length &&
                    technology.map((each) => {
                      return { value: each, label: each };
                    })
                  }
                  value={selectedTechnologies}
                  onChange={(val) => {
                    selectTechnology(val);
                  }}
                />
                <DropDown
                  placeholder={"Business Model"}
                  options={
                    businessModel &&
                    businessModel.length &&
                    businessModel.map((each) => {
                      return { value: each, label: each };
                    })
                  }
                  value={selectedBusinessModels}
                  onChange={(val) => {
                    selectBusinessModels(val);
                  }}
                />
              </Form>
            </Col>
          </Row>

          <Row>
            <Col className="market-label">
              <span>Market Details</span>
            </Col>
          </Row>

          <Row className="form-container">
            <Col>
              <Form>
                <DropDown
                  placeholder={"Target Market"}
                  options={
                    targetMarket &&
                    targetMarket.length &&
                    targetMarket.map((each) => {
                      return { value: each, label: each };
                    })
                  }
                  value={selectedTargetMarkets}
                  onChange={(val) => {
                    selectTargetMarket(val);
                  }}
                />
                <DropDown
                  placeholder={"Geographical Market"}
                  options={
                    geographicalMarket &&
                    geographicalMarket.length &&
                    geographicalMarket.map((each) => {
                      return { value: each, label: each };
                    })
                  }
                  value={selectedGeographicalMarket}
                  onChange={(val) => {
                    selectGeographicalMarket(val);
                  }}
                />
              </Form>
            </Col>
          </Row>

          <Row className="button-container">
            <Col lg={2} md={2} sm={2} xs={2}>
              <BackButton
                text={"Back"}
                onClick={() => {
                  history.goBack();
                }}
              ></BackButton>
            </Col>
            <Col lg={8} md={8} sm={8} xs={8}>
              <PrimaryButton
                text={"Essential Details"}
                onClick={() => {
                  history.push("/essential/detail");
                }}
              ></PrimaryButton>
            </Col>
            <Col lg={2} md={2} sm={2} xs={2} />
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default BusinessTags;

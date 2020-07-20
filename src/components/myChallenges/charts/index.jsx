import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import SplineChart from "../splineChart";
import PieChart from "../pieChart";

function Charts({ history }) {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={8} md={8} sm={12} xs={12}>
              <SplineChart t={t} history={history} />
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <PieChart t={t} history={history} />
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default Charts;

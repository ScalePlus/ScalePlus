import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import Users from "../userList";
import Activities from "../activityList";

function ListBlock({ history }) {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            <Col lg={6} md={6} sm={6} xs={6}>
              <Users t={t} history={history} />
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <Activities t={t} history={history} />
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default ListBlock;

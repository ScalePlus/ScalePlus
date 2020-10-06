import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { MainContainer } from "./style";
import Users from "../userList";
import Activities from "../activityList";
import { Constants } from "../../../lib/constant";

function ListBlock({ history }) {
  const { t } = useTranslation();
  const is_admin =
      localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
      localStorage.getItem("token"),
    is_organisation =
      localStorage.getItem("userRole") === Constants.ROLES.ORGANIZATION &&
      localStorage.getItem("token");
  return (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row>
            {is_admin || is_organisation ? (
              <Col lg={6} md={6} sm={12} xs={12}>
                <Users t={t} history={history} />
              </Col>
            ) : null}
            <Col lg={6} md={6} sm={12} xs={12}>
              <Activities t={t} history={history} />
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
}

export default ListBlock;

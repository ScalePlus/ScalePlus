import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponentWithSearchBox } from "../common";
import { MainContainer, TableContainer } from "./style";
import { Constants } from "../../../../lib/constant";

const Forum = ({
  t,
  is_organisation,
  organisationTeamMember,
  challengeData,
}) => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          {(is_organisation ||
            (organisationTeamMember &&
              organisationTeamMember.permission ===
                Constants.TEAM_PERMISSION.ADMIN)) &&
          challengeData &&
          !challengeData.isPublished ? (
            <HeaderComponentWithSearchBox
              titleText={t("Forum")}
              buttonText={t("New Topic")}
              t={t}
            />
          ) : (
            <HeaderComponentWithSearchBox titleText={t("Forum")} t={t} />
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment text-left"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          <TableContainer>
            <div className="table-header-container">
              <Row>
                <Col lg={8} md={8} sm={8} xs={4}>
                  <span>{t("Forum Sections")}</span>
                </Col>
                <Col lg={2} md={2} sm={2} xs={4}>
                  <span>{t("Threads")}</span>
                </Col>
                <Col lg={2} md={2} sm={2} xs={4} className="text-center">
                  <span>{t("Total Posts")}</span>
                </Col>
              </Row>
            </div>
            <div className="table-body-container">
              <span>{t("!!!Add Forum Plugin Here!!!")}</span>
            </div>
          </TableContainer>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Forum);

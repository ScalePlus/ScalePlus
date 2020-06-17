import React from "react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent, ExpandCollapse } from "../common";
import { MainContainer } from "./style";
import history from "../../../../history";

const Guidelines = ({ is_organisation, challengeData }) => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          {is_organisation ? (
            <HeaderComponent
              titleText="Guidelines"
              buttonText="Add New"
              buttonVariant="info"
              buttonClick={() => {
                history.push(`/challenge/${challengeData._id}/edit/Guidelines`);
              }}
            />
          ) : (
            <HeaderComponent titleText="Guidelines" />
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-center center-alignment"
        style={{ marginBottom: 80 }}
      >
        <Col lg={11} md={11} sm={11} xs={11}>
          {challengeData.guidelineId &&
          challengeData.guidelineId.data &&
          challengeData.guidelineId.data.length
            ? challengeData.guidelineId.data.map((each) => {
                return (
                  <ExpandCollapse
                    key={each._id}
                    title={each.title}
                    timestamp={
                      each.date
                        ? moment(each.date).format("MMMM DD, YYYY")
                        : null
                    }
                    description={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: each.description,
                        }}
                      />
                    }
                  />
                );
              })
            : null}
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Guidelines);

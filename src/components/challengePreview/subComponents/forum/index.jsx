import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponentWithSearchBox } from "../common";
import { MainContainer, TableContainer } from "./style";

const Forum = () => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponentWithSearchBox
            titleText="Forum"
            buttonText="New Topic"
          />
        </Col>
      </Row>
      <Row className="justify-content-center center-alignment text-left">
        <Col lg={11} md={11} sm={11} xs={11}>
          <TableContainer>
            <div className="table-header-container">
              <Row>
                <Col lg={8} md={8} sm={8} xs={4}>
                  <span>Forum Sections</span>
                </Col>
                <Col lg={2} md={2} sm={2} xs={4}>
                  <span>Threads</span>
                </Col>
                <Col lg={2} md={2} sm={2} xs={4} className="text-center">
                  <span>Total Posts</span>
                </Col>
              </Row>
            </div>
            <div className="table-body-container">
              <span>!!!Add Forum Plugin Here!!!</span>
            </div>
          </TableContainer>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Forum);

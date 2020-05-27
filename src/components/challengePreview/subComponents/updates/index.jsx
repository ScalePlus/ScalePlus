import React from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../common";
import { MainContainer, ContentContainer } from "./style";

const Updates = () => {
  return (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponent
            titleText="Updates"
            buttonText="Add New"
            buttonVariant="info"
          />
        </Col>
      </Row>
      <Row className="justify-content-center center-alignment">
        <Col lg={11} md={11} sm={11} xs={11}>
          <ContentContainer>
            <div className="collapse-container">
              <div className="content-container">
                <span className="title">Change iun deadline</span>
                <span className="timestamp">time/date stamp</span>
              </div>
              <div className="description">
                Lorem ipsum dolor sit amet, oportere prodesset at mei. Vel in
                tollit viderer pertinacia. Mel timeam corpora vituperatoribus
                ei. In inimicus sententiae interesset usu. Cu everti officiis
                sensibus cum, an theophrastus interpretaris pro. Ut eum aperiri
                atomorum.
              </div>
            </div>
          </ContentContainer>
          <ContentContainer>
            <div className="collapse-container">
              <div className="content-container">
                <span className="title">Adding new resources</span>
                <span className="timestamp">time/date stamp</span>
              </div>
              <div className="description">
                Lorem ipsum dolor sit amet, oportere prodesset at mei. Vel in
                tollit viderer pertinacia. Mel timeam corpora vituperatoribus
                ei. In inimicus sententiae interesset usu. Cu everti officiis
                sensibus cum, an theophrastus interpretaris pro. Ut eum aperiri
                atomorum. Lorem ipsum dolor sit amet, oportere prodesset at mei.
                Vel in tollit viderer pertinacia. Mel timeam corpora
                vituperatoribus ei. In inimicus sententiae interesset usu. Cu
                everti officiis sensibus cum, an theophrastus interpretaris pro.
                Ut eum aperiri atomorum. Lorem ipsum dolor sit amet, oportere
                prodesset at mei. Vel in tollit viderer pertinacia. Mel timeam
                corpora vituperatoribus ei. In inimicus sententiae interesset
                usu. Cu everti officiis sensibus cum, an theophrastus
                interpretaris pro. Ut eum aperiri.
              </div>
            </div>
          </ContentContainer>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default React.memo(Updates);

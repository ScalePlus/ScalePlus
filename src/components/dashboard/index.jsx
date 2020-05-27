import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./subComponents/sidebar";
import Content from "./subComponents/content";
import { MainContainer } from "./style";

const links = ["Dashboard", "Challenges", "Users"];

const Dashboard = ({ history }) => {
  const [activeKey, selectKey] = useState(links[0]);
  return (
    <MainContainer>
      <Row style={{ marginTop: 20 }}>
        <Col lg={2} md={3} sm={12} xs={12}>
          <Sidebar links={links} activeKey={activeKey} selectKey={selectKey} />
        </Col>
        <Col lg={10} md={9} sm={12} xs={12}>
          {activeKey === "Dashboard" && <Content history={history} />}
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Dashboard;

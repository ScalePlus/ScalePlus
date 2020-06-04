import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { Input, CommonTable, PrimaryButton, Switch } from "../../../common";

const data = [
  {
    id: 1,
    email: "marwan@videoals.com",
    linkedin: "Linkedin Profile",
    status: "admin",
  },
  {
    id: 2,
    email: "marwan@videoals.com",
    linkedin: "Linkedin Profile",
    status: "view only",
  },
  {
    id: 3,
    email: "marwan@videoals.com",
    linkedin: "Linkedin Profile",
    status: "view only",
  },
  {
    id: 4,
    email: "marwan@videoals.com",
    linkedin: "Linkedin Profile",
    status: "view only",
  },
  {
    id: 5,
    email: "marwan@videoals.com",
    linkedin: "Linkedin Profile",
    status: "view only",
  },
];
const Team = () => {
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  return (
    <MainContainer>
      <Row style={{ marginBottom: 25 }}>
        <Col>
          <HeaderComponent titleText="Team" />
        </Col>
      </Row>

      <Row>
        <Col lg={7} md={12} sm={12}>
          <div className="controll-container">
            <Input
              type="text"
              placeholder="Type an email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="text"
              placeholder="Linkedin Profile"
              value={linkedin}
              onChange={(e) => {
                setLinkedin(e.target.value);
              }}
            />
          </div>
        </Col>
        <Col lg={5} md={12} sm={12}>
          <div className="form-container">
            <div>User Role:</div>
            <div className="switch-container">
              <div className={"left-text"}>
                <span>Admin</span>
              </div>
              <div>
                <Switch variant="primary" label=""></Switch>
              </div>
              <div className={"right-text"}>
                <span>View Only</span>
              </div>
            </div>
            <div>
              <PrimaryButton
                variant="success"
                text={"Add"}
                onClick={() => {}}
              ></PrimaryButton>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <CommonTable
            columns={[
              {
                Header: "",
                accessor: "email",
                width: "20%",
              },
              {
                Header: "",
                accessor: "linkedin",
                width: "20%",
              },
              {
                Header: "",
                accessor: "status",
                Cell: (data) => {
                  return <div className="status-text">{data}</div>;
                },
                width: "35%",
              },
              {
                Header: "",
                accessor: "id",
                width: "15%",
                Cell: (data) => {
                  return (
                    <div className="action-container">
                      <div>Edit/</div>
                      <div> Delete-</div>
                    </div>
                  );
                },
              },
            ]}
            data={data}
            showPagination={false}
          />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Team;

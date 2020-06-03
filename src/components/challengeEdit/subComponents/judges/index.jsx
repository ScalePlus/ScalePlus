import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import { CheckBox, CommonTable, RemoveButton } from "../../../common";
const data = [
  {
    name: "Judge Name",
    email: "judgeemail@emailsomething.com",
    status: "Pending",
  },
  {
    name: "Judge Name",
    email: "judgeemail@emailsomething.com",
    status: "Accepeted",
  },
  {
    name: "Judge Name",
    email: "judgeemail@emailsomething.com",
    status: "Declined",
  },
  {
    name: "Judge Name",
    email: "judgeemail@emailsomething.com",
    status: "Pending",
  },
  {
    name: "Judge Name",
    email: "judgeemail@emailsomething.com",
    status: "Pending",
  },
];

const Judges = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              View our <span className="bold-text">screen-cast here</span> on
              the purpose of the Judges section and how to use it.
            </span>
          </InfoBlock>
        </Col>
      </Row>
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity()) {
            alert();
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText="Judges"
              buttonText="Invite"
              buttonVariant="info"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <CheckBox
              id={`checkbox-1`}
              checkBoxText="Enable Judges tab"
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CommonTable
              columns={[
                {
                  Header: "",
                  accessor: "name",
                  width: "8%",
                  Cell: (data) => {
                    return <div className="avtar-container"></div>;
                  },
                },
                {
                  Header: "Name",
                  accessor: "name",
                  width: "40%",
                  Cell: (data) => {
                    return <span className="link">{data}</span>;
                  },
                },
                {
                  Header: "Email",
                  accessor: "email",
                  width: "40%",
                },
                {
                  Header: "Status",
                  accessor: "status",
                  width: "22%",
                  Cell: (data) => {
                    return (
                      <div className="action-container">
                        <div
                          className="status-tab"
                          style={{
                            background:
                              data === "Accepeted"
                                ? "#4CD964"
                                : data === "Declined"
                                ? "#FF3B30"
                                : "rgba(0, 0, 0, 0.11)",
                          }}
                        >
                          <span>{data}</span>
                        </div>
                        <RemoveButton onClick={() => {}} />
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
      </Form>
    </MainContainer>
  );
};

export default Judges;

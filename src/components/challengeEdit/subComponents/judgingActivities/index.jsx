import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import { Switch, CommonTable } from "../../../common";
const data = [
  {
    date: "May 28, 2020",
    activity: "Finalize potential judges list and draft invitations",
  },
  {
    date: "June 4, 2020",
    activity: "Send invitations to potential judges list",
  },
  {
    date: "June 25, 2020",
    activity: "  Send Overview and Criteria document to confirmed judges",
  },
  {
    date: "July 10, 2020",
    activity: "Complete internal review of submissions",
  },
  {
    date: "Aug. 5, 2020",
    activity: "Complete winner selection call no later than",
  },
];

const JudgingActivities = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Here is a list of all the Judging Activities and Projected Dates
              when they take place.
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
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <HeaderComponent titleText="Judging activities" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Switch
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
              variant="primary"
              label="Enable Judges tab"
            ></Switch>
          </Col>
        </Row>
        <Row>
          <Col>
            <CommonTable
              columns={[
                {
                  Header: "Date",
                  accessor: "date",
                  width: "30%",
                  Cell: (data) => {
                    return <span className="link">{data}</span>;
                  },
                },
                {
                  Header: "Activity",
                  accessor: "activity",
                  width: "70%",
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

export default JudgingActivities;

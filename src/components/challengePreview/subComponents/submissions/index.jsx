import React, { useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { MainContainer } from "./style";
import { PrimaryButton, CheckBox, CommonTable } from "../../../common";
import { HeaderComponent } from "../common";
import EvaluateModal from "./evaluateModal";

const Submissions = ({ isStartUp_Individual, isMentor_Judge }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [data, changeData] = useState([
    {
      id: 1,
      active: false,
      Startup_Name: "Startup Name",
      Owner_Name: "Owner Name",
      Location: "Location",
      Industry: "Industry",
      Technology: "Technology",
      Elegiable: "Elegiable",
    },
    {
      id: 2,
      active: false,
      Startup_Name: "Startup Name",
      Owner_Name: "Owner Name",
      Location: "Location",
      Industry: "Industry",
      Technology: "Technology",
      Elegiable: "Elegiable",
    },
    {
      id: 3,
      active: false,
      Startup_Name: "Startup Name",
      Owner_Name: "Owner Name",
      Location: "Location",
      Industry: "Industry",
      Technology: "Technology",
      Elegiable: "Elegiable",
    },
    {
      id: 4,
      active: false,
      Startup_Name: "Startup Name",
      Owner_Name: "Owner Name",
      Location: "Location",
      Industry: "Industry",
      Technology: "Technology",
      Elegiable: "Elegiable",
    },
    {
      id: 5,
      active: false,
      Startup_Name: "Startup Name",
      Owner_Name: "Owner Name",
      Location: "Location",
      Industry: "Industry",
      Technology: "Technology",
      Elegiable: "Elegiable",
    },
  ]);

  return isStartUp_Individual ? (
    <MainContainer>
      {error && (
        <Row className="justify-content-center">
          <Col lg={11} md={11} sm={11} xs={11}>
            <Alert variant={"danger"} className="text-left">
              {error}
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <div className="button-container">
            <PrimaryButton
              variant="primary"
              text={"Save & Preview"}
              onClick={() => {
                setError(` Submission form is not complete. Please fill all the required
                fields.`);
              }}
            ></PrimaryButton>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <div className="content-container">
            Whatever we built with the form Builder
          </div>
        </Col>
      </Row>
    </MainContainer>
  ) : isMentor_Judge ? (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponent titleText="All Submissions" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <CommonTable
            filters={true}
            columns={[
              {
                Header: "",
                accessor: "active",
                width: "2.5%",
                HeaderCell: () => {
                  return (
                    <div>
                      <CheckBox
                        id={`checkbox-${Math.random()}`}
                        checkBoxText=""
                        onChange={(e) => {
                          let { checked } = e.target;
                          changeData((data) => {
                            return data.filter((each) => {
                              each.active = checked;
                              return each;
                            });
                          });
                        }}
                      />
                    </div>
                  );
                },
                Cell: (checked, record) => {
                  return (
                    <div>
                      <CheckBox
                        id={`checkbox-${Math.random()}`}
                        checkBoxText=""
                        checked={checked}
                        onChange={() => {
                          changeData((data) => {
                            return data.filter((each) => {
                              if (each.id === record.id) {
                                each.active = true;
                              }
                              return each;
                            });
                          });
                        }}
                      />
                    </div>
                  );
                },
              },
              {
                Header: "Startup Name",
                accessor: "Startup_Name",
                width: "19%",
              },
              {
                Header: "Owner Name",
                accessor: "Owner_Name",
                width: "19%",
              },
              {
                Header: "Location",
                accessor: "Location",
                width: "19%",
              },
              {
                Header: "Industry",
                accessor: "Industry",
                width: "19%",
              },
              {
                Header: "Technology",
                accessor: "Technology",
                width: "19%",
              },
              {
                Header: "Elegiable",
                accessor: "Elegiable",
                width: "2.5%",
                Cell: (data) => {
                  return (
                    <div className="circle-container">
                      <div className="elegiable-circle"></div>
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
  ) : (
    <MainContainer>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <div className="button-container">
            <PrimaryButton
              variant="primary"
              text={"Evaluate Submission"}
              onClick={() => {
                setShow(true);
              }}
            ></PrimaryButton>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={11} md={11} sm={11} xs={11}>
          <div className="content-container">
            Whatever we built with the form Builder
          </div>
        </Col>
      </Row>
      <EvaluateModal show={show} setShow={setShow} />
    </MainContainer>
  );
};

export default Submissions;

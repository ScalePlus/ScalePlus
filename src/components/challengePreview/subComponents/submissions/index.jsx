import React, { useState } from "react";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { MainContainer } from "./style";
import {
  PrimaryButton,
  CheckBox,
  CommonTable,
  Input,
  EditorInput,
  FileInput,
  RadioButton,
} from "../../../common";
import { HeaderComponent } from "../common";
import EvaluateModal from "./evaluateModal";

const Submissions = ({
  isStartUp_Individual,
  isMentor_Judge,
  isOrganisation,
}) => {
  const [show, setShow] = useState(false);
  const [
    error,
    setError,
  ] = useState(`Submission form is not complete. Please fill all the required
  fields.`);
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
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={10} md={10} sm={10} xs={10}>
          <HeaderComponent
            titleText="Submissions"
            buttonText="Submit"
            buttonVariant="primary"
            haveProgressBar={true}
          />
        </Col>
      </Row>

      <Row
        className="justify-content-center text-left"
        style={{ marginBottom: 40 }}
      >
        <Col lg={10} md={10} sm={10} xs={10}>
          <Form>
            <div className="box-container">
              <Input type="text" label="How did you hear about us" />
            </div>
            <div className="box-container">
              <EditorInput label="How did you hear about us" />
            </div>
            <div className="box-container">
              <FileInput
                label="Document Upload Box Title here"
                prependButtonText="Browse"
                description="Allowed file types: word, pdf"
              ></FileInput>
            </div>
            <div className="box-container not-valid">
              <label className="text-label form-label">
                Did you develop any software before?
              </label>
              <div className="question-button-container">
                <PrimaryButton text="Yes" variant="primary" />
                <PrimaryButton text="No" variant="light" />
              </div>
            </div>
            <div className="box-container">
              <label className="text-label form-label">
                How much money is your company worth
              </label>
              <div className="checkbox-container">
                <CheckBox id={`checkbox-1`} checkBoxText={"10,000"} />
                <CheckBox id={`checkbox-2`} checkBoxText={"10,0000"} />
                <CheckBox id={`checkbox-3`} checkBoxText={"10,00000"} />
                <CheckBox id={`checkbox-4`} checkBoxText={"10,000000"} />
              </div>
            </div>
            <div className="box-container">
              <label className="text-label form-label">
                How much money is your company worth
              </label>
              <div className="checkbox-container">
                <RadioButton
                  id={`radio-button-1`}
                  checkBoxText={"Idea Stage"}
                  name="radioButton"
                />
                <RadioButton
                  id={`radio-button-2`}
                  checkBoxText={"Per-Seed Stage"}
                  name="radioButton"
                />
                <RadioButton
                  id={`radio-button-3`}
                  checkBoxText={"Seed Stage"}
                  name="radioButton"
                />
                <RadioButton
                  id={`radio-button-4`}
                  checkBoxText={"Launched Product"}
                  name="radioButton"
                />
              </div>
            </div>
          </Form>
        </Col>
      </Row>

      <Row
        className="justify-content-center center-alignment header-container"
        style={{ marginBottom: 80 }}
      >
        <Col lg={10} md={10} sm={10} xs={10}>
          <HeaderComponent
            buttonText="Submit"
            buttonVariant="primary"
            haveProgressBar={true}
          />
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
  ) : isOrganisation ? (
    <MainContainer>
      <Row className="justify-content-center center-alignment header-container">
        <Col lg={11} md={11} sm={11} xs={11}>
          <HeaderComponent
            titleText="Submissions"
            buttonText="Edit Form"
            buttonVariant="info"
            buttonClick={() => {}}
          />
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

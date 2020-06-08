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
import DisqualifyModal from "./disqualifyModal";

const Submissions = ({
  isStartUp_Individual,
  isMentor_Judge,
  isOrganisation,
}) => {
  const [show, setShow] = useState(false);
  const [showDisqualify, setDisqualifyShow] = useState(false);
  const [
    error,
  ] = useState(`Submission form is not complete. Please fill all the required
  fields.`);
  const [selectedRow, selectRow] = useState(null);
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
          {selectedRow ? (
            <HeaderComponent
              titleText="Submission"
              buttonText="Evaluate Submission"
              buttonVariant="primary"
              buttonClick={() => {
                setShow(true);
              }}
              infoButtonText="Disqualify"
              infoButtonVariant="danger_light"
              infoButtonClick={() => {
                setDisqualifyShow(true);
              }}
            />
          ) : (
            <HeaderComponent titleText="Submissions" />
          )}
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ marginBottom: 80 }}>
        <Col lg={11} md={11} sm={11} xs={11}>
          {selectedRow ? (
            <div className="selected-row-container text-left">
              <div className="inline-block">
                <div style={{ flex: 0.2 }}>
                  <div className="regular-text">Startup Name</div>
                  <div className="bold-semi-large-text">Startup Name</div>
                </div>
                <div style={{ flex: 0.2 }}>
                  <div className="regular-text">Owner Name</div>
                  <div className="bold-semi-large-text">Owner Name</div>
                </div>
                <div style={{ flex: 0.2 }}>
                  <div className="regular-text">Location</div>
                  <div className="bold-semi-large-text">Location</div>
                </div>
              </div>
              <div className="block">
                <div className="regular-bold">How did you hear about us</div>
                <div>Social Media</div>
              </div>
              <div className="block">
                <div className="regular-bold">How did you hear about us</div>
                <div>
                  Derived from Latin dolorem ipsum (“pain itself”), Lorem Ipsum
                  is filler text used by publishers and graphic designers used
                  to demonstrate graphic elements.
                  <br />
                  <br />
                  Let's say you're drafting the ultimate content marketing
                  strategy. Lorem Ipsum is placeholder text that stands in for
                  meaningful content. It allows designers to focus on getting
                  the graphical elements such as typography, font, and page
                  layout in place first, before you move forward with the rest
                  of your strategy. Before publication, you replace the Lorem
                  Ipsum text with your polished, high quality content.
                  <br />
                  <br />
                  Typically, Lorem Ipsum text consists of a jumbled section of
                  De finibus bonorum et malorum, a first century, philosophical
                  text written by Cicero. Words are added, modified, or removed
                  to make it nonsensical.
                  <br />
                  <br />
                  One of the main benefits of using Lorem Ipsum is that it can
                  be easily generated, and it takes the pressure off designers
                  to create meaningful text. Instead, they can focus on crafting
                  the best website possible, and add in content after a page has
                  been designed.
                  <br />
                  <br />
                  Since the 1500’s, when a printer jumbled a gallery of type to
                  create a type specimen book, Lorem Ipsum has been the industry
                  standard for dummy text.
                  <br />
                  <br />
                  Today, a variety of software can create random text that
                  resembles Lorem Ipsum. For example, Apple’s Pages and Keynote
                  software use scrambled placeholder text. And Lorem Ipsum is
                  featured on Google Docs, WordPress, and Microsoft Office Word.
                </div>
              </div>
              <div className="block">
                <div className="regular-bold">
                  Document Upload Box Title here
                </div>
                <div className="download-block">
                  <div className="icon-container">
                    <img
                      src="/images/attach.png"
                      alt=""
                      height="25px"
                      width="25px"
                    />
                  </div>
                  <div className="name">Company Profile</div>
                  <div className="button-container">
                    <PrimaryButton
                      variant="success_light"
                      text={"Download attachment"}
                    ></PrimaryButton>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="regular-bold">
                  Did you develop any software before?
                </div>
                <div>
                  <PrimaryButton text="Yes" variant="primary" />
                </div>
              </div>
              <div className="block">
                <div className="regular-bold">
                  How much money is your company worth
                </div>
                <div>10,000</div>
              </div>
              <div className="block">
                <div className="regular-bold">
                  How much money is your company worth
                </div>
                <div>Idea Stage</div>
              </div>
            </div>
          ) : (
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
              onRowClick={(val) => {
                selectRow(val);
              }}
            />
          )}
        </Col>
      </Row>
      <EvaluateModal show={show} setShow={setShow} />
      <DisqualifyModal show={showDisqualify} setShow={setDisqualifyShow} />
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
      <Row className="justify-content-center" style={{ marginBottom: 80 }}>
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
      <Row className="justify-content-center" style={{ marginBottom: 80 }}>
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

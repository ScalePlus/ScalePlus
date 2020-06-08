import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { CheckBox, CommonTable, PrimaryButton } from "../../../common";
import EvaluateModal from "../../../challengePreview/subComponents/submissions/evaluateModal";
import DisqualifyModal from "../../../challengePreview/subComponents/submissions/disqualifyModal";

const Submissions = () => {
  const [show, setShow] = useState(false);
  const [showDisqualify, setDisqualifyShow] = useState(false);
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

  return (
    <MainContainer>
      <Row style={{ marginBottom: 25 }}>
        <Col>
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
            <HeaderComponent
              titleText="All Submissions"
              buttonText="Review Judging Criteria"
              buttonVariant="info"
              buttonClick={() => {
                setShow(true);
              }}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col>
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
  );
};

export default Submissions;

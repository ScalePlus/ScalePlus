import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { CheckBox, CommonTable } from "../../../common";

const Submissions = () => {
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
          <HeaderComponent
            titleText="All Submissions"
            buttonText="Review Judging Criteria"
            buttonVariant="info"
            buttonClick={() => {}}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <CommonTable
            filters={true}
            columns={[
              {
                Header: "",
                accessor: "active",
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
              },
              {
                Header: "Owner Name",
                accessor: "Owner_Name",
              },
              {
                Header: "Location",
                accessor: "Location",
              },
              {
                Header: "Industry",
                accessor: "Industry",
              },
              {
                Header: "Technology",
                accessor: "Technology",
              },
              {
                Header: "Elegiable",
                accessor: "Elegiable",
                Cell: (data) => {
                  return <div className="elegiable-circle"></div>;
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

export default Submissions;

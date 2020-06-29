import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";
import { Switch, CommonTable, RemoveButton, Loading } from "../../../common";
import InviteModal from "./inviteModal";

const Judges = ({ challengeId }) => {
  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [tabelData, setTableData] = useState(null);

  useEffect(() => {
    const { challengeData } = challengeReducer;
    if (challengeData) {
      const { judgesId } = challengeData;
      if (judgesId && judgesId.data) {
        setTableData(judgesId.data);
      }
    }
  }, [challengeReducer]);

  return (
    <MainContainer>
      {challengeReducer.loading && <Loading />}
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

      <Row style={{ marginBottom: 25 }}>
        <Col>
          <HeaderComponent
            titleText="Judges"
            buttonText="Invite"
            buttonVariant="info"
            buttonClick={() => {
              setShow(true);
            }}
          />
        </Col>
      </Row>
      {tabelData && tabelData.length ? (
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
      ) : null}
      {tabelData && tabelData.length ? (
        <Row>
          <Col>
            <CommonTable
              columns={[
                {
                  Header: "",
                  accessor: "userId",
                  width: "8%",
                  Cell: (data) => {
                    return <div className="avtar-container"></div>;
                  },
                },
                {
                  Header: "Name",
                  accessor: "userId",
                  width: "40%",
                  Cell: (data) => {
                    if (data && data.details && data.details.name) {
                      return <span className="link">{data.details.name}</span>;
                    } else {
                      return <span>-----</span>;
                    }
                  },
                },
                {
                  Header: "Email",
                  accessor: "userId",
                  width: "40%",
                  Cell: (data) => {
                    return <span>{data && data.email}</span>;
                  },
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
              data={tabelData}
              showPagination={false}
            />
          </Col>
        </Row>
      ) : null}

      <InviteModal show={show} setShow={setShow} challengeId={challengeId} />
    </MainContainer>
  );
};

export default Judges;

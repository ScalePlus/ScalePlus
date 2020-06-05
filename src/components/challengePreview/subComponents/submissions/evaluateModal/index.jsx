import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { Input, TextArea, PrimaryButton } from "../../../../common";
import { MainContainer } from "./style";

const EvaluateModal = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="evaluate-modal"
    >
      <Modal.Body>
        <MainContainer>
          <Row className="justify-content-center">
            <Col lg={8} md={10} sm={10} xs={10}>
              <div className="block">
                <Row>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <div className="left-container">
                      <div className="title">Proposal quality</div>
                      <div className="description">
                        Quality of proposal: clear, concise writing; thoughtful
                        and complete responses; realistic projections of time
                        needed, effort expended, and outcomes attained.
                        High-level project plan that demonstrates a potential
                        path for future development of proposed payload.
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <div className="right-container">
                      <Input
                        type="number"
                        label={
                          <span className="label-bold">
                            Overall Weight{" "}
                            <span className="label-regular">Out of 10</span>
                          </span>
                        }
                      />
                      <TextArea
                        label={<span className="label-bold">Description</span>}
                        rows="2"
                      ></TextArea>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="block">
                <Row>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <div className="left-container">
                      <div className="title">Capabilities</div>
                      <div className="description">
                        Technical soundness of proposed payload.
                        <br />
                        <br />
                        Likelihood that it can be successfully integrated into a
                        micro-rover and used on the lunar surface.
                        <br />
                        <br />
                        Clear description of new technology/instrumentation to
                        be demonstrated, or specific experiment to be run, or
                        other payload capability. Likelihood that
                        proposer/proposing team will be able to successfully
                        develop proposed payload.
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <div className="right-container">
                      <Input
                        type="number"
                        label={
                          <span className="label-bold">
                            Overall Weight{" "}
                            <span className="label-regular">Out of 30</span>
                          </span>
                        }
                      />
                      <TextArea
                        label={<span className="label-bold">Description</span>}
                        rows="2"
                      ></TextArea>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="block">
                <Row>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <div className="left-container">
                      <div className="title">Technical Maturity</div>
                      <div className="description">
                        The likelihood that proposed payload can be developed
                        and deployed in 1-4 years
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <div className="right-container">
                      <Input
                        type="number"
                        label={
                          <span className="label-bold">
                            Overall Weight{" "}
                            <span className="label-regular">Out of 30</span>
                          </span>
                        }
                      />
                      <TextArea
                        label={<span className="label-bold">Description</span>}
                        rows="2"
                      ></TextArea>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="block">
                <Row>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <div className="left-container">
                      <div className="title">Impact</div>
                      <div className="description">
                        The potential impact of proposed payload if it is
                        successfully developed and deployed.
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <div className="right-container">
                      <Input
                        type="number"
                        label={
                          <span className="label-bold">
                            Overall Weight{" "}
                            <span className="label-regular">Out of 25</span>
                          </span>
                        }
                      />
                      <TextArea
                        label={<span className="label-bold">Description</span>}
                        rows="2"
                      ></TextArea>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="block">
                <Row>
                  <Col lg={7} md={7} sm={12} xs={12}>
                    <div className="left-container">
                      <div className="title">Innovation</div>
                      <div className="description">
                        Novelty or creativity of proposed approach.
                        <br />
                        <br />
                        Elegance of design.
                        <br />
                        <br />
                        Clever use of existing technologies or work-around of
                        existing limitations/constraints.
                      </div>
                    </div>
                  </Col>
                  <Col lg={5} md={5} sm={12} xs={12}>
                    <div className="right-container">
                      <Input
                        type="number"
                        label={
                          <span className="label-bold">
                            Overall Weight{" "}
                            <span className="label-regular">Out of 5</span>
                          </span>
                        }
                      />
                      <TextArea
                        label={<span className="label-bold">Description</span>}
                        rows="2"
                      ></TextArea>
                    </div>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col>
                  <div className="button-container">
                    <div className="save-button">
                      <PrimaryButton
                        variant="secondary"
                        text={"Save Draft"}
                        onClick={() => {
                          setShow(false);
                        }}
                      ></PrimaryButton>
                    </div>
                    <div className="submit-button">
                      <PrimaryButton
                        variant="primary"
                        text={"Submit Evaluation"}
                        onClick={() => {
                          setShow(false);
                        }}
                      ></PrimaryButton>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </MainContainer>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(EvaluateModal);

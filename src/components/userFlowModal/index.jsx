import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { MainContainer } from "./style";
import SignIn from "../signin";
import SignUp from "../signup";
import EmailVerification from "../emailVerification";

const UserFlowModal = ({ show, setUserFlowModal, history, challengeData }) => {
  const [activeModal, setActiveModal] = useState("SignIn");
  return (
    <Modal
      show={show}
      onHide={() => setUserFlowModal(false)}
      dialogClassName="user-flow-modal"
      centered
    >
      <MainContainer>
        <Modal.Header>
          <div className="header-container">
            <div>
              <span className="challenge-title">Sign up to compete in</span>
            </div>
            <div>
              <span className="challenge-name">
                Low Impact Agriculture Challenge
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="content-container">
            {activeModal === "SignIn" && (
              <SignIn
                mode="modal"
                setActiveModal={setActiveModal}
                setUserFlowModal={(routePath) => {
                  setUserFlowModal(false);
                  if (routePath === "/solve/challenge") {
                    history.push(`/solve/challenge/${challengeData._id}`);
                  } else {
                    history.push(routePath);
                  }
                }}
              />
            )}
            {activeModal === "SignUp" && (
              <SignUp
                mode="modal"
                setActiveModal={setActiveModal}
                setUserFlowModal={(routePath) => {
                  setUserFlowModal(false);
                  history.push(routePath);
                }}
              />
            )}
            {activeModal === "EmailVerification" && (
              <EmailVerification mode="modal" setActiveModal={setActiveModal} />
            )}
          </div>
        </Modal.Body>
      </MainContainer>
    </Modal>
  );
};

export default UserFlowModal;

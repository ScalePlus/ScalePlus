import React from "react";
import { Modal } from "react-bootstrap";
import { HeaderContainer, ContentContainer } from "./style";

const NotificationModal = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="notification-modal"
    >
      <Modal.Body>
        <HeaderContainer>
          <div className="left-text">Notifications</div>
          <div className="right-text">Mark All As Read</div>
        </HeaderContainer>
        <ContentContainer>
          <div
            className="notification-container"
            onClick={() => setShow(false)}
          >
            <div className="left-container">
              <div className="circle-container">
                <img
                  src={"/images/image.svg"}
                  height="25px"
                  width="25px"
                  alt=""
                ></img>
              </div>
              <div>
                <div className="main-text">New 1</div>
                <div className="small-text">You received a new submission</div>
              </div>
            </div>
            <div className="right-container">2 weeks</div>
          </div>
          <div
            className="notification-container"
            onClick={() => setShow(false)}
          >
            <div className="left-container">
              <div className="circle-container">
                <img
                  src={"/images/image.svg"}
                  height="25px"
                  width="25px"
                  alt=""
                ></img>
              </div>
              <div>
                <div className="main-text">Update 2</div>
                <div className="small-text">You received a new submission</div>
              </div>
            </div>
            <div className="right-container">2 days</div>
          </div>
          <div
            className="notification-container"
            onClick={() => setShow(false)}
          >
            <div className="left-container">
              <div className="circle-container">
                <img
                  src={"/images/image.svg"}
                  height="25px"
                  width="25px"
                  alt=""
                ></img>
              </div>
              <div>
                <div className="main-text">Update 2</div>
                <div className="small-text">You received a new submission</div>
              </div>
            </div>
            <div className="right-container">1 day</div>
          </div>
        </ContentContainer>
      </Modal.Body>
    </Modal>
  );
};
export default React.memo(NotificationModal);

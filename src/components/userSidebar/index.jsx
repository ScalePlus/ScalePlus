import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { MainContainer } from "./style";

const UserSidebar = ({ show, setShow, profileClick, onLogout }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="user-sidebar-modal"
    >
      <Modal.Body>
        <MainContainer>
          <div className="close-container">
            <span onClick={() => setShow(false)}>x</span>
          </div>
          <div className="box-container">
            <div className="info-container">
              <div className="avtar-container">
                <img
                  src="/images/image.svg"
                  alt=""
                  height="50px"
                  width="50px"
                />
              </div>
            </div>
            <div className="name-container">Organization Name</div>
          </div>
          <div
            className="profile-text"
            onClick={() => {
              profileClick();
            }}
          >
            {t("USER PROFILE")}
          </div>
          <div className="logout-container">
            <div
              className="logout-button"
              onClick={() => {
                onLogout();
              }}
            >
              {t("Logout")}
            </div>
          </div>
        </MainContainer>
      </Modal.Body>
    </Modal>
  );
};

export default UserSidebar;

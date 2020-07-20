import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { MainContainer } from "./style";
import { Constants } from "../../lib/constant";

const UserSidebar = ({ show, setShow, profileClick, onLogout }) => {
  const { t } = useTranslation();
  const is_admin = localStorage.getItem("userRole") === Constants.ROLES.ADMIN;

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
          {!is_admin && (
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
          )}
          {!is_admin && (
            <div
              className="profile-text"
              onClick={() => {
                profileClick();
              }}
            >
              {t("USER PROFILE")}
            </div>
          )}
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

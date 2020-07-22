import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { MainContainer } from "./style";

const UserSidebar = ({ show, setShow, profileClick, onLogout }) => {
  const { t } = useTranslation();

  const signinReducer = useSelector((state) => {
    return state.signinReducer;
  });

  const [userDetail, setData] = useState(null);

  useEffect(() => {
    const { userData } = signinReducer;
    if (userData) {
      setData(userData);
    }
  }, [signinReducer]);

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
                {userDetail && userDetail.details ? (
                  userDetail.details.logo ? (
                    <img
                      src={userDetail.details.logo}
                      alt=""
                      height="100%"
                      width="100%"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : userDetail.details.personal_photo ? (
                    <img
                      src={userDetail.details.personal_photo}
                      alt=""
                      height="100%"
                      width="100%"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <img
                      src="/images/image.svg"
                      alt=""
                      height="50px"
                      width="50px"
                    />
                  )
                ) : (
                  <img
                    src="/images/image.svg"
                    alt=""
                    height="50px"
                    width="50px"
                  />
                )}
              </div>
            </div>
            <div className="name-container">
              {userDetail
                ? userDetail.details && userDetail.details.name
                  ? userDetail.details.name
                  : userDetail.firstName && userDetail.lastName
                  ? userDetail.firstName + " " + userDetail.lastName
                  : userDetail.email
                : ""}
            </div>
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

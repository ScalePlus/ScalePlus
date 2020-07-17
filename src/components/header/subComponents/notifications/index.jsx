import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderContainer, ContentContainer } from "./style";

export const HeaderPart = React.memo(() => {
  const { t } = useTranslation();
  return (
    <HeaderContainer>
      <div className="left-text">{t("Notifications")}</div>
      <div className="right-text">{t("Mark All As Read")}</div>
    </HeaderContainer>
  );
});

export const ContentPart = React.memo(
  ({ imageURL, mainText, userName, subText, timestamp }) => {
    return (
      <ContentContainer>
        <div className="notification-container">
          <div className="left-container">
            <div className="circle-container">
              {imageURL ? (
                <img
                  src={imageURL}
                  height="100%"
                  width="100%"
                  style={{ borderRadius: "50%" }}
                  alt=""
                ></img>
              ) : (
                <img
                  src={"/images/image.svg"}
                  height="25px"
                  width="25px"
                  alt=""
                ></img>
              )}
            </div>
            <div>
              <div className="main-text">{mainText}</div>
              <div className="user-info">
                <div className="user-name">{userName}</div>
                <div className="small-text">{subText}</div>
              </div>
            </div>
          </div>
          <div className="right-container">{timestamp}</div>
        </div>
      </ContentContainer>
    );
  }
);

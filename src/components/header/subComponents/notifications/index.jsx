import React from "react";
import { HeaderContainer, ContentContainer } from "./style";

export const HeaderPart = React.memo(() => {
  return (
    <HeaderContainer>
      <div className="left-text">Notifications</div>
      <div className="right-text">Mark All As Read</div>
    </HeaderContainer>
  );
});

export const ContentPart = React.memo(({ mainText, subText, timestamp }) => {
  return (
    <ContentContainer>
      <div className="notification-container">
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
            <div className="main-text">{mainText}</div>
            <div className="small-text">{subText}</div>
          </div>
        </div>
        <div className="right-container">{timestamp}</div>
      </div>
    </ContentContainer>
  );
});

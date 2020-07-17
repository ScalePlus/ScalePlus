import styled from "styled-components";
import theme from "../../../../theme";

export const HeaderContainer = styled.div`
  height: 60px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 6px 6px 0 0;
  .left-text {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
  }
  .right-text {
    cursor: pointer;
  }
`;

export const ContentContainer = styled.div`
  .notification-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
    .circle-container {
      height: 43px;
      width: 43px;
      border: 1px solid #979797;
      background-color: ${theme.colors.white};
      border-radius: 50%;
      margin-right: ${theme.isLTR && "10px"};
      margin-left: ${theme.isRTL && "10px"};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .left-container {
      display: flex;
      align-items: center;
    }
    .user-info {
      display: flex;
      align-items: center;
    }
    .right-container,
    .small-text {
      font-size: ${theme.fontSize.small};
    }
    .user-name {
      font-size: ${theme.fontSize.small};
      font-family: ${theme.fontFamily.bold};
      margin-right: ${theme.isLTR && "10px"};
      margin-left: ${theme.isRTL && "10px"};
    }
    .main-text {
      font-family: ${theme.fontFamily.bold};
    }
  }
`;

import styled from "styled-components";
import theme from "../../../../theme";

export const HeaderContainer = styled.div`
  height: 60px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px 10px 0 0;
  .left-text {
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.mediumRegular};
  }
`;

export const ContentContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 0 0 10px 10px;
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
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .left-container {
      display: flex;
    }
    .right-container,
    .small-text {
      font-size: ${theme.fontSize.small};
    }
    .main-text {
      font-family: ${theme.fontFamily.bold};
    }
  }
`;

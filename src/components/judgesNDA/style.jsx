import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  margin-top: 40px;
  padding: 0px 20px;
  .header-container {
    display: flex;
    align-items: center;
    .back-container {
      font-size: ${theme.fontSize.mediumLarge};
      color: ${theme.colors.gray};
      cursor: pointer;
    }
    .avtar-container {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 1px solid #979797;
      background-color: ${theme.colors.white};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0rem 2rem;
    }
    .user-name {
      font-size: ${theme.fontSize.mediumRegular};
      font-family: ${theme.fontFamily.bold};
      color: ${theme.colors.gray};
    }
  }
  .challenge-title {
    font-size: ${theme.fontSize.semiLarge};
    font-family: ${theme.fontFamily.bold};
    margin: 2rem 0rem;
  }
  .sub-header-container {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .agreement-text {
      font-size: ${theme.fontSize.semiLarge};
    }
  }
  .button-container {
    display: flex;
    align-items: center;
    .button-text {
      font-size: ${theme.fontSize.semiRegular};
    }
    button:first-child {
      margin-right: ${theme.isLTR && "1rem"};
      margin-left: ${theme.isRTL && "1rem"};
    }
  }
  .agreement {
    font-size: ${theme.fontSize.extraMedium};
    margin-bottom: 2rem;
  }
`;

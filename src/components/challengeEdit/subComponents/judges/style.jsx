import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .link {
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    color: ${theme.colors.black};
    text-decoration: underline;
    cursor: pointer;
  }
  .bold-text {
    font-family: ${theme.fontFamily.bold};
  }
  .avtar-container {
    height: 35px;
    width: 35px;
    border: 1px solid #979797;
    border-radius: 50%;
    background-color: ${theme.colors.white};
  }
  .action-container {
    display: flex;
    align-items: center;
    .status-tab {
      padding: 2px;
      border-radius: 6px;
      margin-right: 20px;
      min-width: 70px;
      text-align: center;
      span {
        font-family: ${theme.fontFamily.regular};
        font-size: ${theme.fontSize.extraSmall};
        color: ${theme.colors.black};
      }
    }
  }
`;

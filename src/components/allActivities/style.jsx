import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  padding: 40px 20px;
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      cursor: pointer;
    }
  }
  .right-container {
    display: flex;
    align-items: center;
    .input-container {
      flex: auto;
      margin-right: ${theme.isLTR && "1rem"};
      margin-left: ${theme.isRTL && "1rem"};
      .form-group {
        margin-bottom: 0;
        .form-control {
          height: 50px;
        }
      }
    }
  }
  .list-container {
    margin-top: 2rem;
    .block {
      cursor: pointer;
      border: 1px solid ${theme.colors.mediumgray};
      padding: 1rem;
      border-radius: 6px;
      background-color: ${theme.colors.white};
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      .basic-information {
        display: flex;
        align-items: center;
        .user-name {
          margin-right: ${theme.isLTR && "1rem"};
          margin-left: ${theme.isRTL && "1rem"};
        }
      }
      .challenge-name {
        font-family: ${theme.fontFamily.bold};
        text-align: ${theme.isLTR ? "left" : "right"};
      }
      .status-container {
        padding: 2px 8px;
        border: 1px solid;
        border-radius: 6px;
        font-size: ${theme.fontSize.extraSmall};
        font-family: ${theme.fontFamily.bold};
      }
    }
  }
`;

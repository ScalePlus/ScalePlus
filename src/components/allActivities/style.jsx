import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  margin-top: 40px;
  padding: 0px 20px;
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
      }
      .status-container {
        background-color: #fdf1ce;
        color: #f4ba09;
        padding: 2px 8px;
        border: 1px solid #f4ba09;
        border-radius: 6px;
        font-size: ${theme.fontSize.extraSmall};
        font-family: ${theme.fontFamily.bold};
      }
    }
  }
`;

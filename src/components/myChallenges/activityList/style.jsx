import styled from "styled-components";
import theme from "../../../theme";

export const MainContainer = styled.div`
  margin-bottom: 3rem;
  .left-block {
    display: flex;
    align-items: center;
    .users-text {
      font-size: ${theme.fontSize.title};
      font-family: ${theme.fontFamily.bold};
    }
    .view-text {
      font-size: ${theme.fontSize.semiRegular};
      text-decoration: underline;
      cursor: pointer;
      margin-left: ${theme.isLTR && "1rem"};
      margin-right: ${theme.isRTL && "1rem"};
    }
  }
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-container {
    margin-top: 1rem;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1rem;
    .block.disable {
      opacity: 0.5;
    }
    .block {
      cursor: pointer;
      border-bottom: 1px solid ${theme.colors.mediumgray};
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    .pagination {
      margin-top: 1rem;
      justify-content: center;
      .of-text {
        padding: 0px 5px;
      }
      .next-page,
      .previous-page {
        padding: 0rem 0.5rem;
        cursor: pointer;
      }
      .last-page,
      .first-page {
        cursor: pointer;
      }
    }
  }
`;

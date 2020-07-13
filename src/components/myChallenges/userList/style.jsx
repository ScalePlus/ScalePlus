import styled from "styled-components";
import theme from "../../../theme";

export const MainContainer = styled.div`
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
    .block {
      cursor: pointer;
      border-bottom: 1px solid ${theme.colors.mediumgray};
      padding: 0.5rem 0rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .basic-information {
        display: flex;
        align-items: center;
        .user-name {
          font-family: ${theme.fontFamily.bold};
        }
        .user-role {
          font-family: ${theme.fontFamily.bold};
          margin-left: ${theme.isLTR && "1rem"};
          margin-right: ${theme.isRTL && "1rem"};
        }
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
    .pagination {
      margin-top: 1rem;
      justify-content: center;
      .next-page {
        padding: 0rem 0.5rem;
      }
    }
  }
`;

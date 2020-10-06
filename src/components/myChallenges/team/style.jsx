import styled from "styled-components";
import theme from "../../../theme";

export const MainContainer = styled.div`
  background-color: ${theme.colors.whiteSmokeTint4};
  margin-bottom: 3rem;
  .sub-title-text {
    font-size: ${theme.fontSize.title};
    font-family: ${theme.fontFamily.bold};
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
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .basic-detail-container {
        display: flex;
        align-items: center;
        .avtar-container {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #979797;
          background-color: ${theme.colors.white};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: ${theme.isRTL && "0.5rem"};
          margin-right: ${theme.isLTR && "0.5rem"};
          .default_img {
            height: 15px;
            width: 15px;
          }
          .user_img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
          }
        }
        .user-name {
          font-family: ${theme.fontFamily.semi_bold};
          margin-left: ${theme.isRTL && "0.5rem"};
          margin-right: ${theme.isLTR && "0.5rem"};
        }
      }
      .status-container {
        padding: 2px 8px;
        border: 1px solid;
        border-radius: 6px;
        font-size: ${theme.fontSize.extraSmall};
        font-family: ${theme.fontFamily.bold};
      }
    }
    .active-team-block {
      cursor: pointer;
      border-bottom: 1px solid ${theme.colors.mediumgray};
      padding: 0.5rem;
      .team-name {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.small};
        margin-left: ${theme.isRTL && "0.5rem"};
        margin-right: ${theme.isLTR && "0.5rem"};
      }
      .challenge-name {
        font-size: ${theme.fontSize.small};
      }
      .members-list {
        display: flex;
        align-items: center;
        .member-title {
          margin-left: ${theme.isRTL && "0.5rem"};
          margin-right: ${theme.isLTR && "0.5rem"};
          font-size: ${theme.fontSize.extraSmall};
        }
      }
    }
  }
  .tags-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tag {
      background-color: ${theme.colors.whisper};
      padding: 5px 10px;
      border-radius: 10px;
      margin-right: ${theme.isLTR && "5px"};
      margin-left: ${theme.isRTL && "5px"};
      font-size: ${theme.fontSize.extraSmall};
    }
  }
  .pagination {
    margin-top: 1rem;
    .of-text {
      padding: 0px 5px;
    }
    justify-content: center;
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
`;

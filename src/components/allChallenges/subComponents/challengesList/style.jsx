import styled from "styled-components";
import theme from "../../../../theme";

export const ChallengesListContainer = styled.div`
  .header-container {
    .title-text {
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      line-height: 40px;
    }
  }
  .sub-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .text {
      color: ${theme.colors.gray};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.mediumRegular};
    }
    .filter-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      height: 50px;
      width: 140px;
      border: 1px solid #e3e3e3;
      border-radius: 6px;
      background-color: ${theme.colors.white};
      padding: 0px 15px;
      cursor: pointer;
      .filter-text {
        color: ${theme.colors.black};
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.semiRegular};
      }
      .filter-count {
        height: 22px;
        width: 22px;
        background-color: ${theme.colors.lightSilver};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .count-text {
          color: ${theme.colors.black};
          font-family: ${theme.fontFamily.bold};
          font-size: ${theme.fontSize.small};
        }
      }
    }
  }
  .bottom-button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
    button {
      padding: 15px 140px;
    }
    .button-text {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.semiRegular};
    }
  }
`;

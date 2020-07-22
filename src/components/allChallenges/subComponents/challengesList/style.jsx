import styled from "styled-components";
import theme from "../../../../theme";

export const ChallengesListContainer = styled.div`
  .header-container {
    display: flex;
    align-items: center;
    .title-text {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.mediumLarge};
      line-height: 40px;
      margin-right: ${theme.isLTR && "20px"};
      margin-left: ${theme.isRTL && "20px"};
    }
    .circle-container {
      height: 45px;
      width: 45px;
      background-color: ${theme.colors.whisper};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .count {
        font-family: ${theme.fontFamily.bold};
        font-size: ${theme.fontSize.title};
      }
    }
  }
  .sub-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .text {
      color: ${theme.colors.gray};
      font-size: ${theme.fontSize.mediumRegular};
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

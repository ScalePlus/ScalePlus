import styled from "styled-components";
import theme from "../../../../theme";

export const ChallengesListContainer = styled.div`
  .header-container {
    .title-text {
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

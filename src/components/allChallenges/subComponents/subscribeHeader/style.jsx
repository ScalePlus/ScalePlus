import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .subscribe-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url("/images/subscribe-banner.png");
    background-size: cover;
    background-color: ${theme.colors.yellow};
    min-height: 180px;
    padding: 25px;
    .text {
      font-family: ${theme.fontFamily.bold};
      font-size: ${theme.fontSize.extraMedium};
    }
    .button-container {
      display: flex;
      justify-content: center;
    }
    button {
      padding: 5px 50px;
      .button-text {
        font-size: ${theme.fontSize.semiRegular};
      }
    }
  }
`;

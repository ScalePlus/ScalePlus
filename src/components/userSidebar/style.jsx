import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  .close-container {
    padding: 0rem 1rem;
    font-size: ${theme.fontSize.semiLarge};
    cursor: pointer;
  }
  .box-container {
    width: 300px;
    padding: 2rem 0rem;
    .info-container {
      display: flex;
      justify-content: center;
      align-items: center;
      .avtar-container {
        height: 110px;
        width: 110px;
        background-color: #d4d4d4;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .name-container {
      font-size: ${theme.fontSize.mediumRegular};
      font-family: ${theme.fontFamily.bold};
      text-align: center;
    }
  }
  .profile-text {
    border-top: 1px solid;
    border-bottom: 1px solid;
    padding: 1rem;
    font-size: ${theme.fontSize.mediumRegular};
    font-family: ${theme.fontFamily.bold};
    cursor: pointer;
  }
  .logout-container {
    font-size: ${theme.fontSize.mediumRegular};
    font-family: ${theme.fontFamily.bold};
    text-align: center;
    padding: 1rem;
    .logout-button {
      border: 1px solid;
      padding: 1rem;
      cursor: pointer;
    }
  }
`;

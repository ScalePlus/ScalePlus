import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 40px;
  }
  .content-container {
    margin-top: 20px;
    border: 1px solid #979797;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 12px 10px 0 rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin-bottom: 150px;
  }
  .description-container {
    font-family: ${theme.fontFamily.semi_bold};
    font-size: ${theme.fontSize.regular};
    margin-top: 25px;
    margin-bottom: 85px;
  }
  .verified-description-container {
    font-family: ${theme.fontFamily.semi_bold};
    font-size: ${theme.fontSize.regular};
    margin-top: 10px;
    margin-bottom: 40px;
    .thanks-text {
      font-size: ${theme.fontSize.mediumRegular};
      font-family: ${theme.fontFamily.bold};
    }
  }
  .form-container {
    margin-top: 10px;
  }
  .button-container {
    margin-bottom: 20px;
  }

  .button-container,
  .bottom-container {
    button {
      width: 100%;
      padding: 20px 0px;
      .button-text {
        font-size: ${theme.fontSize.semiRegular};
      }
    }
  }
  .resend-link {
    cursor: pointer;
    text-decoration: underline;
  }
  .link {
    color: ${theme.colors.gray};
    text-decoration: underline;
    &:hover {
      color: ${theme.colors.gray};
    }
    cursor: pointer;
  }
  .seprator {
    margin: 5px;
  }
`;

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
    .form-control {
      height: 50px;
    }
    .password-icon {
      margin-top: -35px;
    }
  }

  .description-container {
    font-family: ${theme.fontFamily.semi_bold};
    font-size: ${theme.fontSize.regular};
    margin-bottom: 20px;
    .bold-text {
      font-family: ${theme.fontFamily.bold};
    }
  }

  .login-button-container,
  .button-container {
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

  .password-feedback {
    color: ${theme.colors.gray};
    text-align: left;
    margin-top: -10px;
    margin-bottom: 1rem;
    padding: 0px 10px;
  }
`;

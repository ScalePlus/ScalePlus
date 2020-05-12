import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;

  .title-container {
    margin-top: 80px;
  }

  .description-container {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-weight: 600;
    font-size: ${theme.fontSize.small};
    margin-top: 80px;
  }

  .form-container {
    margin-top: 50px;
  }

  .login-button-container {
    margin: 65px 0px;
  }

  .button-container {
    margin: 20px 0px;
  }

  .resend-link {
    cursor: pointer;
    color: ${theme.colors.black};
    text-decoration: underline;
  }
`;

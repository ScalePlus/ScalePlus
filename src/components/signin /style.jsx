import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;

  .title-container {
    margin-top: 80px;
  }

  .form-container {
    margin-top: 50px;
  }

  .button-container {
    margin-top: -20px;
  }

  .bottom-container {
    margin: 80px 0px;
    opacity: 0.5;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }

  .link {
    color: ${theme.colors.black};
    text-decoration: underline;
    &:hover {
      color: ${theme.colors.black};
    }
  }

  .reset-link {
    text-align: right;
    opacity: 0.5;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    margin-top: -10px;
    margin-bottom: 30px;
  }
`;

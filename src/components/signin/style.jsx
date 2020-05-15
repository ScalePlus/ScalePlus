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
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }

  .link {
    color: ${theme.colors.gray};
    text-decoration: underline;
    &:hover {
      color: ${theme.colors.gray};
    }
  }

  .reset-link {
    cursor: pointer;
    text-align: right;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    margin-top: -10px;
    margin-bottom: 30px;
  }
`;

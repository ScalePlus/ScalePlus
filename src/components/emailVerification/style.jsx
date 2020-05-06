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
    font-size: ${theme.fontSize.small};
    margin-top: 25px;
  }
  .verified-description-container {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.small};
    margin-top: 80px;
  }
  .form-container {
    margin-top: 50px;
  }
  .button-container {
    margin-top: 65px;
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
`;

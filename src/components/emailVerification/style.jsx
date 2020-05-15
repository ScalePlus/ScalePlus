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
    margin-top: 25px;
  }
  .verified-description-container {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-weight: 600;
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
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .resend-link {
    cursor: pointer;
    color: ${theme.colors.black};
    text-decoration: underline;
  }
  .link {
    color: ${theme.colors.gray};
    text-decoration: underline;
    &:hover {
      color: ${theme.colors.gray};
    }
  }
  .seprator {
    margin: 5px;
  }
`;

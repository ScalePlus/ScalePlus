import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 80px;
  }
  .description-container {
    font-weight: 600;
    font-size: ${theme.fontSize.small};
    margin-top: 25px;
  }
  .verified-description-container {
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

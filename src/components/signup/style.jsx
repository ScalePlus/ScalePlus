import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 80px;
  }
  .description-container {
    margin-top: 25px;
  }
  .tab-container {
    margin-top: 35px;
    .tab-sub-container {
      margin-bottom: 25px;
    }
  }
  .form-container {
    margin-top: 15px;
  }
  .button-container {
    margin-top: 20px;
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

import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 80px;
  }
  .form-container {
    margin-top: 50px;
    margin-bottom: 25px;
  }
  .tab-title {
    text-align: left;
    opacity: 0.5;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    margin-bottom: 5px;
  }
  .tab-container {
    .tab-main-text {
      opacity: 0.5;
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
    }
    .tab-sub-container {
      padding: 20px 0px;
      margin-bottom: 1rem;
    }
  }
  .button-container {
    margin: 60px 0px;
    align-items: center;
  }
`;

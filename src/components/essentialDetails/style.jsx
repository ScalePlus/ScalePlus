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
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
    margin-bottom: 5px;
  }
  .tab-container {
    .tab-main-text {
      color: ${theme.colors.gray};
      font-family: ${theme.fontFamily.regular};
      font-size: ${theme.fontSize.regular};
    }
    .tab-sub-container {
      padding: 20px 0px;
      margin-bottom: 1rem;
    }
  }
  .button-container {
    margin-top: 60px;
    margin-bottom: 60px;
    align-items: center;
  }
`;

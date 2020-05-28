import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 80px;
  }
  .description-container {
    margin-top: 15px;
  }
  .form-container {
    margin-top: 15px;
    .form-group {
      margin-bottom: 15px;
    }
  }
  .switch-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
  }
  .startup-text {
    margin-right: 50px;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .individual-text {
    margin-left: 40px;
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .button-container {
    margin: 50px 0px;
  }
  .active {
    color: ${theme.colors.black};
    font-weight: 600;
  }
`;

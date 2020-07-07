import styled from "styled-components";
import theme from "../../theme";

export const MainContainer = styled.div`
  text-align: center;
  .title-container {
    margin-top: 40px;
  }
  .description-container {
    margin-top: 30px;
    font-family: ${theme.fontFamily.bold};
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
    margin-right: ${theme.isLTR && "50px"};
    margin-left: ${theme.isRTL && "50px"};
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .individual-text {
    margin-left: ${theme.isLTR && "40px"};
    margin-right: ${theme.isRTL && "40px"};
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily.regular};
    font-size: ${theme.fontSize.regular};
  }
  .button-container {
    text-align: ${theme.isLTR ? "right" : "left"};
    margin-top: 35px;
    // margin-bottom: 80px;
    button {
      padding: 0px;
    }
  }
  .active {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.semi_bold};
  }
`;

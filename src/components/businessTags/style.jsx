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
  .button-container {
    margin: 80px 0px;
    align-items: center;
  }
  .market-label {
    text-align: left;
    margin-left: 10px;
    margin-top: 10px;
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.regular};
  }
`;

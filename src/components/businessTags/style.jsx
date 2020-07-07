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
  .button-container {
    margin-top: 35px;
    // margin-bottom: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      padding: 0px;
    }
  }
  .market-label {
    text-align: ${theme.isLTR ? "left" : "right"};
    margin-left: ${theme.isLTR && "10px"};
    margin-right: ${theme.isRTL && "10px"};
    margin-top: 10px;
    font-family: ${theme.fontFamily.semi_bold};
  }
`;

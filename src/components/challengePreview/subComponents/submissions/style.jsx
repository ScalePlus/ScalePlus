import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .alert-danger {
    color: ${theme.colors.black};
    font-family: ${theme.fontFamily.bold};
  }
  .button-container {
    float: right;
    button {
      padding: 10px 40px;
    }
  }
  .content-container {
    min-height: 500px;
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.semiLarge};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .center-alignment {
    align-items: center;
  }
  .header-container {
    margin-bottom: 40px;
  }
  .circle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .elegiable-circle {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background-color: #7ed321;
    }
  }
`;

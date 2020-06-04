import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .status-text {
    font-family: ${theme.fontFamily.bold};
  }
  .action-container {
    display: flex;
    justify-content: space-around;
    color: ${theme.colors.gray};
  }
  .controll-container {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    .form-group:nth-child(1) {
      flex: 0.5;
      margin-right: 20px;
      margin-bottom: 0;
    }
    .form-group:nth-child(2) {
      flex: 0.5;
      margin-bottom: 0;
    }
  }
  .form-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    .form-group {
      margin-bottom: 0;
    }
    .primary_switch {
      margin-bottom: 8px;
      .custom-control-label::after {
        background-color: ${theme.colors.yellow};
      }
    }
    .switch-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .left-text {
      margin-right: 10px;
    }
  }
`;

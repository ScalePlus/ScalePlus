import styled from "styled-components";
import theme from "../../../../theme";

export const MainContainer = styled.div`
  .box-container {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background-color: ${theme.colors.white};
    padding: 1rem 1rem 0px 1rem;
    margin-bottom: 1rem;
    display: flex;
  }
  .left-container {
    flex: auto;
    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
      border-bottom: 1px solid #979797;

      .primary_switch .custom-control-label {
        padding-left: ${theme.isLTR && "15px"};
        padding-right: ${theme.isRTL && "15px"};
        padding-top: 5px;
        text-transform: capitalize;
      }
    }
    .field-container {
      margin-top: 10px;
    }
    .add-button-container {
      padding-bottom: 10px;
    }
  }
  .right-container {
    margin-left: ${theme.isLTR && "1rem"};
    margin-right: ${theme.isRTL && "1rem"};
  }
  .choice-container {
    display: flex;
    .choice-left-container {
      flex: auto;
      display: flex;
      align-items: center;
      .choice-text {
        margin-bottom: 1rem;
      }
      .choice-input {
        flex: auto;
        margin-left: ${theme.isLTR && "1rem"};
        margin-right: ${theme.isRTL && "1rem"};
      }
    }
    .choice-right-container {
      margin-left: ${theme.isLTR && "1rem"};
      margin-right: ${theme.isRTL && "1rem"};
      margin-bottom: 1rem;
    }
  }
  .table-body-container {
    display: flex;
    justify-content: center;
    padding: 100px;
    span {
      font-size: ${theme.fontSize.semiLarge};
    }
  }
  .allow-types-container {
    .title {
      font-family: ${theme.fontFamily.bold};
      margin-bottom: 1rem;
    }
    .types {
      display: flex;
      align-items: center;
      .form-group {
        margin-left: ${theme.isRTL && "1rem"};
        margin-right: ${theme.isLTR && "1rem"};
      }
    }
  }
`;

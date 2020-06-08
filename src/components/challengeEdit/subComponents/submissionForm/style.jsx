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
    .title {
      padding-bottom: 10px;
      text-transform: uppercase;
      border-bottom: 1px solid #979797;
    }
    .field-container {
      margin-top: 10px;
    }
    .add-button-container {
      padding-bottom: 10px;
    }
  }
  .right-container {
    margin-left: 1rem;
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
        margin-left: 1rem;
      }
    }
    .choice-right-container {
      margin-left: 1rem;
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
`;
